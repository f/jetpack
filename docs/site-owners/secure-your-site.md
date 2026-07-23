---
title: Secure your site with Jetpack
description: Plan a layered Jetpack security setup and verify that alerts and recovery work.
audience: site owners
document_type: how-to
sidebar_position: 30
---

Jetpack can be one layer of WordPress security. It does not replace safe hosting, updates, least-privilege accounts, and a tested recovery plan.

## Build the security baseline

1. Update WordPress, themes, and plugins.
2. Remove software and accounts you no longer use.
3. Require strong authentication for privileged users.
4. Confirm that backups complete and that an authorized person can restore them.
5. Configure the Jetpack security capabilities appropriate for the site.
6. Send alerts to a monitored address or team channel.

## Verify the setup

- Check the most recent successful backup.
- Confirm who can start a restore.
- Confirm where scan and downtime alerts are delivered.
- Review false-positive and escalation procedures.
- Record which security controls come from the host and which come from Jetpack.

Use the current [Jetpack security support documentation](https://jetpack.com/support/security-features/) for product-specific steps.

## If the site may already be compromised

Avoid changing files blindly. Preserve evidence, contact the host or security owner, and follow the current malware-removal guidance. If customer or regulated data may be involved, use the organization's incident-response process.
