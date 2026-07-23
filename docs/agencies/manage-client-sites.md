---
title: Manage client sites with Jetpack
description: Create a repeatable monitoring, update, incident, and review workflow for multiple sites.
audience: agencies
document_type: how-to
sidebar_position: 30
---

Managing multiple sites is an operations problem. Standardize what you monitor and what each alert means.

## Define the operating rhythm

| Frequency | Review |
| --- | --- |
| Continuous | Downtime, security, backup, and service alerts |
| Weekly | Failed backups, pending updates, broken critical flows, and unresolved incidents |
| Monthly | Performance trend, license and ownership changes, user access, and client reports |
| Quarterly | Product fit, plugin overlap, restore readiness, and support runbooks |

Use the current [Jetpack Manage documentation](https://jetpack.com/support/jetpack-manage-instructions/) for product-specific controls.

## Triage consistently

Every alert should identify:

- affected client and environment;
- severity and response target;
- first safe diagnostic;
- escalation owner;
- client communication rule;
- rollback or recovery path.

Do not bulk-update production sites without a defined exception path for high-risk or revenue-critical clients.
