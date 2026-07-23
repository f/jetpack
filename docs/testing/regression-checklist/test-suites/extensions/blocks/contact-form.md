---
title: "Test the Contact Form block"
description: "Verify Contact Form block creation, submission, notification, and frontend behavior."
audience: "Jetpack testers"
document_type: checklist
sidebar_position: 10
---
Use a test site and test addresses. Never submit real customer data.

## Create and edit the form

- [ ] Insert the default Form block and publish the page.
- [ ] Configure required and optional fields.
- [ ] Reload and edit a form saved by the previous public Jetpack release.
- [ ] Verify the editor reports invalid configuration clearly.

## Submit the form

- [ ] Submit valid test data while signed out.
- [ ] Confirm required-field and invalid-input messages.
- [ ] Confirm the submission appears in the expected dashboard location.
- [ ] Confirm the expected notification reaches the test recipient.
- [ ] Submit twice and verify duplicate or spam handling when relevant.

## Verify presentation and compatibility

- [ ] Check the supported desktop and mobile browsers affected by the change.
- [ ] Check the frontend at desktop and mobile widths.
- [ ] Check AMP only when the affected feature supports it.
- [ ] Confirm a failed or delayed network request produces a recoverable state.

Record sanitized screenshots, console errors, network failures, and relevant log entries for every failed check.
