---
title: "Test the Sync package"
description: "Verify Sync package behavior and data flow."
audience: "Jetpack testers"
document_type: checklist
sidebar_position: 20
---
Use a test site. Add only synthetic content that can safely appear in test logs and remote tools.

## Generate changes

- [ ] Create, update, and delete a test post.
- [ ] Install, activate, deactivate, and remove a test plugin when the change affects plugin events.
- [ ] Update the specific option or object type affected by the code change.

## Verify data flow

- [ ] Confirm expected events appear in the WordPress.com Activity Log or owning test tool.
- [ ] Confirm event ordering and timestamps are understandable.
- [ ] Confirm fields contain the expected synthetic data and omit secrets.
- [ ] Confirm duplicate or replay behavior matches the expected contract.
- [ ] Interrupt connectivity, restore it, and confirm later changes recover when relevant.

Record the local action time, expected remote event, actual remote event, delay, and sanitized evidence.
