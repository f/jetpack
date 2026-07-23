---
title: Improve site performance with Jetpack
description: Establish a performance baseline, enable one optimization at a time, and verify the result.
audience: site owners
document_type: how-to
sidebar_position: 40
---

Performance work should start with measurement, not a list of toggles.

## Measure first

Record:

- the page and device type you are testing;
- Core Web Vitals or another repeatable performance measurement;
- active cache, CDN, image optimization, and minification tools;
- the date and the deployed site version.

## Change one layer at a time

1. Fix obvious hosting, theme, or plugin errors.
2. Choose one Jetpack performance capability.
3. Test it on staging when possible.
4. Purge relevant caches.
5. Repeat the same measurement.
6. Keep the change only if it improves the target without breaking the site.

The [Jetpack performance guide](https://jetpack.com/support/performance/) and [Jetpack Boost documentation](https://jetpack.com/support/jetpack-boost/) describe the current product controls.

## Check for overlap

Ask the host whether it already provides full-page caching, image CDN, lazy loading, critical CSS, or asset optimization. Two tools solving the same layer can make results harder to predict.
