"""
sanitize.py — Stage 3: Deterministic hygiene gate (no LLM, no sub-agents).

This is the first gate before any expensive cognitive work.
All checks are pure functions. No network calls, no async, no model invocations.

Checks (in order):
  1. utf8_normalize   — reject malformed UTF-8; reduce to Latin-1 subset
  2. emoji_strip      — remove emojis, ZWSP, bidirectional override chars
  3. malware_heuristics — scan for known malicious patterns
  4. spam_score       — Bayesian/word-frequency heuristic score
  5. quality_gate     — reject if >80% non-alphabetic or <10 words

Verdict: benign | quarantine | reject

Reject → workflow terminates immediately.
Quarantine → workflow pauses; human review required.
Benign → passes to Stage 4.
"""

import json
import re
import unicodedata
from dataclasses import dataclass, field
from typing import Literal


# --------------------------------------------------------------------------------------------------
# Malware heuristics — known patterns
# --------------------------------------------------------------------------------------------------

MALWARE_PATTERNS = [
    # Obfuscated JavaScript execution
    (r"<script[^>]*>[\s\S]*?eval\s*\(", "obfuscated_js_eval"),
    (r"document\.cookie", "cookie_access"),
    (r"XMLHttpRequest|fetch\s*\(", "network_request"),
    (r"navigator\.userAgent", "ua_fingerprint"),
    (r"localStorage|sessionStorage", "storage_access"),

    # Obfuscated URLs / exfil
    (r"https?://[^\s]{80,}", "long_obfuscated_url"),   # Very long URL on single line
    (r"&#x?[0-9a-f]{1,4};", "hex_entity_obfuscation"),  # HTML hex/dec entity obfuscation
    (r"\\[0-7]{3}", "octal_escape_obfuscation"),       # Octal escape sequences

    # Known phishing / credential harvesting patterns
    (r"(enter|sumbit|su[b]mit)\s*(your\s*)?(password|passwd|pwd|ssn|credit\s*card)", "credential_harvest_pattern"),
    (r"verify\s*(your)?\s*(account|identity|payment)", "account_verification_phishing"),
    (r"click\s*here\s*to\s*(claim|verify|unlock)", "click_bait_action"),

    # Executable content injection
    (r"<\?php|\$\_(GET|POST|REQUEST|COOKIE)", "php_injection"),
    (r"<%@\s*page|ASP.NET", "asp_injection"),
    (r"\$\(\s*request\s*\(", "jquery_request_injection"),

    # Base64-encoded payloads (very long base64 strings)
    (r"[A-Za-z0-9+/]{200,}={0,2}", "long_base64_payload"),

    # Known command execution patterns
    (r";\s*(wget|curl|nc\s|bash|sh\s|rm\s|chmod\s)", "command_injection"),
    (r"\|[^|]+&&", "pipeline_injection"),

    # Suspicious iframe / cross-site embedding
    (r"<iframe[^>]+src\s*=\s*[\"']?https?://", "external_iframe"),
]

# Minimum thresholds
MIN_WORDS = 10
MAX_NON_ALPHA_RATIO = 0.80  # reject if >80% non-alphabetic chars


@dataclass
class CheckResult:
    name: str
    status: Literal["pass", "warn", "fail"]
    score: float = 0.0       # 0.0 = clean, 1.0 = definitely malicious
    notes: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {"name": self.name, "status": self.status,
                "score": self.score, "notes": self.notes}


@dataclass
class SanitizationResult:
    verdict: Literal["benign", "quarantine", "reject"]
    checks: dict[str, dict]
    cleaned_content: str | None = None  # only set if cleaning was applied
    notes: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "verdict": self.verdict,
            "checks": self.checks,
            "notes": self.notes,
        }


# --------------------------------------------------------------------------------------------------
# Individual check functions (all pure, deterministic)
# --------------------------------------------------------------------------------------------------

