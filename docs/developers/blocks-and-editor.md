---
title: Integrate Jetpack blocks and editor features
description: Choose a supported Jetpack block integration and test editor and frontend behavior.
audience: WordPress developers
document_type: how-to
sidebar_position: 30
---

Treat editor behavior and frontend rendering as two parts of the same integration.

## Choose the extension

Before adding code, determine whether you need to:

- use an existing Jetpack block in site content;
- style an existing block through supported WordPress mechanisms;
- extend editor behavior through a documented API;
- contribute to a Jetpack block in the monorepo.

For WordPress block APIs, use the current [Block Editor Handbook](https://developer.wordpress.org/block-editor/). For changes to Jetpack source, switch to [Contribute to Jetpack](../contributors/index.md).

## Test the complete lifecycle

Verify:

1. insertion in the editor;
2. initial and edited attributes;
3. save and reload behavior;
4. frontend rendering;
5. responsive and keyboard behavior;
6. error and disconnected states;
7. migrations of older saved content;
8. compatibility with the WordPress and Jetpack versions you support.

Never rely only on an editor screenshot. Saved block markup and frontend behavior are part of the compatibility contract.
