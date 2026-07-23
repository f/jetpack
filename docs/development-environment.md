---
title: "Configure the development environment"
description: "Set up the complete Jetpack toolchain, build workflow, tests, linting, and debugging environment."
audience: "Jetpack contributors"
document_type: reference
sidebar_position: 20
---
Use this reference when the [quick start](quick-start.md) does not cover your operating system, project, test suite, or debugging workflow.

## Choose a setup path

| Need | Start with |
| --- | --- |
| First local Jetpack contribution on macOS or Linux | [Quick start](quick-start.md) |
| Supported local WordPress environment | [Run Jetpack with Docker](#run-jetpack-locally) |
| Windows-specific setup | [Windows development](#windows-development) |
| WordPress.com sandbox and cloud features | [Test Jetpack cloud features](#test-jetpack-cloud-features) |
| Unit tests and linting | [Run unit tests](#run-unit-tests) and [Meet code quality requirements](#meet-code-quality-requirements) |
| Debugging tools | [Use development and debugging tools](#use-development-and-debugging-tools) |

## Set up your environment

### Understand the local environment

In order to start developing the Jetpack plugin you want to have access to a WordPress installation where you can install the plugin and work on it.

To do that you need to set up a WordPress site and give it the ability to run your local build of the Jetpack plugin code repository.

There are several ways to achieve this, listed in the next section.

### Run Jetpack locally

To get a local WordPress site up and running you need a web server (Apache, Nginx), PHP and MySQL (or MariaDB).

**Important:** Docker is the supported local environment. The other options are references for contributors who already maintain those environments.

**Docker (recommended)**

Docker provides WordPress and its dependencies in containers maintained with the repository.

Follow the [Docker environment for Jetpack development guide](https://github.com/Automattic/jetpack/blob/trunk/tools/docker/README.md).

**VVV**

VVV uses a Linux virtual machine rather than separate containers. Jetpack does not maintain this environment.

Read the [VVV documentation](https://varyingvagrantvagrants.org/).

**Local web and database servers**

This option is operating-system specific and is not maintained by Jetpack. Start with the [WordPress requirements](https://wordpress.org/about/requirements/) and the documentation for your web server, PHP, and database.

### Windows development

When working on a Windows machine, use [Windows Subsystem for Linux version 2](https://learn.microsoft.com/windows/wsl/install). If you are currently using WSL version 1, update to version 2 first.

If you use VS Code, use its [Remote Development support](https://code.visualstudio.com/docs/remote/wsl) to develop in WSL.

Keep the repository and Git operations inside the WSL filesystem so the CLI, editor, permissions, and file watchers use one environment.

## Install development tools

Here are the different steps you must follow to set up your Jetpack development environment:

1. [Clone the repository](#clone-the-repository)
2. [Install development tools](#install-development-tools)
3. [Check the development environment](#check-the-development-environment)

### Clone the repository

Before you get started, configure [an SSH key for GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) or use an HTTPS clone.

Fork this repository to your own GitHub account and clone it to your local machine, as explained in [GitHub's fork guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo). Contributors with write access may clone the repository directly.

If you use [the Jetpack Docker setup](https://github.com/Automattic/jetpack/blob/trunk/tools/docker/README.md), you can now move on to the next step.

If you are not using a Docker setup, you'll first need to create symlinks from the plugin directory in your local installation of WordPress to each of the plugins' directories in the monorepo (under `projects/plugins/`).

Note that the Monorepo should not be cloned into the WordPress plugins directory (you will see a warning on your plugins page in that case saying that the Jetpack Monorepo is not a plugin and shouldn't be installed as one). 

### Install required tools

You'll need all the tools below to work in the Jetpack monorepo.

* #### Node.js

	Node.js is used in the build process of some of our tools. If it's not already installed on your system, you can [visit the Node.js website and install the latest Long Term Support (LTS) version](https://nodejs.org/).

	You'll find the minimum required version in the [engines section](https://github.com/Automattic/jetpack/blob/trunk/package.json#L36) of package.json.

	We recommend usage of [nvm](https://github.com/nvm-sh/nvm/) for managing different Node versions on the same environment.

* #### Pnpm

	Pnpm is a Node.js package manager and it's used to install packages that are required to run development tools and build projects. To install it, either run `npm install -g pnpm` or you can [visit the Installation page of the project](https://pnpm.io/installation) for other methods.

	You'll find the minimum required version in the [engines section](https://github.com/Automattic/jetpack/blob/trunk/package.json#L36) of package.json.

* #### PHP

	PHP is a popular general-purpose scripting language that is especially suited to web development and it's at the core of the WordPress ecosystem.

	If you use [the Jetpack Docker setup](https://github.com/Automattic/jetpack/blob/trunk/tools/docker/README.md), PHP will be available to you in the container.

	If you use a different setup, you'll need to install PHP on your operating system. As it's very dependent on your operating system and its flavor, we're not going to cover it in this document at this time. You can check out the [official installation instructions from the project website](https://www.php.net/manual/en/install.php).

* #### Composer

	Composer is a PHP package manager and it's used to install packages that are required to run development tools and build projects.

	The canonical source for the required Composer version is [`.github/versions.sh`](https://github.com/Automattic/jetpack/blob/trunk/.github/versions.sh).

	 * ##### Installing Composer on macOS

		Composer can be installed using [Homebrew](https://brew.sh/). If you don't have Homebrew, install it with

		<!-- wp:docspress/terminal-session {"title":"Install Homebrew on macOS","shell":"bash","prompt":"$","command":"bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"","output":""} /-->

		And then install Composer:

		<!-- wp:docspress/terminal-session {"title":"Install Composer with Homebrew","shell":"bash","prompt":"$","command":"brew install composer","output":""} /-->

	 * ##### Installing Composer on other systems

		We recommend visiting the [official Composer download instructions](https://getcomposer.org/download/) to install composer on other operating systems.

		Most Linux distributions may have an older version of Composer as an installable package, but installing from the official source ensures you have the most up to date version.
		Use [Windows Subsystem for Linux](#windows-development) to run Composer and PHP on Windows.

* #### jetpack CLI

	The `jetpack` CLI tool is used to help with development in the Jetpack monorepo. Find out more and install it by following the instructions on the [Jetpack CLI page](https://github.com/Automattic/jetpack/blob/trunk/tools/cli/README.md).

### Check the development environment

We provide a script to help you in assessing if everything's ready on your system to contribute to Jetpack.

<!-- wp:docspress/terminal-session {"title":"Check the development environment","shell":"bash","prompt":"$","command":"tools/check-development-environment.sh","output":""} /-->

Running the script will tell you if you have your environment already set up and what you need to do in order to get it ready for Jetpack development.

If you're ready to start, you should see all green `ok` or `yes` messages. If the script detects issues, you will see a red message indicating whether you are missing a requirement or have a version outside of the expected range, along with a link to help you address the issue.

Once you're all set here, you can continue developing. If you're setting up a local environment and want to start testing immediately, please ensure you build the projects you need.

`jetpack build` will provide prompts to determine the project you need or you can pass it a complete command, like `jetpack build plugins/jetpack --deps`

### Test Jetpack cloud features

In order to test features that require a WordPress.com connection and other network related Jetpack features, you'll need a test site that can create local HTTP tunnels.

If you're an Automattician, use [Jurassic Tube](quick-start.md#set-up-jurassic-tube).

For other methods, read [Using ngrok with Jetpack](https://github.com/Automattic/jetpack/blob/trunk/tools/docker/README.md#using-ngrok-with-jetpack) or choose another tunneling service approved for your environment.

## Follow the development workflow

Once you have a local copy of Jetpack and all development tools installed, you can start developing.

1. Make sure the plugin you're developing is activated on your WordPress site.
2. [Build your project](#build-a-project).
3. Access the plugin's dashboard in your browser.

### Build a project

The Jetpack monorepo is home to different projects, with different needs. Some require that you build PHP, JavaScript, and CSS components. [The Jetpack CLI tool](https://github.com/Automattic/jetpack/blob/trunk/tools/cli/README.md) will help you with all building steps.

There are different types of builds:

* ### Development build
	A standard development build creates unminified JavaScript and CSS. Run the interactive command without a project, or pass a project slug to make the build reproducible:

	<!-- wp:docspress/code-tabs {"tabs":[{"label":"Choose interactively","language":"bash","filename":"Terminal","code":"jetpack build"},{"label":"Build Jetpack and dependencies","language":"bash","filename":"Terminal","code":"jetpack build plugins/jetpack --deps"}],"showLineNumbers":false,"caption":"The explicit project form is easier to repeat in test evidence and automation."} /-->

	The Jetpack CLI tool will then guide you so you can build the project you are interested in.

* ### Continuous Development build
	By default the development build above will run once and if you change any of the files, you need to run `jetpack build` again to see the changes on the site. If you want to avoid that, you can run a continuous build that will rebuild anytime it sees any changes on your local filesystem. To run it, use:

	<!-- wp:docspress/terminal-session {"title":"Watch and rebuild a project","shell":"bash","prompt":"$","command":"jetpack watch","output":""} /-->

* ### Draft Mode
	Draft mode makes pre-commit and pre-push hooks less aggressive while work is incomplete. Warnings still run, but do not block the draft workflow. Disable draft mode before preparing the branch for review.

	<!-- wp:docspress/code-tabs {"tabs":[{"label":"Enable draft mode","language":"bash","filename":"Terminal","code":"jetpack draft enable"},{"label":"Return to normal checks","language":"bash","filename":"Terminal","code":"jetpack draft disable"}],"showLineNumbers":false,"caption":"Draft mode changes local hook behavior; it does not replace required pull-request validation."} /-->

#### Sync local changes with Unison
  
  In some cases, you may need to test Jetpack (jetpack-mu-wpcom, in particular) changes by syncing your changes to another machine (rather than using Docker). This outlines a strategy for syncing changes in real-time using the [Unison](https://github.com/bcpierce00/unison) file sync tool combined with the [unison-fsmonitor](https://github.com/benesch/unison-fsmonitor) (Note that unison-fsmonitor is OSX-only).

  This approach may be especially useful for Automatticians who are testing changes on their WordPress.com sandbox. Using Unison can be more continuous than rsync (or `jetpack rsync`).

  #### Installing Unison

  Please see the respective [Unison](https://github.com/bcpierce00/unison) and [unison-fsmonitor](https://github.com/benesch/unison-fsmonitor) repositories for full installation instructions. 

  On OSX, you can use [Homebrew](https://brew.sh/) to quickly install both tools:

  <!-- wp:docspress/terminal-session {"title":"Install Unison and its macOS file monitor","shell":"bash","prompt":"$","command":"brew install unison autozimu/formulas/unison-fsmonitor","output":""} /-->

  #### Configuring Unison

  Once Unison is installed, you'll want to create a preferences file. On OSX/Linux, that preferences file would be placed in `~/.unison` and could be called something like `jetpack-plugin-sync.prf`. See the Unison documentation for instructions for other platforms.

  The built-in Unison help documentation may be useful:

  <!-- wp:docspress/terminal-session {"title":"Read the built-in Unison references","shell":"bash","prompt":"$","command":"unison -doc tutorial | less\nunison -doc basics | less\nunison -doc running | less","output":""} /-->
  
  Here is a [sample preferences file](https://github.com/Automattic/jetpack/blob/trunk/docs/examples/unison-sample.prf). The example always prefers local changes over remote changes. Adjust it if you require two-way sync. See the Unison documentation, or run `unison -doc running | less`, for configuration details.

  #### Running Unison

  Once your preference file is configured, you can simply run something like the following in a terminal:

  <!-- wp:docspress/terminal-session {"title":"Start the configured Unison profile","shell":"bash","prompt":"$","command":"unison -ui text -repeat watch jetpack-plugin-sync","output":""} /-->

  Unison will watch for any local changes to the Jetpack files and sync them to your remote host.
  
  * For more advanced configuration when working on WordPress.com, see the [advanced unison configuration](unison-wordpress-com.md).
---

## Run unit tests


The Jetpack plugin includes several [unit tests](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/jetpack/tests) that you can run in your local environment before submitting a new Pull Request.

If PHP unit testing is new to you, start with the [WordPress PHPUnit handbook](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/).

To get started, there are several ways to run the unit tests, depending on how you set up your development environment.

### Run PHP unit tests

* ### Docker

	Choose the command that matches the environment and scope you need:

	<!-- wp:docspress/code-tabs {"tabs":[{"label":"Jetpack suite","language":"bash","filename":"Terminal","code":"jetpack docker phpunit jetpack"},{"label":"Filtered Jetpack suite","language":"bash","filename":"Terminal","code":"jetpack docker phpunit jetpack -- --filter=Protect"},{"label":"Filtered multisite suite","language":"bash","filename":"Terminal","code":"jetpack docker phpunit jp-multisite -- --filter=Protect"}],"showLineNumbers":false,"caption":"Arguments after the double dash are passed to PHPUnit inside the Docker test environment."} /-->

	Package tests usually need less infrastructure. Run them through the CLI from the monorepo root, through Composer from the package directory, or from a Docker shell when the environment itself is part of the test:

	<!-- wp:docspress/code-tabs {"tabs":[{"label":"Jetpack CLI","language":"bash","filename":"Terminal","code":"jetpack test -v php packages/assets"},{"label":"Package directory","language":"bash","filename":"Terminal","code":"cd projects/packages/assets\ncomposer phpunit"},{"label":"Docker shell","language":"bash","filename":"Terminal","code":"jetpack docker sh\ncd /usr/local/src/jetpack-monorepo\npnpm jetpack test -v php packages/assets"}],"showLineNumbers":false,"caption":"Use the narrowest execution path that reproduces the behavior under test."} /-->

* ### VVV & Local Installs

	If you are running a recent version of [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) then Jetpack will automatically detect your wordpress-develop install and you can just run `phpunit` directly.

	Otherwise you'll need to manually install the `wordpress-develop` branch, as follows:

	<!-- wp:docspress/terminal-session {"title":"Create a local wordpress-develop checkout","shell":"bash","prompt":"$","command":"svn co https://develop.svn.wordpress.org/trunk/ /tmp/wordpress-develop\ncd /tmp/wordpress-develop\ncp wp-tests-config-sample.php wp-tests-config.php","output":""} /-->

	Set the database information for your testing DB in the file `/tmp/wordpress-develop/wp-tests-config.php`. You may need to create this database.

	To run tests on your machine, you can run `phpunit` while in the Jetpack directory.

	To run WooCommerce integration tests, you'll need the WooCommerce plugin installed alongside Jetpack (in `../woocommerce`), and you can run:

	<!-- wp:docspress/code-tabs {"tabs":[{"label":"WooCommerce integration","language":"bash","filename":"Terminal","code":"JETPACK_TEST_WOOCOMMERCE=1 phpunit"},{"label":"Multisite","language":"bash","filename":"Terminal","code":"phpunit -c tests/php.multisite.${PHPUNIT_MAJOR_VERSION}.xml"},{"label":"One matching test","language":"bash","filename":"Terminal","code":"phpunit --filter my_test_name"}],"showLineNumbers":false,"caption":"These local variants assume wordpress-develop and the relevant dependencies are already configured."} /-->

### Run JavaScript unit tests

The `jetpack test` command can be used from the monorepo's root to run a specific project's tests.

This may be of limited benefit locally during development since it isn't possible to use watch mode or run tests only for an individual file.

Each project within the monorepo may also have its own test commands, so an alternative is to `cd` into the project's root, and run the test commands from there.

#### Test packages

Packages may have a package.json in the root that has a `scripts` entry, and this details the different types of test commands that can be run, `pnpm test` is the usual command for JavaScript unit tests.

For example, to run an individual test file in watch mode:
<!-- wp:docspress/terminal-session {"title":"Watch one package test file","shell":"bash","prompt":"$","command":"cd projects/packages/forms\npnpm test --watch -- path/to/test/file.js","output":""} /-->

#### Test the Jetpack plugin

The Jetpack plugin project also has some additional test commands that can be run from its root.

##### Test the admin page

Tests for the Jetpack dashboard and settings pages can be run using the following command:

<!-- wp:docspress/terminal-session {"title":"Run Jetpack admin-page tests","shell":"bash","prompt":"$","command":"cd projects/plugins/jetpack\npnpm test-adminpage","output":""} /-->

This runs both the `client` (stores and other business logic) and `gui` (react component) tests, but they can also be run individually using `pnpm test-client` or `pnpm test-gui`.

You can also run only tests that match a specific pattern. To do that, use the argument `-g, --grep <pattern>`:

<!-- wp:docspress/code-tabs {"tabs":[{"label":"Filter GUI tests","language":"bash","filename":"Terminal","code":"pnpm test-gui -g 'my custom pattern to filter tests'"},{"label":"Choose a client reporter","language":"bash","filename":"Terminal","code":"pnpm test-client -R 'my_reporter'"}],"showLineNumbers":false,"caption":"Run these from projects/plugins/jetpack after installing its dependencies."} /-->

##### Test extensions

Tests for editor extensions (including blocks, sidebars and more) can be run using the following command:

<!-- wp:docspress/terminal-session {"title":"Run editor-extension tests","shell":"bash","prompt":"$","command":"cd projects/plugins/jetpack\npnpm test-extensions","output":""} /-->

## Meet code quality requirements

### Follow coding standards

We strongly recommend that you install tools to review your code in your IDE. It will make it easier for you to notice any missing documentation or coding standards you should respect. Most IDEs display warnings and notices inside the editor, making it even easier.

- Jetpack's custom Code Sniffer ruleset is located at `./projects/packages/codesniffer/Jetpack/ruleset.xml`. Depending on your IDE, you can use this path or you may need to use `.phpcs.xml.dist` in the monorepo root.
- For JavaScript, we recommend installing ESLint. Most IDEs come with an ESLint plugin that you can use. Jetpack includes a `eslint.config.mjs` file that defines our coding standards.

### Run linters

* ### Linting Jetpack's PHP code

	You can use these commands to set up the rulesets and lint Jetpack's PHP code. If Composer is missing, return to [Install required tools](#install-required-tools).

	This will install all the CodeSniffer rulesets we need for linting Jetpack's PHP code. You may need to do this only once.

	<!-- wp:docspress/terminal-session {"title":"Install PHP lint dependencies","shell":"bash","prompt":"$","command":"composer install","output":""} /-->

	This runs the actual linting task.

	<!-- wp:docspress/terminal-session {"title":"Lint Jetpack PHP","shell":"bash","prompt":"$","command":"composer phpcs:lint","output":""} /-->

* ### Checking Jetpack's PHP for compatibility with different versions of PHP

	We have a handy `composer` script that will just run the PHP CodeSniffer `PHPCompatibilityWP` ruleset checking for code not compatible with supported PHP versions:

	<!-- wp:docspress/terminal-session {"title":"Check PHP-version compatibility","shell":"bash","prompt":"$","command":"composer phpcs:compatibility","output":""} /-->

* ### Linting Jetpack's JavaScript

	`pnpm lint` will check syntax and style in the following JavaScript pieces:

	* All the front end JavaScript that Jetpack relies on.
	* All the JavaScript present in the Admin Page Single Page App for Jetpack.

	<!-- wp:docspress/terminal-session {"title":"Lint Jetpack JavaScript","shell":"bash","prompt":"$","command":"pnpm lint","output":""} /-->

	_If you haven't done it yet, you may need to run `pnpm install` before `pnpm lint` for installing node modules for this task_.

---

## Use development and debugging tools

* ### WP_DEBUG

	You should do all Jetpack development with `define( 'WP_DEBUG', true );` in your `wp-config.php`, making sure that you’re not generating any Notices or other PHP issues in your error_log.

* ### SCRIPT_DEBUG

	By default, WordPress loads minified versions of Jetpack's JS files. If you want to work with them, add `define( 'SCRIPT_DEBUG', true );` in your `wp-config.php`. This tells WordPress to load the non-minified JS version, allowing you to see your changes on page refresh. This applies to the JS files outside of `_inc/client/` and `extensions/`.

* ### WP-CLI

	Jetpack CLI is a command line interface for Jetpack, extending off of WP-CLI for WordPress. You can easily modify your installation of Jetpack with a just a few simple commands. All you need is SSH access and a basic understanding of command line tools.

	Usage:

	* `wp jetpack status [<full>]`
	* `wp jetpack module <list|activate|deactivate|toggle> [<module_name>]`
	* `wp jetpack options <list|get|delete|update> [<option_name>] [<option_value>]`
	* `wp jetpack protect <allow> [<ip|ip_low-ip_high|list|clear>]`
	* `wp jetpack reset <modules|options>`
	* `wp jetpack disconnect <blog|user> [<user_identifier>]`
	* `wp jetpack status`
	* `wp jetpack status [<full>]`

	More info can be found in [our support documentation](https://jetpack.com/support/jetpack-cli/).

* ### JETPACK_DEV_DEBUG

	`JETPACK_DEV_DEBUG` constant can be used to enable offline mode in Jetpack. Add `define( 'JETPACK_DEV_DEBUG', true );` in your `wp-config.php` to enable it. With Offline Mode, features that do not require a connection to WordPress.com servers can be activated on a local WordPress installation for testing.

	Offline mode automatically gets enabled if you don’t have a period in your site’s hostname, i.e. localhost. If you use a different URL, such as mycooltestsite.local, then you will need to define the `JETPACK_DEV_DEBUG` constant.

	You can also enable Jetpack’s offline mode through a plugin, thanks to the jetpack_offline_mode filter:

	`add_filter( 'jetpack_offline_mode', '__return_true' );`

	See [Use custom code snippets](#use-custom-code-snippets-mu-plugins) for the local mu-plugin workflow.

	While in Offline Mode, some features will not be available at all as they require WordPress.com for all functionality—Related Posts and Jetpack Social, for example. Other features will have reduced functionality to give developers a good-faith representation of the feature. For example, Tiled Galleries requires the WordPress.com Photon CDN; however, in Offline Mode, Jetpack provides a fallback so developers can have a similar experience during development and testing. Find out more in [our support documentation](https://jetpack.com/support/jetpack-for-developers/).

* ### JETPACK__SANDBOX_DOMAIN

	External contributors do not need this constant.
	If you’re working on changes to the WordPress.com/server side of Jetpack, you’ll need to instruct your Jetpack installation to talk to your development server. Refer to internal documentation for detailed instructions.

### Use custom code snippets (mu-plugins)

You can add [mu-plugins](https://developer.wordpress.org/advanced-administration/plugins/mu-plugins/) inside `tools/docker/mu-plugins` like `0-snippets.php` to add custom code snippets to your test site. Those files are gitignored. This is useful for testing specific features or debugging issues.

For example, you can add the following code to the `0-snippets.php` file to use local Calypso URLs instead of the production ones for connecting a site.

<!-- wp:docspress/colorful-code {"language":"php","filename":"tools/docker/mu-plugins/0-snippets.php","code":"add_filter(\n\t'jetpack_build_authorize_url',\n\tfunction ( $url ) {\n\t\t// Comment out this line when not using local Calypso development URL.\n\t\t$url = str_replace( 'https://wordpress.com', 'http://calypso.localhost:3000', $url );\n\n\t\treturn $url;\n\t}\n);","highlightedLines":"5","showLineNumbers":true,"caption":"A local-only mu-plugin can redirect the authorization URL while testing a Calypso development build."} /-->
