---
title: Build with Jetpack
description: A task-based path for WordPress plugin, theme, block, and integration developers.
audience: WordPress developers
document_type: overview
sidebar_position: 20
sidebar_collapsed: true
---

Use this path when you are building a WordPress solution that integrates with Jetpack. If you want to change Jetpack itself, use the [contributor path](../contributors/index.md).

## Choose an integration surface

| You need to… | Start here |
| --- | --- |
| Decide whether to use a setting, hook, block, API, or source contribution | [Choose a developer integration](choose-an-integration.md) |
| Change Jetpack behavior from a plugin or theme | [Use hooks and filters](hooks-and-filters.md) |
| Work with Jetpack blocks or editor extensions | [Integrate blocks and editor features](blocks-and-editor.md) |
| Understand site connection or synchronized data | [Work with connection and data](connection-and-data.md) |
| Validate compatibility before release | [Test a Jetpack integration](test-an-integration.md) |
| Call a Jetpack plugin endpoint | [Jetpack REST API](../rest-api.md) |
| Ask an AI assistant for implementation help | [Prompt library for developers](prompt-library.md) |

## Sources of truth

- [Jetpack Developer Resources](https://developer.jetpack.com/) for hooks and developer-oriented guides
- [Jetpack Support](https://jetpack.com/support/) for current product behavior
- This repository for monorepo source, contributor workflows, and the Jetpack plugin REST API reference
- [WordPress developer documentation](https://developer.wordpress.org/) for WordPress APIs and platform conventions

When two sources disagree, prefer the source that owns the behavior and verify against the currently released code.
