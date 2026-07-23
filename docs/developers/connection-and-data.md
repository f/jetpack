---
title: Work with Jetpack connection and data
description: Understand Jetpack's WordPress.com connection before building data or authentication integrations.
audience: WordPress developers
document_type: explanation
sidebar_position: 40
---

Many Jetpack features combine code on the WordPress site with services on WordPress.com. An integration must account for connection state, permissions, and failure modes.

## Distinguish the states

Your code may encounter:

- Jetpack not installed;
- Jetpack installed but not connected;
- a site-level connection without the user authorization your task needs;
- a connected user who lacks the required WordPress capability;
- a staging, cloned, or migrated site;
- a temporarily unavailable remote service.

Design a useful message and safe fallback for every state your feature can reach.

## Use supported contracts

- Use documented WordPress capabilities for local authorization.
- Use [documented Jetpack hooks](https://developer.jetpack.com/hooks/) for extension points.
- Use the [Jetpack REST API](../rest-api.md) only for endpoints and permissions it documents.
- Use [Jetpack Support's connection explanation](https://jetpack.com/support/why-the-wordpress-com-connection-is-important-for-jetpack/) for current product behavior.

Do not copy tokens, nonces, connection secrets, or private site data into logs, support tickets, or AI prompts.

## Test failure and recovery

Test disconnected, expired, insufficient-permission, timeout, and retry behavior. Confirm that a failed remote request cannot leave the local site in a partially changed state.
