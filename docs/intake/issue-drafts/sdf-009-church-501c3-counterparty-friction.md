# SDF-009: Church 501(c)(3) Automatic Exemption — Counterparty Verification Strategy

## Status
draft

## Type
operational

## Summary
Document and plan for the counterparty verification friction that arises from choosing the "speed-to-operate" path (church qualifies as 501(c)(3) automatically without filing Form 1023). The church won't appear in IRS BMF by default, which creates friction with payment processors, grant portals, and donor verification tools.

## Problem

Churches that don't file Form 1023 may not appear in IRS Tax Exempt Organization Search / BMF. Counterparties (Stripe, PayPal, grant portals, donor tools) often require a determination letter to classify an account as nonprofit/charity. Speed-to-operate defers this friction but doesn't eliminate it.

## Verified Requirements Per Rail

### Stripe
- Nonprofits may be asked for a 501(c)(3) determination letter as supporting documentation
- Without determination letter: expect manual review friction, possible requirements to provide alternative documentation

### PayPal Giving Fund
- Explicitly requires determination letter for "religious institution" enrollment

### Givebutter
- Verifies nonprofit status via Candid/GuideStar
- Explicitly supports verification of fiscally sponsored orgs using parent EIN (relevant for VieDay/Villaticus via church sponsorship)

### IRS BMF
- Only populated for orgs that have received determination letter
- Donors checking deductibility may look here; church without 1023 may not appear

## Mitigation Options

1. **File Form 1023 voluntarily** (even if not required): gets determination letter, appears in BMF, removes counterparty friction. Cost: time (3-6 months typical), possible scrutiny.
2. **Use alternative verification documentation**: state nonprofit registration, formed document, published doctrine/religious activity evidence. Works for some rails, not all.
3. **Fiscal sponsorship via parent EIN** (for VieDay/Villaticus): Givebutter-style verification using sponsor's EIN. Does not help the church directly.
4. **Defer fancy platform enrollment**: operate via simpler rails (Stripe direct without charity program, ACH checks) while church establishes track record.

## Decision

Speed-to-operate chosen. Counterparty friction is an operational nuisance to be managed, not a legal blocker. Plan: defer 1023 filing until a counterparty forces the issue or donation volume justifies the effort.

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "church 501(c)(3) automatic exemption"
- IRS: churches not required to file 1023; automatic exemption if qualifying

## Labels

church, nonprofit, 501c3, verification, stripe, paypal, counterparty

## Priority

medium