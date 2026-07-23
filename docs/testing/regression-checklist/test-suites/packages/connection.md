---
title: "Test the Connection package"
description: "Verify connection package states and consumer behavior."
audience: "Jetpack testers"
document_type: checklist
sidebar_position: 10
---
Test on a non-production site with disposable WordPress.com users. Record both the site connection and current user's connection state.

## Test connection states

- [ ] Connect a site without purchasing a product.
- [ ] Connect during a test product-purchase flow when affected.
- [ ] Complete the non-iframe connection flow when affected.
- [ ] Disconnect and reconnect the site.
- [ ] Connect a secondary WordPress user.
- [ ] Verify the relevant multisite flow.
- [ ] Revoke or expire authorization and verify recovery.

## Test package consumers

- [ ] Build and test each changed direct consumer.
- [ ] Verify Jetpack Boost when its connection flow is affected.
- [ ] Verify the relevant WooCommerce consumer when affected.
- [ ] Verify backwards compatibility with the previous public version of the affected plugin.

For every failure, record the site state, user state, entry point, expected result, actual result, and sanitized logs. Never publish connection tokens, nonces, or customer data.
