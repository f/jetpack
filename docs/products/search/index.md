---
title: Jetpack Search
description: Build, customize, test, and troubleshoot Jetpack Search indexing and result experiences.
product: search
product_group: performance
audience: everyone
document_type: overview
sidebar_position: 90
sidebar_collapsed: true
---

Jetpack Search provides hosted indexing and search experiences through a standalone plugin, shared package, blocks, and connected services. Separate indexing problems from query, UI, content, and plan questions before choosing a fix.

<!-- wp:docspress/callout {"tone":"note","title":"Indexing and rendering are different layers","content":"<p>A document can be absent from the index, excluded by a filter, ranked below other results, or hidden by the interface. Capture the query and affected content before changing templates or indexing code.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack Search","title":"Choose your Search task","description":"Open the operational, integration, contribution, reference, or diagnostic path.","paths":[{"title":"Use and administer","description":"Configure Search and follow current indexing and customization guidance.","url":"https://jetpack.com/support/search/","cta":"Open Search Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Work with the Search plugin, package, blocks, hooks, filters, and UI boundaries.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Build the plugin and packages, then test indexing and results with controlled content.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect Search source, package documentation, and supported hooks.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Separate indexing, query, ranking, filter, UI, connection, and service problems.","url":"#troubleshoot-and-support","cta":"Troubleshoot Search","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack Search documentation](https://jetpack.com/support/search/) for current setup, indexing, customization, filters, results, and support procedures.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  plugins/\n    search/\n  packages/\n    search/\n      src/\n        instant-search/\n        search-blocks/\n  plugins/\n    jetpack/\n      modules/\n        search.php","caption":"Search product behavior spans the standalone plugin, shared package, blocks, instant-search client, and historical core module integration."} /-->

Use documented hooks and package APIs. Do not depend on private service requests, generated bundles, or rendered DOM selectors as long-term contracts.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Build and test Jetpack Search","shell":"bash","prompt":"$","command":"jp build plugins/search --deps\njp test php packages/search\njp test js packages/search\njp phan packages/search","output":""} /-->

Create representative content with known post types, taxonomies, dates, and visibility. Verify index eligibility, query behavior, filters, ranking expectations, empty states, keyboard behavior, and responsive results.

## Reference

- [Search plugin source](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/search)
- [Search package source](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/search)
- [Jetpack hooks](https://developer.jetpack.com/hooks/)
- [Hooks and filters guide](../../developers/hooks-and-filters.md)

## Troubleshoot and support

Record the WordPress and Search versions, connection state, affected content ID and visibility, query, filters, expected result, actual result, last content update, and sanitized evidence. Check whether the problem exists in the index, API response, or rendered interface.

Use [Search Support](https://jetpack.com/support/search/) for site-specific indexing or service problems. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for reproducible plugin or package defects.
