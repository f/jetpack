---
title: Jetpack glossary
description: Plain-language definitions for common Jetpack and WordPress terms used throughout these docs.
audience: everyone
document_type: reference
sidebar_position: 30
---

## Akismet Anti-spam

An externally maintained anti-spam product, service, WordPress plugin, API specification, and SDK. Its implementation is not part of the Jetpack monorepo; use the [Akismet product hub](../products/akismet/index.md) to find the owning sources.

## Connection

The relationship between a WordPress site and WordPress.com services used by many Jetpack capabilities. User authorization, site registration, and feature availability are related but not identical states.

## Jetpack

Depending on context, the Jetpack brand, the core Jetpack plugin, or the wider family of Jetpack products and packages. These docs name a specific plugin, package, or product when the distinction matters.

## Jetpack CLI

The repository command-line tool used by contributors to generate, build, test, and maintain projects in the Jetpack monorepo.

## Monorepo

The Git repository that contains multiple Jetpack plugins, packages, JavaScript projects, GitHub Actions, and shared tools.

## Module

A capability historically delivered inside the core Jetpack plugin. Do not assume every Jetpack product or feature is a module.

## Product hub

A stable documentation entry point that separates product operation, supported integrations, source contribution and testing, canonical references, and troubleshooting. Browse the [Jetpack product directory](../products/index.md).

## Protect and Scan

Related but distinct security products. Jetpack Protect covers vulnerability and protection signals, while Jetpack Scan covers malware scanning and remediation workflows. Record which product produced a result before choosing a response.

## Publicize

The historical source and module name still used by parts of Jetpack Social. User-facing documentation calls the current product **Jetpack Social** unless it is identifying a source path or compatibility contract.

## Site owner

The person or organization responsible for a WordPress site, its accounts, data, billing, and operational decisions.

## Staging site

A non-production copy used to test changes. A cloned database may retain production connection data, so environment identity must be checked after cloning.

## WordPress.com account

An account used for WordPress.com and for authorization of Jetpack capabilities that use WordPress.com services. It is separate from a local WordPress site's user account.

## VaultPress Backup

The display name for Jetpack's backup product. These docs use the stable route `products/backup` and the product name VaultPress Backup.
