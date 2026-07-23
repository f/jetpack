---
title: "Test Jetpack Social sharing"
description: "Verify Jetpack Social connection, sharing, and recovery behavior."
audience: "Jetpack testers"
document_type: checklist
sidebar_position: 10
---
Jetpack source may still use the historical name `publicize`. In user-facing documentation and test reports, call the product **Jetpack Social**.

## Connect a test account

- [ ] Connect one currently supported social network.
- [ ] Confirm the connection appears for the correct WordPress.com user.
- [ ] Disconnect and reconnect the test account.
- [ ] Verify expired or revoked authorization produces a recoverable error.

## Share content

- [ ] Publish a new post to one connected network.
- [ ] Publish a new post to all selected test connections.
- [ ] Customize the share message and verify the result.
- [ ] Verify the expected behavior for scheduled, updated, and already-published posts.
- [ ] Confirm an image or preview follows the selected settings when relevant.

## Record the result

Capture the Jetpack and WordPress versions, connection state, selected networks, expected result, actual result, and sanitized evidence. Never include social-network credentials or access tokens.
