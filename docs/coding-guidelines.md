---
title: "Follow coding standards and guidelines"
description: "Apply the language, compatibility, architecture, deprecation, and translation rules used in Jetpack."
audience: "Jetpack contributors"
document_type: reference
sidebar_position: 10
---
Use these repository-wide defaults unless the affected project's `README.md`, `package.json`, `composer.json`, or `AGENTS.md` defines a narrower requirement.

## Language and tools

- **PHP**: Projects follow the repository's supported PHP range by default. Some projects require a newer minimum. Read [`.github/versions.sh`](https://github.com/Automattic/jetpack/blob/trunk/.github/versions.sh) and the affected project's metadata instead of copying a version number into a new guide.
- **PHP standards**: Jetpack follows [WordPress coding standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/), plus repository-specific rules. Configure the tools described in [Development environment](development-environment.md#follow-coding-standards).
- **WordPress**: Read the affected plugin's metadata and compatibility tests for the supported range. A change should fail safely outside that range.
- **JavaScript and TypeScript**: Use the repository Node.js and pnpm versions in [`.github/versions.sh`](https://github.com/Automattic/jetpack/blob/trunk/.github/versions.sh). Prefer existing monorepo packages and configuration.
- **Frontend JavaScript**: Use the shared [Jetpack Webpack configuration](https://github.com/Automattic/jetpack/blob/trunk/projects/js-packages/webpack-config/README.md) when it fits the project. It provides consistent build and browser targets.
- **Other JavaScript stacks**: A project that uses another stack owns its build, internationalization, compatibility, testing, and update path. Do not add a second stack without a clear project-level reason.
- **Linting and unit tests**: Use the root ESLint configuration and the test framework already used by the project. Avoid project overrides that duplicate repository defaults.
- **E2E tests**: The situation is a bit complicated:
  - Use Playwright for standalone end-to-end tests.
  - Tests for WordPress.com Simple and Atomic environments may live in [the Calypso repository](https://github.com/Automattic/wp-calypso).
- **Dependencies**: Prefer a dependency and version already used in the monorepo. When consuming a monorepo `js-package`, expose source through `jetpack:src` in `package.json` exports so repository tools do not require a preparatory build.
- **Browsers**: Follow the current WordPress browser policy through `@wordpress/browserslist-config`.

### Project-specific versions

Projects can narrow these defaults. Before changing code, inspect the nearest `AGENTS.md`, project `README.md`, `package.json`, and `composer.json`.

## Jetpack CLI requirements

The Jetpack CLI uses the repository versions of PHP, Node.js, pnpm, and Composer. Read [`.github/versions.sh`](https://github.com/Automattic/jetpack/blob/trunk/.github/versions.sh) for the current values.

Install:

- [Composer](https://getcomposer.org/) for PHP dependencies.
- [pnpm](https://pnpm.io/) for JavaScript and TypeScript dependencies.

Follow the [Quick start](quick-start.md) to install and verify the complete toolchain.

## General guidelines

- **PHPCS**: The [Jetpack coding-standard rules](https://github.com/Automattic/jetpack-codesniffer#usage) are installed as a monorepo dependency. Run the project's lint command and configure your editor to show violations.
- If coding a module, make sure you declare the module in the inline doc, [like this](https://github.com/Automattic/jetpack/blob/16bc2fce3ace760ff402f656dcf05255888f23f4/modules/sitemaps/sitemaps.php#L92-L101). The same applies for filters or actions, [as shown here](https://github.com/Automattic/jetpack/blob/16bc2fce3ace760ff402f656dcf05255888f23f4/modules/sitemaps/sitemaps.php#L143-L151).
- Sanitize URLs, attributes, everything. WordPress.com VIP has this nice [article about the topic](https://wpvip.com/documentation/vip-go/validating-sanitizing-and-escaping/).
- Add unit tests for behavior that can be isolated. Use the [Jetpack plugin tests](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/jetpack/tests) as repository examples and the [WordPress PHPUnit handbook](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/) for platform guidance.

## Deprecating code

When deprecating code in Jetpack (removing / renaming files, classes, functions, methods), there are a few things to keep in mind:

1. Other plugins and themes may rely on the code. Search the repository, public code through [WPDirectory](https://wpdirectory.net/), and any owning-team tools before removal.
2. Deleting a file used by the previous release can cause fatal errors on sites with aggressive OPcache settings.

For these reasons, here are a few guidelines you can follow:

- Instead of deleting files, mark them as deprecated first with `_deprecated_file`.
- Deprecate classes, [functions](https://developer.wordpress.org/reference/functions/_deprecated_function/), and methods in the same way, while still returning its replacement if there is one.
- Keep deprecated code for the current project-specific compatibility window. Confirm the removal timeline with project maintainers instead of assuming a universal duration.
- If possible, reach out to partners who rely on deprecated code to let them know when the code will be removed, and how they can update.
- If necessary, you can publish an update guide on developer.jetpack.com to help people update.

Example usage for deprecating a function:

<!-- wp:docspress/colorful-code {"language":"php","filename":"includes/example.php","code":"/**\n * This is an example function.\n *\n * @deprecated $$next-version$$ Give an explanation about what function to use instead.\n *\n * @return string\n */\nfunction example_function() {\n\t_deprecated_function( __FUNCTION__, '{plugin/package}-$$next-version$$' );\n\n\treturn 'example';\n}","highlightedLines":"4,9","showLineNumbers":true,"caption":"Use the release placeholder in both the DocBlock and runtime notice; release tooling replaces it with the project version."} /-->

For more information on how to use `$$next-version$$`, see the [package version annotations](https://github.com/Automattic/jetpack/blob/trunk/projects/packages/README.md#package-version-annotations). The same convention applies to plugins.

## Widgets

- Make them support Customizer's Selective Refresh. Here's an [article about it](https://make.wordpress.org/core/2016/03/22/implementing-selective-refresh-support-for-widgets/).
- Some Widgets ported from WordPress.com must only be registered if Jetpack is connected.
- Add the `jetpack_widget_name` filter to the widget title [as shown here](https://github.com/Automattic/jetpack/blob/447766aa676dfc78822d33af4f73535668eba063/modules/widgets/my-community.php#L37).

## Translations

### PHP

- Where it applies, make strings available for translation.
- Instead of `__`, `_e`, `_x` and similar functions, use their safe versions `esc_html__`, `esc_html_e`, `esc_html_x` and others where possible.
- Use an appropriate unique text domain in your plugin or Composer package.
- Make use of our [automattic/jetpack-composer-plugin](https://packagist.org/packages/automattic/jetpack-composer-plugin) and related packages to ensure i18n works in the published plugin.

### JavaScript and TypeScript

- Where it applies, make strings available for translation.
- Use Gutenberg's [@wordpress/i18n](https://www.npmjs.com/package/@wordpress/i18n) package.
- Use an appropriate unique text domain in your JS code.
- Make use of [@automattic/babel-plugin-replace-textdomain](https://www.npmjs.com/package/@automattic/babel-plugin-replace-textdomain) when bundling to ensure i18n works in the published plugin.
- When using TypeScript in Webpack, use `@babel/preset-typescript` rather than `ts-loader`.
  - To generate `.d.ts` files, use `tsgo` with a tsconfig extending `jetpack-js-tools/tsconfig.tsc-declaration-only.json`.

## Decide where code belongs

Start with:

- [Package placement guidance](https://github.com/Automattic/jetpack/blob/trunk/projects/packages/README.md#should-my-code-be-in-a-package)
- the affected project's `AGENTS.md` and `README.md`;
- an existing module or package with the same responsibility;
- project maintainers when ownership is unclear.
