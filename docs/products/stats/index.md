---
title: Jetpack Stats
description: Understand Jetpack Stats collection, reporting, packages, privacy boundaries, testing, and support.
product: stats
product_group: growth
audience: everyone
document_type: overview
sidebar_position: 110
sidebar_collapsed: true
---

Jetpack Stats collects and presents site traffic information through the core plugin, Stats packages, and reporting surfaces. Product documentation must distinguish observed traffic, reporting behavior, privacy choices, and commercial or plan questions.

<!-- wp:docspress/callout {"tone":"note","title":"Use representative test traffic","content":"<p>Admin views, logged-in visits, caches, consent tools, and local environments can change what is recorded. Define the expected visitor and environment before treating a missing or extra view as a defect.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack Stats","title":"Choose your Stats task","description":"Open the operational, development, contribution, reference, or troubleshooting path.","paths":[{"title":"Use and administer","description":"Configure Stats and interpret current reports using maintained support guidance.","url":"https://jetpack.com/support/jetpack-stats/","cta":"Open Stats Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Understand collection, dashboard, package, consent, and connection boundaries.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Run package checks and exercise representative signed-out traffic.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect Stats packages, the core module, and regression coverage.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Classify collection, display, timezone, consent, cache, and service problems.","url":"#troubleshoot-and-support","cta":"Troubleshoot Stats","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack Stats documentation](https://jetpack.com/support/jetpack-stats/) for current setup, reporting, privacy, access, and support procedures. Verify current product and plan details at the owning source rather than copying them here.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  packages/\n    stats/\n    stats-admin/\n  plugins/\n    jetpack/\n      modules/\n        stats.php\n  packages/\n    connection/\n    cookie-consent/","caption":"Stats collection and administration span packages and the core module. Consent and connection behavior may affect the observed result."} /-->

Do not treat tracking request internals, database options, or dashboard DOM structure as public integration contracts.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Run Stats package checks","shell":"bash","prompt":"$","command":"jp test php packages/stats\njp test js packages/stats\njp phan packages/stats","output":""} /-->

Use the [Stats regression suite](../../testing/regression-checklist/test-suites/modules/stats.md). Test signed-out representative visits, expected exclusions, report timing, timezone boundaries, and the affected dashboard surface.

## Reference

- [Stats package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/stats)
- [Stats Admin package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/stats-admin)
- [Core Stats module](https://github.com/Automattic/jetpack/blob/trunk/projects/plugins/jetpack/modules/stats.php)
- [Stats regression checklist](../../testing/regression-checklist/test-suites/modules/stats.md)

## Troubleshoot and support

Record the WordPress and Stats versions, visitor login state, consent state, cache/CDN behavior, timezone, tested URL, visit time, expected report, actual report, and sanitized evidence. Allow for documented reporting delay before concluding that collection failed.

Use [Stats Support](https://jetpack.com/support/jetpack-stats/) for site-specific reporting problems. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for reproducible source defects.
