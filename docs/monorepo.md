---
title: "Understand the Jetpack monorepo"
description: "Navigate Jetpack projects, generators, builds, tests, mirrors, publishing, and release tooling."
audience: "Jetpack contributors"
document_type: reference
sidebar_position: 10
---
Welcome to the Jetpack Monorepo! This document will give you some idea of the layout, and what is required for your project to fit in with our tooling.

## Table of contents

- [Layout](#layout)
- [Compatibility](#compatibility)
- [First Time](#first-time)
- [Jetpack Generate Wizard](#jetpack-generate-wizard)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Mirror Repositories](#mirror-repositories)
- [Plugin Release Tooling](#plugin-release-tooling)
- [Jetpack Changelogger](#jetpack-changelogger)
	- [Using the Jetpack Changelogger](#using-the-jetpack-changelogger)
- [New Projects](#new-projects)
	- [Creating a new Composer Package](#creating-a-new-composer-package)
	- [Creating a new plugin](#creating-a-new-plugin)

## Layout

Projects are divided into WordPress plugins, Composer packages, JS packages, and GitHub Actions.

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"AGENTS.md\n.github/\n  actions/\n  files/\n  matchers/\n  versions.sh\ndocs/\nprojects/\n  github-actions/\n  js-packages/\n  packages/\n  plugins/\ntools/\n  cli/\n  docker/\n    wordpress/\n      wp-content/\n        plugins/","caption":"Projects own product code; tools and CI support the complete repository; docs explain shared contributor workflows."} /-->

| Project type | Location | Naming convention |
| --- | --- | --- |
| WordPress plugin | `projects/plugins/<slug>/` | Usually the plugin slug without a leading `jetpack-` |
| Composer package | `projects/packages/<slug>/` | Usually the package name without `automattic/jetpack-` |
| JavaScript package | `projects/js-packages/<slug>/` | Usually the npm package name without `@automattic/` |
| GitHub Action | `projects/github-actions/<slug>/` | Usually the action name without `Automattic/action-` |

Repository-wide tooling lives in `tools/`; shared documentation lives in `docs/`; CI workflows and reusable action support live in `.github/`. An entry under `.github/actions/` must contain an `action.yml`; matchers belong in `.github/matchers/`, and other workflow support files belong in `.github/files/`.

## Compatibility

Projects follow the repository defaults in `.github/versions.sh` unless their own metadata declares a narrower supported range. Read the affected `composer.json`, `package.json`, tests, and nearest `AGENTS.md` before choosing syntax or dependencies.

## First Time

First time working with the monorepo? We got you covered.

For the first time only:

<!-- wp:docspress/code-tabs {"tabs":[{"label":"Link the CLI","language":"bash","filename":"Terminal","code":"pnpm install\npnpm jetpack cli link"},{"label":"Repository-local CLI only","language":"bash","filename":"Terminal","code":"pnpm install\npnpm jetpack --help"}],"showLineNumbers":false,"caption":"Link the command for use throughout the checkout, or keep it local and invoke it through pnpm."} /-->

Once you’ve done that, it’s easy: run `jetpack` (or `pnpm jetpack`) while anywhere in the Jetpack repo. To explore on your own, run `jetpack --help` to see the available commands.

## Jetpack Generate Wizard

Starting a new project? Great! Let the Jetpack Generate Wizard help jumpstart the files you need. To get started:

1. Check out the branch that should contain the new project.
2. Start the generator from the monorepo.
3. Choose the project type, name, and requested options.
4. Review every generated file before adding product behavior.

<!-- wp:docspress/terminal-session {"title":"Start the project generator","shell":"bash","prompt":"$","command":"jetpack generate","output":""} /-->

### Accepted Arguments

The wizard accepts a few arguments to speed things up:

* `[project type]` - Accepted values: `package`, `js-package`, `plugin`, `github-action`
* `--name`, `--n` - The name of your project (no spaces)

<!-- wp:docspress/terminal-session {"title":"Generate a named plugin non-interactively","shell":"bash","prompt":"$","command":"jetpack generate plugin --name my_cool_plugin","output":""} /-->

The command creates the project under `projects/plugins/my_cool_plugin/`.

### What's Included

The exact output evolves with the generator. A generated project starts from the shared metadata and adds type-specific files:

<!-- wp:docspress/file-tree {"root":"projects/[type]/[project]/","tree":".gitattributes\n.gitignore\ncomposer.json\nlicense.txt\npackage.json\nreadme.md\nbootstrap.php\nphpunit.[version].xml.dist\nreadme.txt\n[plugin-slug].php\naction.yml","caption":"Not every project receives every file: packages add PHP and test scaffolding, plugins add WordPress metadata and an entry file, and GitHub Actions add action.yml."} /-->

### Next Steps

* The wizard should auto-generate common information
* Check things over to make sure it looks correct
* If your project requires a build step, add steps to `composer.json` and `package.json`
* Create a mirror repo if necessary. See [Mirror repositories](#mirror-repositories).

## Project structure

We use `composer.json` to hold metadata about projects. Much of our generic tooling reads this metadata to customize handling of the project. Metadata keys used are:

* `.name`: Generally "Automattic/jetpack-_something_". Used to report names in various places. For Composer packages, this must, of course, match the name on Packagist.
* `.version`: If present, updated by `tools/project-version.sh`. This should not be included on Composer packages that will be served through Packagist.
* `.repositories`: If you include a repository entry referencing monorepo packages, it must have `.options.monorepo` set to true. This allows the build tooling to recognize and remove it.
* `.scripts.build-development`: If your project has a general build step, this must run the necessary commands. See [Building](#building) for details.
* `.scripts.build-production`: If your project requires a production-specific build step, this must run the necessary commands. See [Building](#building) for details.
* `.scripts.watch`: If your project supports watch mode for development, this should run the necessary commands to watch for file changes and rebuild automatically.
* `.scripts.watch-hot`: If your project supports HMR (Hot Module Replacement), this should run the necessary commands to enable hot reloading during development. Used by `jetpack watch --hot`.
* `.scripts.test-php-coverage`: If the package contains any PHPUnit tests, this must run the necessary commands to generate a PHP coverage report. See [Code coverage](#code-coverage) for details.
  * `.scripts.skip-test-php-coverage`: Run before `.scripts.test-php-coverage` in CI. If it exits with code 3, the test run will be skipped.
* `.scripts.test-js-coverage`: If the package contains any JavaScript tests, this must run the necessary commands to generate a JS coverage report. See [Code coverage](#code-coverage) for details.
  * `.scripts.skip-test-js-coverage`: Run before `.scripts.test-js-coverage` in CI. If it exits with code 3, the test run will be skipped.
* `.scripts.test-js`: If the package contains any JavaScript tests, this must run the necessary commands. See [JavaScript tests](#javascript-tests) for details.
  * `.scripts.skip-test-js`: Run before `.scripts.test-js` in CI. If it exits with code 3, the test run will be skipped.
* `.scripts.test-php`: If the package contains any PHPUnit tests, this must run the necessary commands. See [PHP tests](#php-tests) for details.
  * `.scripts.skip-test-php`: Run before `.scripts.test-php` in CI. If it exits with code 3, the test run will be skipped.
* `.extra.autorelease`: Set truthy to enable automatic creation of a GitHub release for tagged versions. See [Mirror repositories > Auto-release](#auto-release) for details.
* `.extra.autotagger`: Set truthy to enable automatic release-version tagging in the mirror repo. See [Mirror repositories > Autotagger](#autotagger) for details.
* `.extra.changelogger`: Configuration object for [Changelogger](#jetpack-changelogger). See [its documentation](https://github.com/Automattic/jetpack-changelogger#configuration) for details.
* `.extra.changelogger-default-type`: Certain of our tools automatically create Changelogger change entries. This is the value to use for `--type` when doing so. Default type is `changed`.
* `.extra.dependencies.build`: This optional array specifies the "slugs" of any within-monorepo build dependencies that can't otherwise be inferred. The "slug" consists of the two levels of directory under `projects/`, e.g. `plugins/jetpack` or `packages/changelogger`.
* `.extra.dependencies.test`: This optional array specifies the "slugs" of any within-monorepo testing dependencies that can't otherwise be inferred. The "slug" consists of the two levels of directory under `projects/`, e.g. `plugins/jetpack` or `packages/changelogger`. See [Testing](#testing) for details.
* `.extra.dependencies.test-only`: This optional array specifies the "slugs" of any within-monorepo dependencies that are only used for testing and/or static analysis and should be ignored otherwise when analyzing intra-monorepo dependencies.
* `.extra.dev-releases`: Indicate that the plugin will have developer alpha releases. Instead of the mirror repositories showing "VER-alpha", they'll start at "VER-a.0" and you can use the `-a` flag to the release tooling to release "VER-a.1".
* `.extra.mirror-repo`: This specifies the name of the GitHub mirror repo, i.e. the "Automattic/jetpack-_something_" in "<span>https://</span>github.com/Automattic/jetpack-_something_".
* `.extra.npmjs-autopublish`: Set truthy to enable automatic publishing of tagged versions to npmjs.com. See [Mirror repositories > Npmjs Auto-publisher](#npmjs-auto-publisher) for details.
* `.extra.release-branch-prefix`: Our mirroring and release tooling considers any branch named like "_prefix_/branch-_version_" to be a release branch, and this specifies which _prefix_ belongs to the project.
  * This may also be an array of multiple prefixes. In that case the first element in the array should be a prefix used only by this plugin, with any additional prefixes shared by multiple plugins coming after.
* `.extra.version-constants`: When `tools/project-version.sh` is checking or updating versions, this specifies PHP constants to check or update. The value is an object matching constants to the file, relative to the package root. Definitions must remain on one line; global constants use single-quoted values, while class-constant keys are prefixed with `::`.

<!-- wp:docspress/code-tabs {"tabs":[{"label":"Global constant","language":"php","filename":"plugin.php","code":"define( 'CONSTANT', 'version' );"},{"label":"Class constant","language":"php","filename":"src/class-example.php","code":"const CONSTANT = 'version';"}],"showLineNumbers":true,"caption":"The project-version script recognizes these single-line shapes when updating versions."} /-->
* `.extra.wp-plugin-slug`: This specifies the WordPress.org plugin slug, for use by scripts that deploy the plugin to WordPress.org.
  * `.extra.beta-plugin-slug`: This specifies the plugin slug for the Jetpack Beta Tester plugin, for cases where a plugin has not been published to WordPress.org but should still be offered by that plugin.
* `.extra.wp-svn-autopublish`: Set truthy to enable automatic publishing of tagged versions to WordPress.org. See [Mirror repositories > WordPress.org SVN Auto-publisher](#wordpressorg-svn-auto-publisher) for details.

There are a few things in `package.json` as well:
* `.scripts.typecheck`: If the package contains TypeScript code, this should run tsgo to check types without building. See [TypeScript type checking](#typescript-type-checking) for details.

Our mirroring tooling also uses `.gitattributes` to specify built files to include in the mirror and unnecessary files to exclude.

## Building

The Jetpack Monorepo includes GitHub actions to build all projects, and optionally to mirror them to [mirror repos](#mirror-repositories). The `jetpack build` command can be used to build locally.

A project must define `.scripts.build-development` and/or `.scripts.build-production` in `composer.json` to specify the commands needed to build.
The build commands should assume that `pnpm install` and `composer install` have already been run, and _must not_ run them again.

* If you're building JavaScript bundles with [@automattic/jetpack-webpack-config](https://github.com/Automattic/jetpack/blob/trunk/projects/js-packages/webpack-config/README.md), note that your production build command should set `NODE_ENV=production` and `BABEL_ENV=production`.
* If you run into problems with Composer not recognizing the local git branch as being the right version, try setting `COMPOSER_ROOT_VERSION=dev-trunk` in the environment.
* When building for the mirror repos, note that `COMPOSER_MIRROR_PATH_REPOS=1` will be set in the environment and the list of repositories in `composer.json` may be altered.
  This is not normally done in development environments, even with `jetpack build --production`.
* For a production build of a plugin, `composer install` is passed `-o --no-dev --classmap-authoritative --prefer-dist`. For development builds and for production builds of non-plugin projects, no options are passed.
  If you think you need something else, talk to us. Don't just have your build scripts run composer.
  <!-- YAGNI: I doubt we'll need it, so I didn't implement `.scripts.install-development` / `.scripts.install-production` or the like. -->

## Testing

The Jetpack Monorepo includes GitHub actions to run a number of CI checks on all projects.

Tests for a project are only run for a PR if changes are made to the project or its dependencies. Dependencies may be specified as:

* For Composer packages included in the monorepo, via `.require` and `.require-dev` in `composer.json`.
* For JavaScript packages included in the monorepo, via `.dependencies` and `.devDependencies` in `package.json`.
* For any other dependencies, via `.extra.dependencies.test` in `composer.json`.

The test environment will be set up with appropriate tools, including node, pnpm, php, phpdbg, and composer. Unless otherwise specified below, the versions of node and php will be those specified in `.github/versions.sh`. Other necessary tools may be pulled in via composer and pnpm.

All test commands must return a shell failure status when tests fail and a success status if tests pass or are skipped; usually your testing framework will already do this for you, but if you write custom shell scripts you'll need to make sure any failure is propagated.

If your project has multiple logical groups of tests, feel free to make use of GitHub Actions [grouping commands](https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions#grouping-log-lines).

The following environment variables are available for all tests:

- `ARTIFACTS_DIR`: If your tests generate any artifacts that might be useful for debugging, you may place them in the directory specified by this variable and they will be uploaded to GitHub after the test run. There's no need to be concerned about collisions with other projects' artifacts, a separate directory is used per project.
- `MONOREPO_BASE`: Path to the monorepo. Useful if you're using things in `tools/` from plugin tests.
- `WORDPRESS_DIR`: Path to a copy of WordPress. Other than plugin tests, though, you should probably avoid using this.
- `WORDPRESS_DEVELOP_DIR`: Path to a checkout of wordpress-develop. Other than plugin tests, though, you should probably avoid using this.
- `NODE_VERSION`: The version of Node in use, as specified in `.github/versions.sh`.
- `PHP_VERSION`: The version of PHP in use. Unless otherwise specified below, it will be the same as in `.github/versions.sh`.
- `TEST_SCRIPT`: The test script being run.

### Linting

We use ESLint and PHPCS to lint JavaScript and PHP code. Projects should comply with the [coding standards](development-environment.md#follow-coding-standards) enforced by these tools.

* Projects may include `eslint.config.mjs` to adjust eslint configuration as necessary, but try to keep to the spirit of it. Configurations should generally start with `...makeBaseConfig( import.meta.url )` (imported from `jetpack-js-tools/eslintrc/base.mjs`) with any appropriate options, and override from there.
* We're using a fork of phpcs and a custom filter that adds support for per-directory configuration (`.phpcs.dir.xml`) and use of `.gitignore` and `.phpcsignore` files. Again, try to keep to the spirit of things.

### Static Analysis

We use Phan for PHP static analysis.[^1] Configuration for a project resides in the `.phan/config.php` within the project, which should generally build on top of the `.phan/config.base.php` from the monorepo root. A baseline file may also reside at `.phan/baseline.php` to allow for incremental fixing of errors.

Phan in the monorepo should be run locally via [Jetpack's CLI tool](#first-time) as `jetpack phan`. Note that Phan soft-requires the [PHP ast extension](https://pecl.php.net/package/ast).

<details><summary>Installing the PHP ast extension on Linux</summary>

On most Linux distributions, you can install the PHP ast extension using your package manager:

- For Ubuntu/Debian-based systems:

  <!-- wp:docspress/terminal-session {"title":"Install the AST extension on Ubuntu or Debian","shell":"bash","prompt":"$","command":"sudo apt-get install php8.4-ast","output":""} /-->
- For Arch Linux:
  Install the AUR package "php-ast" from https://aur.archlinux.org/packages/php-ast

For other Linux distributions, consult your package manager's documentation or consider compiling from source.

</details>

Mac users have reported having trouble installing the PHP ast extension. See the dropdown below for Mac-specific instructions.

<details><summary>Installing the PHP ast extension on Mac</summary>

This assumes you have PHP installed via Homebrew, e.g. you've done `brew install php@8.4`.

1. First, check whether ast is already installed. If it reports enabled support, you should already be good unless [Phan requires a newer extension version](https://github.com/phan/phan#getting-started):

   <!-- wp:docspress/terminal-session {"title":"Inspect the installed AST extension","shell":"bash","prompt":"$","command":"php --ri ast","output":"ast\n\nast support => enabled\nextension version => [installed-version]\nAST version => [supported-versions]"} /-->
2. You may need to `brew install pkg-config zlib` to install some necessary dependencies.
3. Update the list of available extensions: `pecl channel-update pecl.php.net`
4. Build the extension: `pecl install ast`
   - If the build process fails due to mkdir errors with the pecl directory, you might try `mkdir -p /opt/homebrew/lib/php/pecl` and running the install again.
5. You may also need to tell PHP where to find the newly-installed extension.
   1. Run `pecl config-get ext_dir` to find where pecl installs extensions.
   2. Run `php -r 'echo ini_get( "extension_dir" ) . "\n";'` to find where PHP currently expects extensions to live.
   3. If those are the same, great! If not, you have two options:
      * If PHP's current directory is empty, you could find your `php.ini` file (`php --ini`) and change `extension_dir` to pecl's location.
      * Or else, pecl probably added `extension=ast.so` to an ini file somewhere. You could change the `ast.so` value to be the full path inside pecl's directory.

</details>

If you cannot install the AST extension, run Phan with `--allow-polyfill-parser` or use the [Docker development environment](https://github.com/Automattic/jetpack/blob/trunk/tools/docker/README.md). The polyfill parser may report false positives and cannot update baseline files.

[^1]: In 2024 the project evaluated Phan, Psalm, and PHPStan. Phan produced the most workable repository baseline at that time. Re-evaluate the owning project's current configuration before proposing a tool change.

### PHP tests

If a project contains PHP tests (typically PHPUnit), it must define `.scripts.test-php` in `composer.json` to run the tests. The CI environment will run `pnpm install` and `composer install` beforehand, but if a build step is required before running tests the necessary commands for that should also be included in `.scripts.test-php`.

A MySQL database is available if needed; credentials may be found in `~/.my.cnf`. Note that the host must be specified as `127.0.0.1`, as when passed `localhost` PHP will try to connect via a Unix domain socket which is not available in the Actions environment.

Tests run against the PHP matrix defined by the current workflows and `.github/versions.sh`. If a test only needs one matrix entry, select that entry from repository configuration instead of copying a version into the project.

#### PHP tests for non-plugins

For all project types other than WordPress plugins, the necessary version of PHPUnit and/or any other tools should be pulled in via Composer.

We currently make use of the following packages in testing; it's encouraged to use these rather than introducing other tools that serve the same purpose.

* [yoast/phpunit-polyfills](https://packagist.org/packages/yoast/phpunit-polyfills) supplies polyfills for compatibility with PHPUnit 8.5 to 12.4, to support PHP 7.2 to 8.5.
* [automattic/phpunit-select-config](https://packagist.org/packages/automattic/phpunit-select-config) allows for selecting a configuration file based on the version of PHPUnit in use, since configs are often not compatible across major versions since PHPUnit 9.
* PHPUnit's built-in mocking is used for class mocks.
* [brain/monkey](https://packagist.org/packages/brain/monkey) is used for mocking functions, and can also provide some functions for minimal WordPress compatibility.
* [automattic/jetpack-test-environment](https://github.com/Automattic/jetpack/blob/trunk/projects/packages/test-environment/README.md) provides WordPress for testing.
  * If using both Brain Monkey and the Jetpack Test Environment, note the following requirements:
    * You must `require_once __DIR__ . '/../../vendor/antecedent/patchwork/Patchwork.php';` in `bootstrap.php` before the Jetpack Test Environment's setup, so Brain Monkey can mock WordPress functions.
    * Follow Brain Monkey's [functions-setup.md](https://github.com/Brain-WP/BrainMonkey/blob/master/docs/functions-testing-tools/functions-setup.md) instead of [wordpress-setup.md](https://github.com/Brain-WP/BrainMonkey/blob/master/docs/wordpress-specific-tools/wordpress-setup.md); don't call `Monkey\setUp()` or try to use its WordPress-specific tools.
	* To initiate the Jetpack Test Environment, call `\Automattic\Jetpack\Test_Environment\Bootstrap::init();` in `bootstrap.php`.
	* See the [Jetpack Test Environment README](https://github.com/Automattic/jetpack/blob/trunk/projects/packages/test-environment/README.md) for details.

#### PHP tests for plugins

WordPress plugins may want to run within WordPress. All monorepo plugins are copied into place in a WordPress installation. Environment variable `WORDPRESS_DIR` points to this installation, and `WORDPRESS_DEVELOP_DIR` points a directory with WordPress's `tests/phpunit/`.

Tests will be run against the latest version of WordPress using the variety of supported PHP versions, and against the previous and trunk versions of WordPress using the PHP version in `.github/versions.sh`. The environment variable `WP_BRANCH` will be set to 'latest', 'previous', or 'trunk' accordingly. If you have tests that only need to be run once, run them when `WP_BRANCH` is 'latest'.

When implementing tests within a new plugin, follow the [example test bootstrap](https://github.com/Automattic/jetpack/blob/trunk/docs/examples/bootstrap.php).

### JavaScript tests

If a project contains JavaScript tests, it must define `.scripts.test-js` in `composer.json` to run the tests. The CI environment will run `pnpm install` beforehand, but if `composer install` or a build step is required before running tests the necessary commands for that should also be included in `.scripts.test-js`.

JavaScript tests should use `jest`, not `mocha`/`chai`/`sinon`. For React testing, use `@testing-library/react` rather than `enzyme`.

JavaScript tests may alternatively use `node --test`, along with `c8` for coverage.

### TypeScript type checking

If a project contains TypeScript code, it should define `.scripts.typecheck` in `package.json` to run `tsgo` in a manner that will check types without building. The CI environment will run `pnpm install` beforehand, but if `composer install` or a build step is required before running tests the necessary commands for that should also be included in `.scripts.typecheck`.

Note the ideal configuration for a TypeScript project using `tsgo` to build will have two tsconfig files:
* `tsconfig.json` will be used for linting and type checking all code in the project. It will set `include` to reference all TS files and TS-containing subdirs
* `tsconfig.build.json` will be used for the build (by passing `--project tsconfig.build.json` to `tsgo`). This will extend `tsconfig.json` to override `include` to specify only the entry point files.

### Code coverage

If a project contains PHP or JavaScript tests, it should define `.scripts.test-php-coverage` and/or `.scripts.test-js-coverage` in `composer.json` to run the tests in a mode that generates code coverage output. The CI environment runs `pnpm install` and `composer install` beforehand, but if a build step is required before running tests the necessary commands for that should also be included in the relevant script.

Output should be written to the path specified via the `COVERAGE_DIR` environment variable. Subdirectories of that path may be used as desired.

For PHP tests, you'll probably run PHPUnit as `php -dpcov.directory=. ./vendor/bin/phpunit-select-config phpunit.#.xml.dist --coverage-php "$COVERAGE_DIR/php.cov"`. If you have multiple runs (e.g. unit and integration), be sure to write the `php.cov` files to separate subdirectories of `$COVERAGE_DIR`.

For JS tests, you'll probably have a `test` script in package.json that runs `jest` with any needed options, and then a `test-js-coverage` script that does `pnpm run test --coverage`. If you have multiple runs (e.g. unit and integration), be sure each run writes to a different subdirectory of `$COVERAGE_DIR`.

For JS tests using `node --test`, your `test-js-coverage` will likely look like `c8 --report-dir="$COVERAGE_DIR" --temp-directory="$ARTIFACTS_DIR/v8" pnpm run test`, along with a `.c8rc.json` like the following.

<details><summary>Sample `.c8rc.json`</summary>

<!-- wp:docspress/colorful-code {"language":"json","filename":".c8rc.json","code":"{\n\t\"reporter\": [ \"json\" ],\n\t\"all\": true,\n\t\"include\": [ \"src\", \"index.js\" ]\n}","highlightedLines":"2-4","showLineNumbers":true,"caption":"Write Istanbul-compatible JSON coverage for the repository aggregation step."} /-->

</details>

If you're using any other JS test runner for some reason, you'll want to have the `test-js-coverage` command write reports to `$COVERAGE_DIR/**.json` in a format compatible with Istanbul's `json` reporter, in whatever manner that can be accomplished with your chosen test runner.

There's no need to be concerned about collisions with other projects' coverage files, as a separate directory is used per project. The coverage files are also automatically copied to `ARTIFACTS_DIR`.

If you want to generate coverage locally, this can be done with `jetpack test php-coverage` or `jetpack test js-coverage`. Note that generating PHP coverage requires the [pcov](https://pecl.php.net/package/pcov) or [xdebug](https://pecl.php.net/package/xdebug) extensions. We use `pcov` for the CI runs; results from `xdebug` may be slightly different.

<details><summary>Installing the PHP pcov extension on Linux</summary>

On most Linux distributions, you can install the PHP pcov extension using your package manager:

- For Ubuntu/Debian-based systems:

  <!-- wp:docspress/terminal-session {"title":"Install pcov on Ubuntu or Debian","shell":"bash","prompt":"$","command":"sudo apt-get install php8.4-pcov","output":""} /-->
- For Arch Linux:
  Install the AUR package "php-pcov" from https://aur.archlinux.org/packages/php-pcov

For other Linux distributions, consult your package manager's documentation or consider compiling from source.

</details>

Mac users have reported having trouble installing the PHP pcov extension. See the dropdown below for Mac-specific instructions.

<details><summary>Installing the PHP pcov extension on Mac</summary>

This assumes you have PHP installed via Homebrew, e.g. you've done `brew install php@8.4`.

1. First, check whether pcov is already installed. Continue when the command reports enabled support:

   <!-- wp:docspress/terminal-session {"title":"Inspect the installed pcov extension","shell":"bash","prompt":"$","command":"php --ri pcov","output":"pcov\n\nPCOV support => Enabled\nPCOV version => [installed-version]\npcov.directory => [configured-path]"} /-->
2. You may need to `brew install pkg-config zlib` to install some necessary dependencies.
3. Update the list of available extensions: `pecl channel-update pecl.php.net`
4. Build the extension: `pecl install pcov`
   - If the build process fails due to mkdir errors with the pecl directory, you might try `mkdir -p /opt/homebrew/lib/php/pecl` and running the install again.
5. You may also need to tell PHP where to find the newly-installed extension.
   1. Run `pecl config-get ext_dir` to find where pecl installs extensions.
   2. Run `php -r 'echo ini_get( "extension_dir" ) . "\n";'` to find where PHP currently expects extensions to live.
   3. If those are the same, great! If not, you have two options:
      * If PHP's current directory is empty, you could find your `php.ini` file (`php --ini`) and change `extension_dir` to pecl's location.
      * Or else, pecl probably added `extension=pcov.so` to an ini file somewhere. You could change the `pcov.so` value to be the full path inside pecl's directory.

</details>

## Mirror repositories

Most projects in the monorepo should have a mirror repository holding a built version of the project, ready for deployment. Follow these steps to create the mirror repo and configure the monorepo tooling to push to it.

1. Create the mirror repo on GitHub. It will most likely be named like "<span>https://</span>github.com/Automattic/jetpack-_something_".
	1. Set the repo description:
		* Begin with `[READ ONLY]`.
		* Include a description of the project.
		* End with `This repository is a mirror; for issue tracking and development head here: https://github.com/automattic/jetpack`.
	2. In the repo settings, turn off wikis, PRs, issues, projects, discussions, and so on.
	3. If the mirror repo is not under the Automattic organization, make sure that [matticbot](https://github.com/matticbot) can push to the repo.
	4. Configure Actions settings:
		* Set "Allow all actions and reusable workflows", click "Save" button. The build process may copy workflows from `.github/files/mirror-.github` and `.github/files/gh-*` into the mirror.
		* Set "Approval for running fork pull request workflows from contributors" to "Require approval for all external contributors", click "Save" button.
		* Set "Workflow permissions" to "Read repository contents and packages permissions".
		* Disable "Allow GitHub Actions to create and approve pull requests", as PRs are created in the monorepo, click "Save" button.
		* Double check all the setting above. If you only clicked save once, the options might not have been saved correctly.
	5. If needed, ask a repository maintainer to configure secrets for [Autotagger](#autotagger) and the [WordPress.org SVN auto-publisher](#wordpressorg-svn-auto-publisher). Do not copy credentials into an issue or pull request.
	6. The default branch should be `trunk`, matching the monorepo. Note that you can't set the default branch until at least one branch is created in the repo.
2. If this is a PHP package that will be published on Packagist, do the following:
	* Copy the new package's `composer.json` from the PR that introduced it into the new repo and commit/push it to `trunk`.
	* Create the package in Packagist.
	* Be sure that `automattic` is added as a maintainer.
	* Configure a GitHub webhook to allow for auto-updates (see [Packagist docs](https://packagist.org/about#how-to-update-packages)).
3. If your project requires building, configure `.scripts.build-production` in your project's `composer.json` to run the necessary commands.
4. If there are any files included in the monorepo that should not be included in the mirror, use `.gitattributes` to tag them with "production-exclude".
5. If there are any built files in `.gitignore` that should be included in the mirror, use `.gitattributes` to tag them with "production-include".
6. Set `.extra.mirror-repo` in your project's `composer.json` to the name of the repo.
   * When you push the PR making this change to `composer.json`, pay attention to the Build workflow. Download the "jetpack-build" artifact and make sure it contains your project, and that there are no extra or missing files.

### Autotagger

If `.extra.autotagger` is set to a truthy value in the project's `composer.json`, a GitHub Action will be included in the mirror repo that will read the most recent version from the mirrored `CHANGELOG.md` in each push to trunk, and create the tag if that version has no prerelease or build suffix.

If `.extra.autotagger` is set to an object with a truthy value for `major` (i.e. if `.extra.autotagger.major` is truthy), the GitHub Action will additionally create or update a major-version tag as is common for GitHub Action repositories.

If `.extra.autotagger` is set to an object with falsey value for `v` (i.e. if `.extra.autotagger.v` is set and falsey), the tag will not be prefixed with "v".

This workflow requires an `API_TOKEN_GITHUB` secret in the mirror repository. A repository administrator must create and scope it through the current internal secret-management process.

This works with [Changelogger](#jetpack-changelogger): while change files are present, an `-alpha` version entry prevents autotagging. Maintainers should follow the affected plugin's current release runbook before publishing a new version.

### Auto-release

If `.extra.autorelease` is set to a truthy value in the project's `composer.json`, a GitHub Action will be included in the mirror repo that will automatically create a GitHub release when a version tag is created. This works with Autotagger. Versions are recognized with and without a "v" prefix and with 2 to 4 components.

The body of the created release will be the entry from CHANGELOG.md for the tagged version. A zip file will be added to the release as an artifact. The zip file contains a single directory, which holds the output from `git archive`.

If `.extra.autorelease` is set to an object, the following are recognized:

* `.extra.autorelease.slug`: Base name for the zip file, and the name of the base directory inside. If this is omitted, `.extra.wp-plugin-slug` or `.extra.beta-plugin-slug` will be used. If that is also not set, the portion of `.name` after the `/` will be used.
* `.extra.autorelease.titlefmt`: Format for the release title. Must contain a single `%s`, which will be replaced with the version tagged. If omitted, the release title will simply be the version number.

Note the following will also be done by the build process:

* An entry will be prepended to `.gitattributes`, setting export-ignore for `/.git*`. The file will be created if necessary. This prevents `.github` and other git files from being included in the zip.

### Npmjs Auto-publisher

If `.extra.npmjs-autopublish` is set to a truthy value in the project's `composer.json`, a GitHub Action will be included in the mirror repo that will run `npm publish` when a version tag is created. This works with Autotagger. Versions must have a "v" prefix and have 3 components.

You'll also need to [configure the repo as a Trusted Provider](https://docs.npmjs.com/trusted-publishers) at npmjs.com. NOTE: If the package doesn't exist on npmjs.com yet, it seems (as of June 2026) that you first have to manually `npm publish` a (non-trusted) version in order to be able to configure trusted publising; see https://github.com/npm/documentation/issues/1926 for possible updates. This initial version may be a v0.0.0 that contains only `package.json` metadata.

<details><summary>Example process for setting up a new package</summary>

1. Tag the first release of your package. Find that it didn't get published to npmjs.com, with an error like this from the Npmjs Auto-publisher workflow run:
   <!-- wp:docspress/terminal-session {"title":"Recognize a missing npm package","shell":"bash","prompt":"$","command":"npm publish --access public","output":"npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access\nnpm error code E404\nnpm error 404 Not Found - PUT https://registry.npmjs.org/@automattic%2fjetpack-whatever - Not found\nnpm error 404 The package does not exist yet or this account cannot publish it."} /-->
2. Locally, create an empty directory.
3. Copy the package's `package.json` into that empty directory.
   * Delete any `scripts`, `dependencies`, and so on, just keep the metadata.
   * Change the version to "0.0.0".
4. `npm login --scope @automattic` if necessary (or whichever scope the package will be published into).
5. `npm publish --access public` to publish the dummy version.
6. May as well set up trusted publishing from the command line: `npm trust github @automattic/jetpack-whatever --repository Automattic/jetpack-whatever --file npmjs-autopublisher.yml --allow-publish`
7. Re-run the failed Npmjs Auto-publisher workflow run to publish the real version.
8. Optionally, `npm unpublish` to unpublish that dummy "0.0.0" version.

</details>

Note the following will also be done by the build process:

* Entries will be prepended to `.npmignore` to ignore `.github` and `composer.json` during the NPM publish. This file will be created if not present.

Before you create the first release tag, you may want to check out the mirror and run `npm publish --dry-run` to ensure that only the files you want published will be published.
If additional files need to be excluded, create an `.npmignore`.

### WordPress.org SVN Auto-publisher

If `.extra.wp-svn-autopublish` is set to a truthy value in the project's `composer.json`, a GitHub Action will be included in the mirror repo that will automatically publish tags to WordPress.org's SVN when a version tag is created. This works with Autotagger. Versions are recognized with and without a "v" prefix, with 2 to 4 components, and with an optional prerelease suffix.

This workflow requires `WPSVN_USERNAME` and `WPSVN_PASSWORD` secrets in the mirror repository. A repository administrator must configure them through the current internal secret-management process.
Also note that `.extra.wp-plugin-slug` must be set in the project's `composer.json` or the action will fail.

The action will update the plugin's trunk to the tagged source and will create a tag in SVN for the tagged version. If the tagged version does not have a prerelease component, the "Stable tag" field in the tag's readme.txt will be updated too. The "Stable tag" in trunk will not be updated; this must be done manually.

## Plugin release tooling

If you have set `.extra.mirror-repo`, `.extra.release-branch-prefix`, and `.extra.wp-plugin-slug` in your plugin's `composer.json`, we have tooling to make releasing to WordPress.org easier.

* `tools/create-release-branch.sh` will help you create the correctly named release branch, and will automatically update version numbers and versions of monorepo packages for you. The GitHub Action will then mirror this branch to your plugin's mirror repo.
* `tools/deploy-to-svn.sh` will prepare a temporary directory with the content of the mirror repo branch that is ready to be pushed to WordPress.org SVN.
* `tools/revert-release.sh` will prepare a temporary directory that updates the "Stable version" tag in `readme.txt` to the previous version, in case an emergency rollback is required.

## Jetpack Changelogger

The [Jetpack Changelogger](https://packagist.org/packages/automattic/jetpack-changelogger) tool helps in managing a changelog for a project by having each PR drop a specially-formatted "change file" into a changelog directory, which the tool can then process for a release.

As implemented by the Jetpack Monorepo, any PR that touches the Jetpack plugin itself, or anything else in the `/projects` directory will need to add a specially-formatted file to the project's specified `changelog` directory; there is a [command](#using-the-jetpack-changelogger) mentioned below that can help create the change file.

**What does the change file look like?** It’s a text file with a header-and-body format, like HTTP or email. A change file might look like this:

<!-- wp:docspress/colorful-code {"language":"plaintext","filename":"projects/[type]/[project]/changelog/[change-file]","code":"Significance: patch\nType: compat\n\nBlock Editor: update all blocks to be fully compatible with the supported WordPress range.","highlightedLines":"1-2,4","showLineNumbers":true,"caption":"Headers drive release grouping; the body describes the user-visible outcome."} /-->

The “Significance” header specifies the significance of change in the style of [semantic versioning](https://semver.org/): patch, minor, or major.

The “Type” header categorizes the change in the changelog. In Jetpack, for example, our changelog divides changes into “Major Enhancements”, “Enhancements”, “Improved compatibility”, and “Bugfixes”.

The body is separated from the headers by a blank line, and is the text that actually goes into the changelog. This should follow our recommendations for [writing a good changelog entry](./writing-a-good-changelog-entry.md). Feel free to (sparingly) use Markdown in the body text.

### Using the Jetpack Changelogger

The changelogger tool can be used via [Jetpack's CLI tool](#first-time). You may use the following command to generate changelog entries for each project that needs one:

<!-- wp:docspress/terminal-session {"title":"Create a project changelog entry","shell":"bash","prompt":"$","command":"jetpack changelog add","output":""} /-->

**Does it matter what the change file is named?** Starting the file name with `.` should not be used. Also consider avoiding names that have extensions like `.php` or `.js` to avoid confusing other tools.

**What if a change is so trivial that it doesn’t need a changelog entry?** The change file is still required. If you specify the significance as “patch”, changelogger will allow the body section to be empty so as to not generate an entry in the changelog. In this case, use the “Comment” header instead, for example:

<!-- wp:docspress/colorful-code {"language":"plaintext","filename":"projects/[type]/[project]/changelog/[change-file]","code":"Significance: patch\nType: compat\nComment: Update composer.lock, no changelog entry needed.","highlightedLines":"3","showLineNumbers":true,"caption":"A comment explains why a required change file intentionally produces no public changelog line."} /-->

**Adding the first PR to a project after a release?** If a PR is the first to Jetpack after a release, version numbers may need to be bumped. This also applies to the first semantic versioning “minor” or “major” change to any projects that use semantic versioning.

The “Linting / Changelogger validity” GitHub Actions check will help in making sure that all these version numbers are in sync with the version inferred from the changelog and change files. You can also check this locally with `tools/changelogger-validate-all.sh`.

Within a single project, changelogger’s `version next` command can tell you the next version, and the monorepo script `tools/project-version.sh` can be used to check and update the version numbers.

## New Projects

To begin,
* For Automatticians, drop us a line in #jetpack-developers to discuss your needs, just to be sure we don't have something already. For others, it would probably be best to open an issue to discuss it.
* Use the `jetpack generate` command to create a skeleton project.
* Create your project based on the skeleton and submit a PR as usual.

Once we're sure that the project will be created and what its name will be, someone (you or the Monorepo team) does the following:
* Create a GitHub repo in the Automattic repo to be the mirror repo for this project. The new repo follows the [mirror repo guidelines](#mirror-repositories).

### Creating a new Composer Package

In addition to the above, after creating the mirror repo,
* Add a `composer.json` file to the repo, with some basic information about the package. This file is used by Packagist to generate the package page.
* Create a new Packagist package on packagist.org under the Automattic org. Add `automattic` as a maintainer.

### Creating a new plugin

In addition to the above, after creating the mirror repo,
* Add a first version of a `composer.json` file to the mirror repo.
* Add the plugin to Packagist, just like for Composer packages above, for folks who want to consume it through Composer.
* Ask the Beta Builder maintainers to add the new plugin to the current Beta server configuration.

### Importing an existing repo

To move development of an existing (public) repo into the Jetpack monorepo, you might do something like this.

Preparation in the original repo:
* Set up PHP_CodeSniffer with [our ruleset](https://packagist.org/packages/Automattic/jetpack-codesniffer) and fix any lints identified.
* Merge any PRs that are ready to merge.

In a checkout of the monorepo:
* Use `git remote add` to add a new remote for the existing repo, e.g. `git remote add existing-source-repo git@github.com:Automattic/existing-source-repo`
* `git fetch existing-source-repo`
* Create a new (temporary) branch based on the existing source repo: `git checkout -b existing-repo/prepare-source existing-source-repo/trunk`
* Agree on an import method with repository maintainers. Evaluate `git filter-repo` or a temporary history-preserving branch before moving files.
* Move the files to where they should live in the monorepo, e.g. `git mv -k * .* projects/plugins/new-plugin`
  * You may need to do something like `mkdir --parents ./projects/plugins/new-plugin` for the move to work.
* Commit `git add --all && git commit -m "Prepare XXX for monorepo"`
* Create the branch for the actual import: `git fetch origin && git checkout -b add/import-from-existing-repo origin/trunk`
* `git merge --allow-unrelated-histories existing-repo/prepare-source`. This will merge in the source plugin into the monorepo while maintaining all previous commits.
* Create additional commits to clean up the new project: adjust tooling to use what the monorepo provides, remove unneeded tooling, set monorepo configuration in `composer.json`, etc.
* Run linting and such. Commit anything necessary.
* Push the branch and open a draft pull request that clearly says the import must not merge before the cutover is approved.
* Coordinate with repository administrators to use a merge commit when preserving the imported history requires it. Do not change repository-wide merge settings without an agreed maintenance window.
* Clean up:
  * `git branch -D existing-repo/prepare-source` to delete the temporary branch.
  * If you want to move any open PRs from the old repo, check out the branches, `git merge origin/trunk` (and resolve any conflicts), push to origin, and recreate.
  * `git remote remove existing-source-repo` to remove the remote.
* If you're going to reuse the old repo as the mirror, reconfigure it to match the [mirror repo guidelines](#mirror-repositories).

See p9dueE-2on-p2 for past uses of this process.

While a private repo could be imported similarly, you'd have a lot of auditing to do to make sure no old commit exposes any private information.

## External Automattic npm packages

Some npm packages are maintained by Automattic but are not part of the Jetpack monorepo. These are typically packages that are used by multiple teams or projects, and are not specific to Jetpack.

### `@automattic/social-previews`

This package is used to display Social Previews in the block editor and other Jetpack SEO settings pages.

This package is maintained in [`Automattic/wp-calypso`](https://github.com/Automattic/wp-calypso/tree/4883414a0ede8adbd38737657bb5649367da4bf3/packages/social-previews).

#### Development process

If you need to update something in that package that is used by Jetpack, you should:

- Make the necessary changes in the `wp-calypso` repository.
- Use pnpm link to link the package in Jetpack to the local version in `wp-calypso`. Like this
  - `cd projects/js-packages/publicize-components`
  - `pnpm link /path/to/wp-calypso/packages/social-previews`
  - Do the same for `projects/plugins/jetpack`
- Test your changes
- Create a branch/PR in `wp-calypso`
- Bump the package version and commit the changes.
- Publish a beta version of the package by following the appropriate [instructions](https://github.com/Automattic/wp-calypso/blob/4883414a0ede8adbd38737657bb5649367da4bf3/docs/monorepo.md#publishing). Like this
  - `git tag "@automattic/social-previews@2.1.0-beta.10"`
  - `git push --tags`
  - `cd packages/social-previews`
  - `yarn npm publish`
- Revert the changes in the Jetpack monorepo that `pnpm link` made.
- Update the package version in Jetpack to the beta version.
- Create a PR in Jetpack which should now have the beta version of the package.
- Follow the instructions in Calypso to publish the package to npm after merging the PR to trunk
