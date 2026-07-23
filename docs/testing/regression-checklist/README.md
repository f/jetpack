---
title: "Run the Jetpack regression checklist"
description: "Coordinate a release regression pass and record environment and product-area results."
audience: "Jetpack testers"
document_type: how-to
sidebar_position: 20
sidebar_collapsed: true
---
Use this section to plan and record a release regression pass. It combines a shared environment checklist with focused suites for affected product areas.

## Before testing

1. Identify the release, build, or commit under test.
2. Read the change list and select the affected product-area suites.
3. Choose representative environments from the [global checklist](regression-checklist.md).
4. Use test accounts and non-production sites.
5. Decide where results, failures, and evidence will be recorded.

The adjacent [`mapping.json`](https://github.com/Automattic/jetpack/blob/trunk/docs/testing/regression-checklist/mapping.json) connects changed source paths to focused test suites. Treat it as an automation input, not a substitute for reviewing the actual change.

## Run the pass

For each selected environment and suite:

- record the WordPress, PHP, browser, Jetpack, theme, and relevant plugin versions;
- run the happy path and at least one failure or recovery path;
- capture the exact step and evidence for every failure;
- state **pass**, **fail**, **blocked**, or **not applicable** instead of leaving an ambiguous blank item.

Use the [product-area test suites](../../contributors/testing/test-suites/index.md) for blocks, modules, and packages.

## Finish the pass

A regression pass is complete when:

- every selected check has an explicit result;
- blockers and skipped checks have an owner and explanation;
- reproducible failures link to a [useful bug report](../../guides/report-bugs.md);
- the tested build and environments are recorded;
- no credentials, tokens, private URLs, or customer data appear in the report.
