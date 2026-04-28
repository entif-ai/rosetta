"""Tests for normalize_pdf.py — PyMuPDF-backed PDF→Markdown normalizer."""

from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path

import pytest

import pymupdf

from normalize_pdf import pdf_to_markdown, pdf_bytes_to_markdown


# --------------------------------------------------------------------------- #
# Fixtures
# --------------------------------------------------------------------------- #
@pytest.fixture
def sample_pdf(tmp_path: Path) -> Path:
    """Create a minimal single-page PDF for testing."""
    doc = pymupdf.open()
    page = doc.new_page(width=595, height=842)  # A4
    page.insert_text((72, 72), "Hello World", fontsize=12)
    page.insert_text((72, 100), "This is line two.", fontsize=12)
    path = tmp_path / "sample.pdf"
    doc.save(str(path))
    doc.close()
    return path


@pytest.fixture
def multi_page_pdf(tmp_path: Path) -> Path:
    """Create a 2-page PDF for testing pagination."""
    doc = pymupdf.open()
    for i in range(2):
        page = doc.new_page(width=595, height=842)
        page.insert_text((72, 72), f"Page {i + 1} content.", fontsize=12)
    path = tmp_path / "multi.pdf"
    doc.save(str(path))
    doc.close()
    return path


@pytest.fixture
def empty_pdf(tmp_path: Path) -> Path:
    """Create a PDF with no readable text (image-only)."""
    doc = pymupdf.open()
    page = doc.new_page(width=595, height=842)
    # No text inserted — page is blank
    path = tmp_path / "empty.pdf"
    doc.save(str(path))
    doc.close()
    return path


# --------------------------------------------------------------------------- #
# pdf_to_markdown — structural
# --------------------------------------------------------------------------- #
class TestPdfToMarkdown:
    def test_extracts_text(self, sample_pdf: Path):
        result = pdf_to_markdown(str(sample_pdf))
        assert "Hello World" in result
        assert "This is line two" in result

    def test_page_separator_present(self, sample_pdf: Path):
        result = pdf_to_markdown(str(sample_pdf))
        assert "## Page 1" in result

    def test_multi_page_separators(self, multi_page_pdf: Path):
        result = pdf_to_markdown(str(multi_page_pdf))
        assert "## Page 1" in result
        assert "## Page 2" in result
        assert "Page 1 content" in result
        assert "Page 2 content" in result

    def test_empty_pdf_returns_empty_string(self, empty_pdf: Path):
        result = pdf_to_markdown(str(empty_pdf))
        assert result == ""


# --------------------------------------------------------------------------- #
# pdf_to_markdown — error cases
# --------------------------------------------------------------------------- #
class TestPdfToMarkdownErrors:
    def test_none_raises(self):
        with pytest.raises(TypeError):
            pdf_to_markdown(None)  # type: ignore

    def test_non_string_raises(self):
        with pytest.raises(TypeError):
            pdf_to_markdown(123)  # type: ignore

    def test_missing_file_raises(self):
        with pytest.raises(FileNotFoundError):
            pdf_to_markdown("/nonexistent/path/to/file.pdf")

    def test_directory_raises(self, tmp_path: Path):
        with pytest.raises(ValueError):
            pdf_to_markdown(str(tmp_path))


# --------------------------------------------------------------------------- #
# pdf_bytes_to_markdown
# --------------------------------------------------------------------------- #
class TestPdfBytesToMarkdown:
    def test_extracts_text_from_bytes(self, sample_pdf: Path):
        pdf_bytes = sample_pdf.read_bytes()
        result = pdf_bytes_to_markdown(pdf_bytes)
        assert "Hello World" in result
        assert "## Page 1" in result

    def test_empty_bytes_returns_empty_string(self):
        assert pdf_bytes_to_markdown(b"") == ""

    def test_none_raises(self):
        with pytest.raises(TypeError):
            pdf_bytes_to_markdown(None)  # type: ignore

    def test_non_bytes_raises(self):
        with pytest.raises(TypeError):
            pdf_bytes_to_markdown("not bytes")  # type: ignore

    def test_malformed_bytes_raises_runtime(self):
        with pytest.raises(RuntimeError):
            pdf_bytes_to_markdown(b"%PDF-1.4\n%%EOF\n")


# --------------------------------------------------------------------------- #
# Normalization
# --------------------------------------------------------------------------- #
class TestNormalization:
    def test_consecutive_blank_lines_collapsed(self, tmp_path: Path):
        doc = pymupdf.open()
        page = doc.new_page(width=595, height=842)
        # PyMuPDF inserts \n between blocks
        page.insert_text((72, 72), "Line A", fontsize=12)
        page.insert_text((72, 92), "Line B", fontsize=12)
        path = tmp_path / "dense.pdf"
        doc.save(str(path))
        doc.close()
        result = pdf_to_markdown(str(path))
        assert "\n\n\n" not in result

    def test_strips_trailing_whitespace(self, tmp_path: Path):
        doc = pymupdf.open()
        page = doc.new_page(width=595, height=842)
        page.insert_text((72, 72), "Text", fontsize=12)
        path = tmp_path / "ws.pdf"
        doc.save(str(path))
        doc.close()
        result = pdf_to_markdown(str(path))
        # Function appends one trailing newline (consistent with other normalizers)
        assert result == result.rstrip() + "\n"
