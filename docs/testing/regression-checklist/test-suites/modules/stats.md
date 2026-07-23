---
title: "Test Stats"
description: "Verify the Stats module's activation, data, and dashboard behavior."
audience: "Jetpack testers"
document_type: checklist
sidebar_position: 20
---
Use a test site and record the time of each visit so you can distinguish new test data from existing traffic.

## Generate test visits

- [ ] Visit the home page while signed out.
- [ ] Visit a published post while signed out.
- [ ] Visit the same pages while signed in when the changed behavior may depend on user state.
- [ ] Visit an AMP view only when the affected site and feature support it.

## Verify reporting

- [ ] Confirm the expected views appear in the relevant Stats surface.
- [ ] Confirm page or post attribution is correct.
- [ ] Confirm the selected date range and site timezone explain the displayed data.
- [ ] Confirm an excluded or ignored test visit is not counted when that behavior is under test.
- [ ] Verify empty, loading, and error states in the affected dashboard.

Record the visit time, URL, authentication state, expected count change, actual count change, and sanitized evidence.
