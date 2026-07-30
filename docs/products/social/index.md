---
title: Jetpack Social
description: Build, test, and troubleshoot Jetpack Social connections and publishing workflows.
product: social
product_group: growth
audience: everyone
document_type: overview
sidebar_position: 100
sidebar_collapsed: true
---

Jetpack Social connects a WordPress publishing workflow to supported social networks. The user-facing name is Jetpack Social; source and historical tests may still use the name Publicize.

<!-- wp:docspress/callout {"tone":"warning","title":"Publishing tests can reach real audiences","content":"<p>Use test accounts and private or staging content. Confirm the connected accounts, audience, message, media, and expected network behavior before triggering a share.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack Social","title":"Choose your Social task","description":"Separate account operation, editor integration, source contribution, reference, and publishing recovery.","paths":[{"title":"Use and administer","description":"Connect accounts, configure sharing, and follow current publishing guidance.","url":"https://jetpack.com/support/jetpack-social/","cta":"Open Social Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Understand the plugin, Publicize package, editor surfaces, and connection boundaries.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Build the product and test sharing with controlled accounts.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect the Social plugin, Publicize package, and regression suite.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Classify account, connection, scheduling, media, network, and publishing failures.","url":"#troubleshoot-and-support","cta":"Troubleshoot Social","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack Social documentation](https://jetpack.com/support/jetpack-social/) for current network support, account connection, sharing, scheduling, media, and support procedures.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  plugins/\n    social/\n  packages/\n    publicize/\n    connection/\n  plugins/\n    jetpack/\n      modules/\n        publicize/","caption":"The standalone Social plugin and Publicize package own current product behavior; historical core-plugin paths explain compatibility and migration."} /-->

Treat network tokens, remote service contracts, and editor DOM structure as private implementation details unless the owning source documents a public contract.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Build and test Jetpack Social","shell":"bash","prompt":"$","command":"jp build plugins/social --deps\njp test php plugins/social\njp test js plugins/social\njp phan plugins/social","output":""} /-->

Run the [Social regression suite](../../testing/regression-checklist/test-suites/modules/publicize.md) with test accounts. Verify initial connection, publishing, retry/recovery, disconnect, and reconnection behavior affected by the change.

## Reference

- [Social plugin source](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/social)
- [Publicize package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/publicize)
- [Social regression checklist](../../testing/regression-checklist/test-suites/modules/publicize.md)
- [Connection and data](../../developers/connection-and-data.md)

## Troubleshoot and support

Record the WordPress and Social versions, network, account type, connection state, post type, schedule, media shape, expected result, actual result, and sanitized timestamps. Never publish network access tokens or private account identifiers.

Use [Social Support](https://jetpack.com/support/jetpack-social/) for account and service problems. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for reproducible plugin or package defects.
