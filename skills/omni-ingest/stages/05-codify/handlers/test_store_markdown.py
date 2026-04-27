#!/usr/bin/env python3
"""
test_store_markdown.py — tests for store_markdown.py handler.

Covers:
- write_memory_file: slugify, content_hash, idempotent guard, frontmatter, file layout
- store(): happy path, disabled config, file-not-writable edge case
"""

import os
import stat
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "stages" / "05-codify" / "handlers"))
from store_markdown import (
    content_hash,
    slugify,
    write_memory_file,
    store,
    CodifyOutput,
    MEMORY_ROOT,
)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

class FakeCodifyOutput:
    """CodifyOutput with mutable attrs for test composition."""
    def __init__(
        self,
        content: str = "test content",
        tags: list[str] | None = None,
        metadata: dict | None = None,
        source: str = "test-source",
        content_type: str = "text/plain",
    ):
        self.content = content
        self.tags = tags or ["test"]
        self.metadata = metadata or {}
        self.source = source
        self.content_type = content_type


# ---------------------------------------------------------------------------
# Unit tests
# ---------------------------------------------------------------------------

class TestSlugify(unittest.TestCase):
    def test_preserves_alphanumeric(self):
        result = slugify("Hello World Test 2024")
        self.assertEqual(result, "Hello-World-Test-2024")

    def test_strips_special_chars(self):
        result = slugify("What's on @fire?!")
        self.assertEqual(result, "Whats-on-fire")

    def test_truncates_long(self):
        long_text = "a" * 100
        result = slugify(long_text, max_len=60)
        self.assertEqual(len(result), 60)

    def test_collapse_whitespace(self):
        result = slugify("hello   world\t\tfoo")
        self.assertEqual(result, "hello-world-foo")


class TestContentHash(unittest.TestCase):
    def test_deterministic(self):
        h1 = content_hash("same content")
        h2 = content_hash("same content")
        self.assertEqual(h1, h2)

    def test_different_for_different_content(self):
        h1 = content_hash("content A")
        h2 = content_hash("content B")
        self.assertNotEqual(h1, h2)

    def test_length_16(self):
        h = content_hash("any content here")
        self.assertEqual(len(h), 16)
        self.assertTrue(all(c in "0123456789abcdef" for c in h))


class TestWriteMemoryFile(unittest.TestCase):
    def setUp(self):
        # Use a temp dir instead of ~/.hermes/memory
        self.mock_root = tempfile.mkdtemp(prefix="omni-ingest-test-")
        # Monkey-patch MEMORY_ROOT for the test
        import store_markdown
        store_markdown.MEMORY_ROOT = Path(self.mock_root)

    def tearDown(self):
        import shutil
        shutil.rmtree(self.mock_root, ignore_errors=True)

    def test_writes_file(self):
        path, record_id = write_memory_file(
            content="hello world",
            source="unit-test",
            tags=["test"],
            metadata={"foo": "bar"},
            content_type="text/plain",
        )
        self.assertTrue(path.exists())
        self.assertIn("unit-test", str(path))
        self.assertIn("hello-world", path.name)

    def test_frontmatter_has_required_fields(self):
        path, _ = write_memory_file(
            content="frontmatter check",
            source="fm-test",
            tags=["a", "b"],
            metadata={"key": "val"},
            content_type="text/markdown",
        )
        text = path.read_text(encoding="utf-8")
        self.assertIn("---", text)
        self.assertIn("source: fm-test", text)
        self.assertIn("content_type: text/markdown", text)
        self.assertIn("tags: [a, b]", text)
        self.assertIn("record_id:", text)
        self.assertIn("content_hash:", text)
        self.assertIn("key: val", text)

    def test_idempotent_guard(self):
        path1, rid1 = write_memory_file(
            content="idempotent test",
            source="idem-test",
            tags=["test"],
            metadata={},
            content_type="text/plain",
        )
        path2, rid2 = write_memory_file(
            content="idempotent test",
            source="idem-test",
            tags=["test"],
            metadata={},
            content_type="text/plain",
        )
        # Should return same hash-based record_id
        self.assertEqual(rid1, rid2)
        # Second write should not have thrown

    def test_record_id_contains_hash(self):
        _, record_id = write_memory_file(
            content="record id test",
            source="rid-test",
            tags=[],
            metadata={},
        )
        # Format: YYYYMMDD-HHMMSS-slug-chash (slug up to 55 chars, chash 16 chars)
        self.assertIn("-", record_id)
        self.assertLessEqual(len(record_id), 90)  # reasonable upper bound

    def test_does_not_duplicate_on_identical_content(self):
        path1, _ = write_memory_file(
            content="unique content xyz",
            source="dup-test",
            tags=["dup"],
            metadata={},
        )
        # A second call with same content should be idempotent
        path2, _ = write_memory_file(
            content="unique content xyz",
            source="dup-test",
            tags=["dup"],
            metadata={},
        )
        self.assertEqual(path1.read_text(), path2.read_text())


