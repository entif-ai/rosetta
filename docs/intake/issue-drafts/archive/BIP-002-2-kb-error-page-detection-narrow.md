# BIP-002-2 — Error-Page Detection Signal Set Too Narrow

**Use Case:** BIP-002 (Knowledge Base RAG)
**Confidence:** MEDIUM
**Type:** reliability

## Description

The error-page detection step requires 2+ signals from a hardcoded list of 7 phrases to classify a page as an error. The signal set is too narrow and unweighted, causing false rejections of real content and no protection against novel error pages.

## Specific Problems

1. **Phrase overlap with real content:** "sign in" appears in navigation of countless legitimate pages; a user login wall is different from an error page but would trigger this signal. "404" appears in legitimate error-handling documentation.
2. **No signal weighting:** A page containing "access denied" (severe signal) weighted the same as "captcha" (could be a captcha-challenge page that still has content below).
3. **Novel error pages unhandled:** Cloudflare, Incapsula, and other WAFs return custom error pages with messages not in the list (e.g., "Security check failed", "Attention required", "Verify you are human"). These bypass detection.
4. **Case sensitivity not specified:** Is matching case-insensitive? "ACCESS DENIED" would not match the lowercase "access denied".
5. **2+ threshold is arbitrary:** Why 2 and not 1 or 3? There is no justification for the threshold.

## Expected Behavior

Error-page detection should:
1. Use a weighted scoring model rather than a binary count
2. Include Cloudflare Captcha Challenge, "Attention required", "Security check failed", and other common WAF messages
3. Treat "sign in" as a signal only when paired with layout signals (e.g., full-page overlay, no navigation)
4. Be case-insensitive
5. Include HTTP status code as an input (404, 403, 500 from the HTTP response) alongside content signals

## Source Reference

BIP-002, "Content quality validation" section: "Detect error pages by looking for 2+ signals: 'access denied', 'captcha', 'please enable javascript', 'cloudflare', '404', 'sign in', 'blocked', 'rate limit'"
