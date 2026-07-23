---
title: "Test Gutenberg extensions"
description: "Run the shared regression checks for Jetpack blocks and editor extensions."
audience: "Jetpack testers"
document_type: checklist
sidebar_position: 10
sidebar_collapsed: true
---
Use this checklist for shared block and editor behavior. Select the blocks affected by the change instead of treating the list as an exhaustive inventory.

## Prepare

- [ ] Record the WordPress, Jetpack, theme, and browser versions.
- [ ] Use the supported WordPress block editor.
- [ ] Repeat with the latest stable Gutenberg plugin only when required by the change.
- [ ] Include content saved by the previous public Jetpack release when compatibility may be affected.

## Test the editor lifecycle

- [ ] Insert and configure each affected block or extension.
- [ ] Save the post, reload the editor, and edit it again.
- [ ] Copy or transform the block when those controls are available.
- [ ] Verify validation and recovery after intentionally invalid input.
- [ ] Confirm permissions prevent unauthorized actions.

## Test the frontend

- [ ] Verify output while signed in and signed out when visibility differs.
- [ ] Check desktop and mobile widths.
- [ ] Check the affected supported browsers.
- [ ] Verify loading, empty, success, and error states.
- [ ] Confirm existing saved content still renders without a block validation error.

Use the focused [Contact Form](blocks/contact-form.md) and [Memberships](blocks/memberships.md) suites when those areas are affected.