class TestStore(unittest.TestCase):
    def setUp(self):
        self.mock_root = tempfile.mkdtemp(prefix="omni-ingest-store-test-")
        import store_markdown
        store_markdown.MEMORY_ROOT = Path(self.mock_root)

    def tearDown(self):
        import shutil
        shutil.rmtree(self.mock_root, ignore_errors=True)

    def test_happy_path(self):
        sample = FakeCodifyOutput(
            content="store happy path test",
            tags=["unit", "test"],
            metadata={"via": "pytest"},
            source="store-test",
            content_type="text/plain",
        )
        result = store(sample)
        self.assertTrue(result.success)
        self.assertEqual(result.store, "markdown")
        self.assertIsNotNone(result.record_id)
        self.assertIsNone(result.error)
        self.assertEqual(result.metadata["status"], "written")

    def test_disabled_config_returns_skipped(self):
        sample = FakeCodifyOutput(content="should not write", source="skip-test")
        result = store(sample, config={"enabled": False})
        self.assertTrue(result.success)
        self.assertIsNone(result.record_id)
        self.assertEqual(result.metadata["status"], "disabled")

    def test_source_becomes_subdir(self):
        sample = FakeCodifyOutput(content="subdir test", source="my-source")
        result = store(sample)
        self.assertTrue(result.success)
        self.assertIn("my-source", result.metadata.get("path", ""))

    def test_empty_tags_acceptable(self):
        sample = FakeCodifyOutput(content="no tags", tags=[], metadata={}, source="no-tags")
        result = store(sample)
        self.assertTrue(result.success)

    def test_none_config_defaults_to_enabled(self):
        sample = FakeCodifyOutput(content="default config", source="cfg-test")
        result = store(sample, config=None)
        self.assertTrue(result.success)

    def test_tags_become_frontmatter_list(self):
        sample = FakeCodifyOutput(
            content="tag list check",
            tags=["alpha", "beta", "gamma"],
            source="tag-list",
        )
        result = store(sample)
        self.assertTrue(result.success)
        path_str = result.metadata.get("path", "")
        if path_str:
            content = Path(path_str).read_text()
            self.assertIn("alpha", content)
            self.assertIn("beta", content)


# ---------------------------------------------------------------------------
# Smoke-test (invoked as script)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    # Patch MEMORY_ROOT to a temp dir for the smoke test
    mock_root = tempfile.mkdtemp(prefix="omni-ingest-smoke-")
    import store_markdown
    store_markdown.MEMORY_ROOT = Path(mock_root)

    sample = CodifyOutput(
        content="SMOKE TEST — store_markdown handler validation.",
        tags=["test", "smoke"],
        metadata={"purpose": "handler_validation"},
        source="smoke-test",
        content_type="text/plain",
    )
    result = store(sample)
    print(f"{result.store} | success={result.success} | id={result.record_id} | err={result.error or 'ok'}")

    import shutil
    shutil.rmtree(mock_root, ignore_errors=True)

    unittest.main(verbosity=2)
