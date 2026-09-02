# Contributing

## Change flow

1. Create a branch from the current `master` head.
2. Keep each pull request focused and reviewable.
3. Do not merge while `Site Quality` is failing or still running.
4. For changes that affect deployment, confirm the Pages build and deploy workflow succeeds after merge.
5. Prefer source changes over edits to generated output. `_site/` must remain untracked.

## Required verification

Before merge, the pull request should satisfy the checks in `.github/workflows/quality.yml`, including:

- locked Ruby dependencies resolve;
- the production Jekyll build succeeds;
- critical homepage, navigation, portfolio, article, RSS, and asset invariants remain intact;
- retired legacy runtime and generated surfaces are not reintroduced.

## Repository protection

The intended `master` policy is:

- require a pull request before merging;
- require the `Site Quality / build` check;
- require the branch to be up to date before merge when GitHub can enforce it reliably;
- block force pushes and branch deletion;
- apply rules to administrators as well as contributors unless an emergency recovery requires an explicit temporary override.

GitHub repository settings or a repository ruleset must enforce those controls. Workflow YAML alone cannot prevent an administrator from pushing directly to an unprotected branch.

## Release smoke

After a production deployment, verify the checklist in `docs/RELEASE_SMOKE.md`. A successful build is necessary but does not replace a live-surface smoke test.
