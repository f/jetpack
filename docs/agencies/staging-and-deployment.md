---
title: Use Jetpack on staging and production
description: Keep Jetpack connection, data, and configuration safe across cloned and deployed client sites.
audience: agencies
document_type: how-to
sidebar_position: 40
---

Cloning a connected WordPress database can make a staging site look like production. Treat environment identity as part of the deployment plan.

<!-- wp:docspress/callout {"tone":"danger","title":"A database clone can copy production identity","content":"<p>Before allowing background jobs or public traffic, confirm the staging URL, Jetpack environment state, outbound email and social behavior, analytics, payments, and the WordPress.com connection.</p>","collapsible":false} /-->

## Before cloning

Record:

- production and staging URLs;
- which Jetpack services send or receive remote data;
- which settings are environment-specific;
- whether the host provides a supported staging workflow;
- who owns the WordPress.com connection.

## After cloning

1. Confirm the site URL and environment type.
2. Prevent test email, social, newsletter, payment, or analytics activity from reaching real users.
3. Confirm that staging does not replace or impersonate the production connection.
4. Purge caches and regenerate environment-specific data where required.
5. Test the deployment and rollback path.

For developer-level connection behavior, read [Work with Jetpack connection and data](../developers/connection-and-data.md).

## Before production deployment

Back up the site, note the previous version, deploy through the normal change process, and run focused smoke tests. Avoid making account, billing, plugin, and DNS changes in one unreviewable step.

<!-- wp:docspress/result {"status":"success","title":"Staging and production remain distinct","content":"<p>Each environment has the intended URL and connection identity, staging cannot contact real users unexpectedly, and the deployment has a tested rollback plus focused post-deploy checks.</p>","meta":"identity · isolation · rollback"} /-->
