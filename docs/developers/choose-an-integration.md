---
title: Choose a Jetpack integration
description: Select the narrowest supported extension point for a WordPress development task.
audience: WordPress developers
document_type: explanation
sidebar_position: 10
---

Choose an integration surface before writing code.

## Decision guide

| Need | Prefer | Why |
| --- | --- | --- |
| Configure an existing feature | WordPress or Jetpack settings | No custom code to maintain |
| Adjust documented behavior | A documented action or filter | Small, upgrade-friendly extension point |
| Add editor content | A supported block or block extension | Matches the WordPress editor model |
| Read or update supported Jetpack state | A documented REST endpoint | Explicit request and response contract |
| Use a Jetpack capability in another plugin | A public package or API documented by its project | Avoids depending on private plugin internals |
| Fix or extend Jetpack itself | A repository contribution | The behavior belongs upstream |

## Avoid private implementation dependencies

Do not build against:

- internal classes or functions without a public compatibility contract;
- generated bundle paths;
- database keys discovered only by inspection;
- undocumented WordPress.com endpoints;
- UI text or DOM structure as if it were an API.

If no supported extension point exists, document the use case and open a focused issue before shipping a fragile workaround.

## Define success before implementation

Write down:

1. the user-visible outcome;
2. the Jetpack product and version range;
3. the WordPress and PHP version range;
4. the data and permissions involved;
5. staging tests and rollback behavior.

Then continue to the relevant guide in this section.

## Choose the owning product

After choosing an integration surface, open the product hub to find its source projects, public references, focused tests, and support boundary:

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Product documentation","title":"Which product owns the behavior?","description":"Start with the complete product directory or jump to common integration surfaces.","paths":[{"title":"All Jetpack products","description":"Browse every product hub by platform, growth, performance, media, and security.","url":"/developer-docs/products/","cta":"Browse products","icon":"MAP","accent":"blue","newTab":false},{"title":"Jetpack Forms","description":"Work with form blocks, fields, submissions, feedback data, hooks, and integrations.","url":"/developer-docs/products/forms/","cta":"Open Forms docs","icon":"FORM","accent":"gold","newTab":false},{"title":"Jetpack Search","description":"Work with indexing, filters, blocks, packages, and result experiences.","url":"/developer-docs/products/search/","cta":"Open Search docs","icon":"SEARCH","accent":"coral","newTab":false},{"title":"Jetpack Social","description":"Work with connections, publishing, Publicize compatibility, and recovery.","url":"/developer-docs/products/social/","cta":"Open Social docs","icon":"SHARE","accent":"green","newTab":false},{"title":"Jetpack Protect and Scan","description":"Distinguish vulnerability, firewall, malware, and remediation responsibilities.","url":"/developer-docs/products/protect/","cta":"Open security docs","icon":"SHIELD","accent":"blue","newTab":false},{"title":"Jetpack platform","description":"Use the core plugin hub for connection, Sync, REST, hooks, and shared services.","url":"/developer-docs/products/jetpack/","cta":"Open Jetpack docs","icon":"WP","accent":"gold","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->
