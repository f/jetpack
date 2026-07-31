---
title: Build with Jetpack
description: A task-based path for WordPress plugin, theme, block, and integration developers.
audience: WordPress developers
document_type: overview
sidebar_position: 20
sidebar_collapsed: true
---

Use this path when you are building a WordPress solution that integrates with Jetpack. If you want to change Jetpack itself, use the [contributor path](../contributors/index.md).

<!-- wp:docspress/audience-paths {"compact":true,"anchor":"choose-an-integration-surface","eyebrow":"Choose an integration surface","title":"What are you building with Jetpack?","description":"Open the guide that matches the behavior, data, or interface you need to work with.","paths":[{"title":"Choose the right integration","description":"Decide whether to use a setting, hook, block, API, or source contribution.","url":"/developer-docs/wordpress-developers/choose-an-integration/","cta":"Compare integration options","icon":"MAP","accent":"blue","newTab":false},{"title":"Change plugin or theme behavior","description":"Use supported actions and filters without modifying Jetpack source.","url":"/developer-docs/wordpress-developers/hooks-and-filters/","cta":"Use hooks and filters","icon":"PHP","accent":"gold","newTab":false},{"title":"Extend the editor","description":"Work with Jetpack blocks, block variations, and editor extensions.","url":"/developer-docs/wordpress-developers/blocks-and-editor/","cta":"Open the block guide","icon":"UI","accent":"coral","newTab":false},{"title":"Use connection or Sync data","description":"Understand Jetpack connection state and synchronized site data.","url":"/developer-docs/wordpress-developers/connection-and-data/","cta":"Open the data guide","icon":"SYNC","accent":"green","newTab":false},{"title":"Validate compatibility","description":"Test an integration across connection states and release environments.","url":"/developer-docs/wordpress-developers/test-an-integration/","cta":"Plan integration tests","icon":"QA","accent":"blue","newTab":false},{"title":"Call a plugin endpoint","description":"Look up Jetpack plugin REST routes, permissions, and responses.","url":"/developer-docs/wordpress-developers/rest-api/","cta":"Browse the REST API","icon":"API","accent":"gold","newTab":false}],"compact":true,"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

For implementation help from an AI assistant, use the [developer prompt library](prompt-library.md).

## Sources of truth

- [Jetpack Developer Resources](https://developer.jetpack.com/) for hooks and developer-oriented guides
- [Jetpack Support](https://jetpack.com/support/) for current product behavior
- This repository for monorepo source, contributor workflows, and the Jetpack plugin REST API reference
- [WordPress developer documentation](https://developer.wordpress.org/) for WordPress APIs and platform conventions

When two sources disagree, prefer the source that owns the behavior and verify against the currently released code.