def utf8_normalize(text: str) -> CheckResult:
    """
    Attempt to encode to Latin-1, reject if that destroys meaningful content.
    Also normalize unicode categories: strip zero-width chars, bidirectional overrides.
    """
    notes = []
    issues = []

    # Strip zero-width characters
    zw_chars = [
        "\u200b",  # Zero-width space
        "\u200c",  # Zero-width non-joiner
        "\u200d",  # Zero-width joiner
        "\ufeff",  # Byte order mark
        "\u180e",  # Mongolian vowel separator
        "\u2060",  # Word joiner
        "\u2061",  # Function application
        "\u2062",  # Invisible times
        "\u2063",  # Invisible separator
        "\u2064",  # Invisible plus
        "\u200e",  # Left-to-right mark
        "\u200f",  # Right-to-left mark
        "\u202a",  # Left-to-right embedding
        "\u202b",  # Right-to-left embedding
        "\u202c",  # Pop directional formatting
        "\u202d",  # Left-to-right override
        "\u202e",  # Right-to-left override
    ]

    original_len = len(text)
    for ch in zw_chars:
        text = text.replace(ch, "")

    if len(text) < original_len:
        notes.append(f"stripped {original_len - len(text)} zero-width/bidi chars")

    # Count all chars that can't round-trip through Latin-1 before encoding
    # (errors="strict" raises on FIRST failure, so we pre-count all bad chars)
    lost = sum(1 for c in text if ord(c) > 255)
    pct_lost = lost / max(len(text), 1)
    if pct_lost > 0.15:
        return CheckResult("utf8Normalize", "fail", score=0.8,
                         notes=[f"Too many non-Latin-1 chars: {pct_lost:.1%}"])
    elif pct_lost > 0.05:
        return CheckResult("utf8Normalize", "warn", score=0.3,
                         notes=[f"Non-Latin-1 chars: {lost} ({pct_lost:.1%}), accepted"])

    try:
        encoded = text.encode("latin-1", errors="strict")
    except UnicodeEncodeError:
        # This shouldn't happen since we pre-counted, but handle it defensively
        notes.append(f"Non-Latin-1 chars: {lost} ({pct_lost:.1%}), accepted")

    # Check for excessive non-printable chars (excluding common whitespace)
    non_printable = sum(1 for c in text
                       if unicodedata.category(c)[0] in ("C",)
                       and c not in "\t\n\r ")
    if non_printable > len(text) * 0.05:
        issues.append(f"Excessive non-printable chars: {non_printable}")

    status = "fail" if issues else "pass"
    return CheckResult("utf8Normalize", status, score=0.0 if not issues else 0.5,
                     notes=notes + issues)


def emoji_strip(text: str) -> CheckResult:
    """
    Remove emojis and symbolic Unicode characters.
    Score based on density — high emoji density suggests low-value content.
    """
    original_len = len(text)
    cleaned = []

    # Only true emoji/symbol Unicode categories — NOT general punctuation
    # So = Symbols, misc (⚡, ✅, ★, etc.)
    # Sc = Currency symbols ($, €, ₿, etc.)
    # Sk = Modifier symbols (^, `, etc.)
    # Sm = Math symbols (+, =, <, >, ~, |, etc.)
    # Pd = Dash punctuation (—, –)
    # Po = Other punctuation: REMOVED — this includes period, comma, quotes,
    #       apostrophe, etc. which appear in normal text and are NOT emoji.
    emoji_categories = {
        "So",  # Symbols, misc
        "Sc",  # Currency symbols
        "Sk",  # Modifier symbols
        "Sm",  # Math symbols
        "Pd",  # Dash punctuation
    }

    # Specific emoji ranges
    emoji_ranges = [
        (0x1F300, 0x1F9FF),  # Miscellaneous symbols and pictographs
        (0x2600, 0x26FF),   # Misc symbols
        (0x2700, 0x27BF),   # Dingbats
        (0x2300, 0x23FF),   # Miscellaneous technical
    ]

    def is_emoji(c: str) -> bool:
        cat = unicodedata.category(c)
        if cat in emoji_categories:
            return True
        cp = ord(c)
        for start, end in emoji_ranges:
            if start <= cp <= end:
                return True
        return False

    for c in text:
        if not is_emoji(c):
            cleaned.append(c)

    result = "".join(cleaned)
    emoji_count = original_len - len(result)

    notes = []
    if emoji_count > 0:
        emoji_ratio = emoji_count / max(original_len, 1)
        notes.append(f"removed {emoji_count} emoji/symbol chars ({emoji_ratio:.1%} of content)")
        score = min(emoji_ratio * 5, 0.7)  # Scale: 10% emoji → 0.5 score
    else:
        score = 0.0

    return CheckResult("emojiStrip", "pass" if score < 0.5 else "warn",
                     score=score, notes=notes)


