---
title: Understand the monorepo and project tools
description: Navigate Jetpack projects, generators, build tools, mirrors, and advanced WordPress.com workflows.
audience: Jetpack contributors
document_type: overview
sidebar_position: 50
sidebar_collapsed: true
---

Use these references after the contributor quick start:

- [Jetpack monorepo overview](../../monorepo.md) — layout, project generation, builds, tests, mirrors, release tooling, and new projects.
- [Advanced Unison configuration](../../unison-wordpress-com.md) — WordPress.com sandbox synchronization for contributors who use that environment.
- [Development environment](../../development-environment.md) — tool installation, Docker, debugging, and local workflows.

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"AGENTS.md\nprojects/\n  github-actions/\n    [action]/\n      README.md\n  js-packages/\n    [package]/\n      package.json\n  packages/\n    [package]/\n      composer.json\n  plugins/\n    [plugin]/\n      composer.json\n      package.json\ntools/\n  cli/\n  docker/","caption":"Start at the repository instructions, identify the owning project type, then read that project's metadata and nearest instructions."} /-->

If you only need to change one project, read its project-level `README.md` and `AGENTS.md` before the full monorepo reference.

<!-- wp:docspress/callout {"tone":"tip","title":"The nearest project contract wins","content":"<p>Repository-wide commands are defaults. A project can define a narrower runtime, build, test, release, or changelog workflow in its own metadata and instructions.</p>","collapsible":false} /-->
