---
title: Jetpack
description: Navigate the core Jetpack plugin, shared platform services, supported integrations, source, tests, and support.
product: jetpack
product_group: platform
audience: everyone
document_type: overview
sidebar_position: 10
sidebar_collapsed: true
---

Jetpack is both an umbrella brand and the core plugin that connects many WordPress sites to WordPress.com services. This hub covers the core plugin and shared platform responsibilities; standalone products keep their own documentation hubs.

<!-- wp:docspress/callout {"tone":"note","title":"Name the owning product before changing code","content":"<p>A feature visible inside Jetpack may be implemented by the core plugin, a standalone plugin, a shared package, or a WordPress.com service. Confirm the source project and public compatibility contract before choosing a build or test command.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack","title":"Choose your Jetpack task","description":"Follow the path that matches whether you operate a site, integrate from another project, change the monorepo, need a reference, or are diagnosing a problem.","paths":[{"title":"Use and administer","description":"Install, connect, configure, and operate Jetpack using maintained support guidance.","url":"https://jetpack.com/support/","cta":"Open Jetpack Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Choose hooks, blocks, REST routes, connection data, or another supported extension surface.","url":"/developer-docs/wordpress-developers/choose-an-integration/","cta":"Choose an integration","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Set up the monorepo, build the core plugin, and run risk-appropriate checks.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Use the REST, hooks, source, and shared platform references that own the behavior.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Separate connection, compatibility, product, and environment problems before changing production.","url":"/developer-docs/site-owners/troubleshoot/","cta":"Troubleshoot Jetpack","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack Support](https://jetpack.com/support/) for current installation, connection, settings, compatibility, and account procedures. For a goal-first path that avoids enabling overlapping products, start with [Choose Jetpack products and features](../../site-owners/choose-products.md).

Do not copy current plan limits or feature availability into code comments or long-lived implementation notes. Link the owning support page and record when it was reviewed.

## Build and integrate

Use the narrowest supported surface:

- [Hooks and filters](../../developers/hooks-and-filters.md) for documented PHP extension points.
- [Blocks and editor integrations](../../developers/blocks-and-editor.md) for editor behavior.
- [Connection and data](../../developers/connection-and-data.md) for site registration, authorization, and Sync concepts.
- [REST API](../../rest-api.md) for registered routes, permission callbacks, and request contracts.
- A source contribution when the behavior belongs in Jetpack itself.

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  plugins/\n    jetpack/\n  packages/\n    connection/\n    sync/\n    my-jetpack/\n  js-packages/\n    components/\ntools/\n  cli/\n  docker/","caption":"The core plugin composes shared packages and tooling. Inspect the project metadata and nearest instructions before changing or testing a component."} /-->

## Contribute and test

Start with the [contributor quick start](../../quick-start.md), then select checks from the affected project.

<!-- wp:docspress/terminal-session {"title":"Build the core plugin and its dependencies","shell":"bash","prompt":"$","command":"jp build plugins/jetpack --deps","output":""} /-->

The core plugin requires the full Docker WordPress environment for its PHP suite:

<!-- wp:docspress/terminal-session {"title":"Run the Jetpack PHP suite","shell":"bash","prompt":"$","command":"tools/docker/bin/seed-worktree-env.sh\njp docker up -d\njp docker install\njp docker phpunit jetpack","output":""} /-->

Run the affected JavaScript tests and static analysis as described in [Automated testing](../../automated-testing.md). Every change under `projects/` also needs the owning project's changelog entry.

## Reference

- [Jetpack source](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/jetpack)
- [Jetpack hooks](https://developer.jetpack.com/hooks/)
- [Jetpack REST API guide](../../rest-api.md)
- [Monorepo structure and tooling](../../contributors/monorepo/index.md)
- [Coding standards and guidelines](../../coding-guidelines.md)

Related product hubs:

- [Jetpack Forms](../forms/index.md)
- [Jetpack AI Assistant](../ai/index.md)
- [Jetpack Social](../social/index.md)
- [Jetpack Stats](../stats/index.md)

## Troubleshoot and support

Record the WordPress and Jetpack versions, active Jetpack products, connection state, environment, steps, expected result, actual result, and sanitized evidence. Use staging for connection experiments, cache changes, or plugin deactivation.

For product-specific behavior, switch to that product's hub. For a reproducible source defect, search the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) before opening a focused report.