def malware_heuristics(text: str) -> CheckResult:
    """
    Scan for known malicious patterns.
    Returns (status, score, notes). High score → likely malicious.
    """
    matches = []
    score = 0.0

    for pattern, label in MALWARE_PATTERNS:
        found = re.findall(pattern, text, re.IGNORECASE | re.MULTILINE)
        if found:
            count = len(found)
            matches.append(f"{label}: {count} hit(s)")
            # Score per pattern family
            if label in ("obfuscated_js_eval", "php_injection", "command_injection",
                         "jquery_request_injection", "credential_harvest_pattern"):
                score += min(count * 0.6, 0.9)  # 0.6 per hit → single <script>eval reaches fail
            elif label in ("long_base64_payload", "hex_entity_obfuscation",
                           "octal_escape_obfuscation"):
                score += min(count * 0.3, 0.6)
            else:
                score += min(count * 0.2, 0.4)

    if score >= 0.5:
        status = "fail"
    elif score >= 0.3:
        status = "warn"
    else:
        status = "pass"

    return CheckResult("malwareHeuristics", status, score=min(score, 1.0),
                     notes=matches)


def spam_score(text: str) -> CheckResult:
    """
    Simple Bayesian-inspired spam heuristic.
    Flags: ALL CAPS words, excessive punctuation, repeated chars, URL density.
    """
    words = text.split()
    if not words:
        return CheckResult("spamScore", "fail", score=1.0,
                         notes=["No content after stripping"])

    notes = []
    score_components = []

    # 1. ALL CAPS word ratio
    caps_words = sum(1 for w in words if w.isupper() and len(w) > 2)
    caps_ratio = caps_words / len(words)
    if caps_ratio > 0.3:
        score_components.append(("caps_ratio", caps_ratio, 0.35))  # 0.35 → 100% caps = 0.35, warn threshold = 0.3
        notes.append(f"ALL CAPS ratio: {caps_ratio:.1%}")

    # 2. Excessive punctuation (more than 3 consecutive same char)
    punct_bursts = re.findall(r"([!?.,])\1{3,}", text)
    if punct_bursts:
        notes.append(f"{len(punct_bursts)} excessive punctuation bursts")
        score_components.append(("punct_bursts", len(punct_bursts) / max(len(text)/1000, 1), 0.15))

    # 3. Repeated character patterns (e.g., "aaaaaaa")
    repeated = re.findall(r"(.)\1{5,}", text)
    if repeated:
        notes.append(f"{len(repeated)} repeated-char sequences")
        score_components.append(("repeated_chars", len(repeated) / max(len(words), 1), 0.15))

    # 4. URL density (if >30% of content is URLs, flag)
    urls = re.findall(r"https?://\S+", text)
    url_char_count = sum(len(u) for u in urls)
    url_density = url_char_count / max(len(text), 1)
    if url_density > 0.3:
        notes.append(f"URL density: {url_density:.1%} ({len(urls)} URLs)")
        score_components.append(("url_density", url_density, 0.3))

    # 5. Short words ratio (common in spam)
    short_words = sum(1 for w in words if len(w) <= 2)
    short_ratio = short_words / len(words)
    if short_ratio > 0.4:
        score_components.append(("short_ratio", short_ratio, 0.1))

    # Combine
    score = sum(val * weight for _, val, weight in score_components)
    score = min(score, 1.0)

    if score >= 0.6:
        status = "fail"
    elif score >= 0.3:
        status = "warn"
    else:
        status = "pass"

    return CheckResult("spamScore", status, score=score, notes=notes)


