---
title: Jetpack Boost
description: Build, extend, test, and troubleshoot Jetpack Boost performance modules and packages.
product: boost
product_group: performance
audience: everyone
document_type: overview
sidebar_position: 40
sidebar_collapsed: true
---

Jetpack Boost improves site performance through a standalone plugin and shared packages. Performance behavior can overlap with hosting, caching, CDN, optimization, and theme tooling, so establish a baseline before changing configuration or code.

<!-- wp:docspress/callout {"tone":"warning","title":"Measure before and after","content":"<p>A green setting is not proof of a faster site. Record representative URLs, cache state, device profile, network conditions, and performance metrics before the change, then repeat the same measurement after it.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack Boost","title":"Choose your Boost task","description":"Separate site operation, integration, source contribution, reference, and compatibility work.","paths":[{"title":"Use and administer","description":"Install, configure, measure, and troubleshoot Boost with maintained product guidance.","url":"https://jetpack.com/support/jetpack-boost/","cta":"Open Boost Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Understand plugin modules, caching boundaries, Critical CSS, and shared package ownership.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Build the plugin, run project tests, and verify performance behavior in a controlled environment.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect the plugin, package, development guide, and cache API sources.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Separate cache, optimization, theme, plugin, host, and measurement failures.","url":"#troubleshoot-and-support","cta":"Troubleshoot Boost","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack Boost documentation](https://jetpack.com/support/jetpack-boost/) for current installation, module, cache, optimization, and support procedures. Compare Boost with existing host-level page caching, optimization, minification, image delivery, and CDN features before enabling overlapping behavior.

## Build and integrate

Boost behavior spans the plugin and shared packages:

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  plugins/\n    boost/\n      app/\n      docs/\n        Cache_API.md\n        DEVELOPEMENT_GUIDE.md\n      tests/\n  packages/\n    boost-core/\n    boost-speed-score/","caption":"Begin in the plugin for product behavior, then follow imports into shared packages. Treat planning documents as internal source context, not public product documentation."} /-->

Use public hooks or documented APIs when integrating. Do not depend on generated bundles, private React component structure, transient option names, or cache files as compatibility contracts.

## Contribute and test

Read the plugin's nearest instructions and project metadata before running checks.

<!-- wp:docspress/terminal-session {"title":"Build and test Jetpack Boost","shell":"bash","prompt":"$","command":"jp build plugins/boost --deps\njp test php plugins/boost\njp test js plugins/boost\njp phan plugins/boost","output":""} /-->

Add focused browser or end-to-end coverage when the change affects page output, caching, module activation, or performance measurement. Repeat manual measurements with a warm and cold cache where relevant.

## Reference

- [Boost plugin source](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/boost)
- [Boost development guide](https://github.com/Automattic/jetpack/blob/trunk/projects/plugins/boost/docs/DEVELOPEMENT_GUIDE.md)
- [Boost cache API](https://github.com/Automattic/jetpack/blob/trunk/projects/plugins/boost/docs/Cache_API.md)
- [Boost Core package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/boost-core)
- [Boost Speed Score package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/boost-speed-score)

For shared Jetpack connection behavior, use [Connection and data](../../developers/connection-and-data.md).

## Troubleshoot and support

Record the URL, theme, active optimization plugins, host caching/CDN features, Boost modules, cache state, device profile, metric source, and before/after results. Reproduce on staging before disabling production caching or optimization.

If the issue is site configuration, follow [Boost Support](https://jetpack.com/support/jetpack-boost/). If it is a reproducible source defect, search the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) and include sanitized evidence.
