---
title: Use Jetpack documentation with AI
description: Give an AI assistant the right Jetpack context, protect sensitive data, and verify every result.
audience: everyone
document_type: how-to
sidebar_position: 40
---

AI assistants can help navigate documentation, explain code, and draft test plans. They can also use stale sources, invent APIs, or suggest unsafe production actions.

## Start with a bounded task

State:

- your audience and goal;
- WordPress, Jetpack, PHP, and browser versions when relevant;
- the exact Jetpack product, plugin, package, hook, block, or endpoint;
- the environment: local, staging, or production;
- constraints and actions the assistant must not take;
- the official pages or source files it must use.

## Use machine-readable docs

When the DocsPress theme publishes this documentation:

- `/llms.txt` lists the available documentation pages;
- each documentation route has a Markdown form ending in `.md`;
- Markdown frontmatter identifies the audience, document type, description, and sidebar order.

Give an assistant the narrowest relevant `.md` pages instead of the entire site.

## Protect sensitive data

Never include:

- passwords, access tokens, cookies, nonces, private keys, or license keys;
- customer or subscriber data;
- private site, admin, incident, or billing URLs;
- database exports or configuration files that have not been redacted;
- proprietary client requirements without permission.

## Require evidence

Ask the assistant to:

1. cite the exact documentation page or source file for each Jetpack-specific claim;
2. distinguish documented behavior from inference;
3. identify version assumptions;
4. provide a reversible local or staging test;
5. stop before destructive, production, account, billing, or publication actions.

## Verify the answer

Check that:

- links open and support the claim;
- hook names, parameters, endpoints, commands, and file paths exist;
- code follows current WordPress security and escaping practices;
- the result works in a clean local or staging environment;
- failure and rollback behavior are understood.

Use the prompt library in your audience path:

- [Site owners](../site-owners/prompt-library.md)
- [WordPress developers](../developers/prompt-library.md)
- [Agencies](../agencies/prompt-library.md)
- [Jetpack contributors](../contributors/prompt-library.md)
