---
title: "Use Jetpack Beta testing tools"
description: "Find focused tips for testing Jetpack with the Beta plugin."
audience: "Jetpack testers"
document_type: how-to
sidebar_position: 40
---
The detailed testing tips live with the Beta plugin so the instructions change with the tool.

## Use the canonical guide

Read the [Beta plugin testing tips](https://github.com/Automattic/jetpack/blob/trunk/projects/plugins/beta/docs/testing/testing-tips.md) before testing a branch or pre-release build. The guide covers:

- choosing a public test or staging site;
- using Jetpack Live Branches;
- watching the browser console and network panel;
- collecting a WordPress debug log.

## Keep the test safe

- Do not install beta software on production.
- Do not include secrets or customer data in logs or reports.
- Restore the test site after testing if it was cloned from production.
- Follow [Test a Jetpack beta](beta-testing.md) for the end-to-end workflow.