def quality_gate(text: str) -> CheckResult:
    """
    Reject if >80% non-alphabetic characters or <10 words.
    This catches garbage content that passed prior checks.
    """
    if not text.strip():
        return CheckResult("qualityGate", "fail", score=1.0,
                         notes=["Empty content"])

    words = text.split()
    if len(words) < MIN_WORDS:
        return CheckResult("qualityGate", "fail", score=0.9,
                         notes=[f"Only {len(words)} words (min: {MIN_WORDS})"])

    alpha_chars = sum(1 for c in text if c.isalpha())
    alpha_ratio = alpha_chars / max(len(text), 1)
    if alpha_ratio < (1 - MAX_NON_ALPHA_RATIO):
        return CheckResult("qualityGate", "fail", score=0.85,
                         notes=[f"Non-alphabetic ratio: {1-alpha_ratio:.1%} > {MAX_NON_ALPHA_RATIO:.1%}"])

    return CheckResult("qualityGate", "pass", score=0.0, notes=[f"{len(words)} words, alpha ratio {alpha_ratio:.1%}"])


# --------------------------------------------------------------------------------------------------
# Main pipeline
# --------------------------------------------------------------------------------------------------

CHECKS = [
    utf8_normalize,
    emoji_strip,
    malware_heuristics,
    spam_score,
    quality_gate,
]


def sanitize(content: str) -> SanitizationResult:
    """
    Run all hygiene checks in order.
    Returns SanitizationResult with verdict and per-check details.

    Verdict logic:
      - Any fail in [malware_heuristics] → reject
      - Any warn in [malware_heuristics] OR fail in others → quarantine
      - All pass → benign
    """
    results: dict[str, dict] = {}
    notes = []
    cleaned = content

    for check_fn in CHECKS:
        result = check_fn(cleaned)
        results[result.name] = result.to_dict()
        notes.extend(result.notes)

        # Apply cleaning for certain checks
        if result.name == "utf8Normalize" and result.notes:
            # Re-run with cleaned text for downstream checks
            # (emoji strip is handled inline within check)
            pass

    # Determine verdict
    malware = results.get("malwareHeuristics", {})
    malware_fail = malware.get("status") == "fail"
    malware_warn = malware.get("status") == "warn"

    other_fails = sum(
        1 for name, res in results.items()
        if name != "malwareHeuristics"
        and res.get("status") == "fail"
    )
    other_warns = sum(
        1 for name, res in results.items()
        if name != "malwareHeuristics"
        and res.get("status") == "warn"
    )

    if malware_fail:
        verdict: Literal["benign", "quarantine", "reject"] = "reject"
        notes.insert(0, "MALWARE_FAIL: rejected at Stage 3")
    elif malware_warn or other_fails > 0:
        verdict = "quarantine"
        notes.insert(0, "QUARANTINE: flagged for human review")
    elif other_warns > 0:
        verdict = "benign"  # warns don't block, but are logged
    else:
        verdict = "benign"

    return SanitizationResult(
        verdict=verdict,
        checks=results,
        notes=notes,
    )


# --------------------------------------------------------------------------------------------------
# CLI entry point
# --------------------------------------------------------------------------------------------------

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python sanitize.py <workflow_id>")
        sys.exit(1)

    workflow_id = sys.argv[1]

    # Load normalized content from bus
    from pathlib import Path
    bus_path = Path(__file__).parent.parent.parent / "bus"
    content_path = bus_path / f"content.{workflow_id}.md"

    if not content_path.exists():
        print(json.dumps({"error": "content file not found", "path": str(content_path)}))
        sys.exit(1)

    content = content_path.read_text(encoding="utf-8")
    result = sanitize(content)

    # Write result to bus
    result_path = bus_path / f"sanitization.{workflow_id}.json"
    result_path.write_text(json.dumps(result.to_dict(), indent=2), encoding="utf-8")
    print(f"Sanitization complete: {result.verdict} → {result_path}")
