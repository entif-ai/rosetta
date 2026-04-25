# Issue Draft: Missing `known-red-tests` policy definition and documentation

## Title

Missing: `known-red-tests` policy definition and documentation

## Type

policy

## Labels

- test-strategy
- CI
- red-tests
- policy

## Depends On

- CI configuration

## Evidence

The scaffold-forge output (`section 16: CI/CD and Release Gates`) references two distinct CI policies:

1. **"known red tests allowed" policy** — during active development, some tests are expected to fail and this is acceptable
2. **"must be green before tag" policy** — before a release tag is cut, ALL tests must be green

The scaffold defines the existence of the first policy but provides no definition of:
- Which specific tests are in the "known red" category
- How long a test may remain in the "known red" state
- Who has the authority to add or remove tests from this category
- What the process is for promoting a "known red" test to "must be green"
- How this policy is enforced in CI (are known-red tests allowed to fail in CI but not at tag time?)

Without this definition, the policy is unenforceable and will cause confusion during release planning.

## Recommendation

Define the `known-red-tests` policy in a document (e.g., `docs/reference/known-red-tests-policy.md`) that specifies:
- The criteria for a test to be in the "known red" category
- A registry of currently-known-red tests with creation date, reason, and owner
- The maximum duration a test may remain in this category before requiring review
- The process for promoting a test out of the "known red" category
- CI configuration that allows known-red tests to fail without blocking merges but fails the release pipeline if any test outside this category is red
