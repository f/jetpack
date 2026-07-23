---
title: Set up Jetpack development
description: Choose between the fast contributor setup and the complete environment reference.
audience: Jetpack contributors
document_type: overview
sidebar_position: 10
sidebar_collapsed: true
---

Start with the quick path. Use the full environment guide only when your project or operating system needs more detail.

<!-- wp:docspress/audience-paths {"compact":true,"anchor":"choose-a-setup-path","eyebrow":"Choose a setup path","title":"How much setup detail do you need?","description":"Use the quick path for a first contribution or the complete reference for a specialized environment.","paths":[{"title":"Get running quickly","description":"Clone the monorepo, install required tools, build Jetpack, and start WordPress locally.","url":"/developer-docs/contributors/getting-started/quick-start/","cta":"Use the quick start","icon":"GO","accent":"blue","newTab":false},{"title":"Configure the full environment","description":"Reference Docker, dependencies, builds, tests, linting, debugging, and WordPress.com workflows.","url":"/developer-docs/contributors/getting-started/development-environment/","cta":"Open the complete setup","icon":"ENV","accent":"gold","newTab":false}],"compact":true,"columns":2,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Verify before coding

Confirm that:

- `jetpack --version` runs from the repository;
- required package-manager and runtime versions match the repository;
- the project you intend to change builds;
- the relevant test command can start;
- Git points to your fork and the upstream repository as intended.

Continue to [Contributor workflow](../workflow/index.md) when the environment is ready.
