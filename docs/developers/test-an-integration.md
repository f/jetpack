---
title: Test a Jetpack integration
description: Build a compatibility matrix and validate a plugin or theme integration with Jetpack.
audience: WordPress developers
document_type: how-to
sidebar_position: 50
---

Test the supported contract, not just the happy path on one development site.

## Build the matrix

Include:

- the oldest and newest WordPress versions you support;
- the oldest and newest Jetpack versions you support;
- supported PHP versions;
- connected and disconnected states;
- a representative default theme and your production theme;
- relevant caching, security, or hosting layers;
- multisite only when your integration claims multisite support.

## Test behavior

1. Activate in a clean WordPress site.
2. Activate Jetpack before and after your integration.
3. Exercise the exact setting, hook, block, or endpoint.
4. Test missing permissions and unavailable services.
5. Review PHP, JavaScript, REST, and network errors.
6. Deactivate and uninstall according to your product contract.
7. Verify that saved content and data remain valid after upgrades.

If you are testing a change to Jetpack itself, use the [automated testing guide](../automated-testing.md) and the contributor testing section.

<!-- wp:docspress/result {"status":"success","title":"The supported integration boundary is tested","content":"<p>Activation order, permissions, connection states, failures, upgrades, deactivation, and saved data behave predictably across the version range you publish.</p>","meta":"contract · compatibility · rollback"} /-->
