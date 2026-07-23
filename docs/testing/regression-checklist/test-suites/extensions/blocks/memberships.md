---
title: "Test Memberships blocks"
description: "Verify Memberships and Premium Content block visibility and payment-related states."
audience: "Jetpack testers"
document_type: checklist
sidebar_position: 20
---
Use test accounts, test plans, and a non-production site. Do not create a real charge during routine regression testing.

## Test visibility

- [ ] Publish content visible to everyone and verify it in a signed-out browser.
- [ ] Publish subscriber-only content and verify it as a visitor and subscriber.
- [ ] Publish paid-subscriber content and verify it as a visitor, free subscriber, and paid test subscriber.
- [ ] Confirm comments follow the intended visibility rules.
- [ ] Request a one-time login code with a test subscriber and complete the flow.
- [ ] Verify expired or invalid codes fail safely.

## Test Premium Content

- [ ] Add or select a test payment plan from the block settings.
- [ ] Publish a page with visitor and subscriber content.
- [ ] Verify each role sees only the intended content.
- [ ] Verify loading, cancellation, failed-payment, and success states when the test environment supports them.
- [ ] Reload and edit content saved by the previous public Jetpack release.

Record the account state, plan state, expected visibility, actual visibility, and sanitized evidence for every result.
