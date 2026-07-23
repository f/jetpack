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
