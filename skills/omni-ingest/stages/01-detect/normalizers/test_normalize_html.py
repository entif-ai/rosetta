"""Tests for normalize_html.py — html2text-backed HTML→Markdown normalizer."""

from __future__ import annotations

import pytest

from normalize_html import html_to_markdown, normalize_text


# --------------------------------------------------------------------------- #
# html_to_markdown — structural conversion
# --------------------------------------------------------------------------- #
class TestHtmlToMarkdown:
    def test_heading(self):
        result = html_to_markdown("<h1>Hello World</h1>")
        assert "# Hello World" in result

    def test_paragraph(self):
        result = html_to_markdown("<p>This is a paragraph.</p>")
        assert "This is a paragraph." in result

    def test_links_preserved(self):
        result = html_to_markdown('<a href="https://example.com">Example</a>')
        assert "[Example](https://example.com)" in result

    def test_images_preserved(self):
        result = html_to_markdown('<img src="pic.png" alt="A picture" />')
        assert "![A picture](pic.png)" in result

    def test_code_block(self):
        result = html_to_markdown("<pre><code>def hello():\n    pass\n</code></pre>")
        # html2text strips <pre>/<code> wrapper and preserves raw content
        assert "def hello():" in result
        assert "pass" in result

    def test_unordered_list(self):
        result = html_to_markdown("<ul><li>Item 1</li><li>Item 2</li></ul>")
        assert "Item 1" in result
        assert "Item 2" in result

    def test_ordered_list(self):
        result = html_to_markdown("<ol><li>First</li><li>Second</li></ol>")
        assert "First" in result
        assert "Second" in result

    def test_blockquote(self):
        result = html_to_markdown("<blockquote>Quote this.</blockquote>")
        assert "Quote this." in result

    def test_table(self):
        result = html_to_markdown(
            "<table><tr><th>A</th><th>B</th></tr>"
            "<tr><td>1</td><td>2</td></tr></table>"
        )
        assert "A" in result
        assert "B" in result
        assert "1" in result
        assert "2" in result

    def test_realistic_article(self):
        html = (
            "<h1>Understanding AI Agents</h1>"
            "<p>An <strong>agent</strong> is a system that <em>perceives</em> and acts.</p>"
            "<ul><li>Autonomy</li><li>Interactivity</li></ul>"
            '<p>See <a href="https://example.com">the guide</a> for details.</p>'
        )
        result = html_to_markdown(html)
        assert "# Understanding AI Agents" in result
        assert "**agent**" in result
        assert "_perceives_" in result
        assert "[the guide](https://example.com)" in result


# --------------------------------------------------------------------------- #
# html_to_markdown — edge cases
# --------------------------------------------------------------------------- #
class TestHtmlToMarkdownEdgeCases:
    def test_empty_string(self):
        assert html_to_markdown("") == ""

    def test_whitespace_only(self):
        assert html_to_markdown("   \n\n   ") == ""

    def test_none_raises(self):
        with pytest.raises(TypeError):
            html_to_markdown(None)  # type: ignore

    def test_non_string_raises(self):
        with pytest.raises(TypeError):
            html_to_markdown(123)  # type: ignore

    def test_plain_text_passthrough(self):
        assert html_to_markdown("Plain text.") == "Plain text.\n"

    def test_script_tag_stripped(self):
        result = html_to_markdown("<script>alert('xss')</script>Safe")
        assert "alert" not in result
        assert "Safe" in result

    def test_style_tag_stripped(self):
        result = html_to_markdown("<style>.foo{}</style>Content")
        assert ".foo" not in result
        assert "Content" in result

    def test_chinese_characters_preserved(self):
        result = html_to_markdown("<p>你好世界</p>")
        assert "你好世界" in result

    def test_unicode_entities_decoded(self):
        result = html_to_markdown("<p>Émoji 🎉 &amp; symbols</p>")
        assert "Émoji" in result
        assert "🎉" in result
        assert "&amp;" not in result  # & → &

    def test_consecutive_blank_lines_collapsed(self):
        result = html_to_markdown("<p>A</p>\n\n\n\n<p>B</p>")
        assert "\n\n\n" not in result

    def test_double_conversion_idempotent(self):
        """Converting twice shouldn't double-wrap markdown."""
        original = "<p>Hello <strong>world</strong></p>"
        first = html_to_markdown(original)
        second = html_to_markdown(first)
        assert first == second


# --------------------------------------------------------------------------- #
# normalize_text — fallback
# --------------------------------------------------------------------------- #
class TestNormalizeText:
    def test_collapses_internal_whitespace(self):
        assert normalize_text("hello    world") == "hello world"

    def test_strips_leading_trailing(self):
        assert normalize_text("  hello  ") == "hello"

    def test_collapse_excessive_newlines(self):
        assert normalize_text("a\n\n\n\nb") == "a\n\nb"

    def test_returns_empty_for_whitespace_only(self):
        assert normalize_text("   \n\t\n   ") == ""

    def test_strips_html_tags(self):
        assert normalize_text("<p>Hello <strong>world</strong></p>") == "Hello world"

    def test_none_raises(self):
        with pytest.raises(TypeError):
            normalize_text(None)  # type: ignore
