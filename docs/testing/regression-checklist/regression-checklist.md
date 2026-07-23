---
title: "Check global regression coverage"
description: "Verify environments, WordPress versions, hosting, connection, features, and products during regression testing."
audience: "Jetpack testers"
document_type: checklist
sidebar_position: 10
---
Use this checklist to choose representative coverage for a release. Do not run every permutation by default: select the smallest matrix that covers the changed code and its highest-risk dependencies.

Record the build, environment, expected result, actual result, and evidence for every selected check.

## Environments

- [ ] Single site
- [ ] Multisite with subdirectories
- [ ] Multisite with subdomains
- [ ] Fresh installation
- [ ] Existing site upgraded from the previous public Jetpack release

## WordPress and PHP versions

- [ ] Current supported WordPress version
- [ ] Oldest supported WordPress version
- [ ] Current stable PHP version used by Jetpack CI
- [ ] Minimum supported PHP version for the affected project
- [ ] Latest Gutenberg plugin when the change affects editor behavior

Read current tool and compatibility values from [`.github/versions.sh`](https://github.com/Automattic/jetpack/blob/trunk/.github/versions.sh) and the affected project's metadata. Do not copy version numbers from an old test report.

## Hosting and protocol

- [ ] A standard self-hosted test site
- [ ] WordPress.com Atomic or another managed environment when affected
- [ ] WordPress VIP when affected
- [ ] HTTPS
- [ ] HTTP only when the changed behavior explicitly supports or handles it

## Connection

- [ ] In-place connection with free plan
- [ ] In-place connection with paid plan
- [ ] In-place connection with product purchase
- [ ] Non-iframe connection flow when affected
- [ ] Disconnect/reconnect connection
- [ ] Secondary user connection
- [ ] Connection on multisite

## Sync

- [ ] Relevant site changes appear in the WordPress.com Activity Log
- [ ] A temporary connection or network failure recovers without losing later changes

## Features

- [ ] Jetpack Social connects and shares a post
- [ ] Secure Sign On completes and fails safely
- [ ] Stats records representative signed-out visits
- [ ] Site Accelerator serves eligible assets and falls back safely
- [ ] Any affected block or theme feature works in the editor and frontend

## Products

- [ ] Backup completes and a test restore follows the documented workflow
- [ ] Scan reports or clears a known test condition
- [ ] Search returns expected test content

## Dependent products

- [ ] Affected WooCommerce onboarding or analytics flow
- [ ] Affected standalone Jetpack plugin
- [ ] Affected package consumer

## Blocks

Test affected blocks with the supported WordPress editor. Add the latest Gutenberg plugin only when the change or release requires that coverage.

- [ ] Insert and configure the affected block
- [ ] Save, reload, and edit existing content
- [ ] Verify frontend output on desktop and mobile widths
- [ ] Verify validation, permission, and error states
- [ ] Check backwards compatibility with content saved by the previous public release

Use the [focused block suites](../../contributors/testing/test-suites/blocks/index.md) for product-specific checks.
