---
title: "Start Jetpack development"
description: "Install the minimum required tools and run Jetpack locally for the first time."
audience: "Jetpack contributors"
document_type: tutorial
sidebar_position: 10
---
Use this tutorial to get a public or Automattic contributor from a fresh clone to a running local Jetpack site.

## Outcome

You will:

- clone the Jetpack monorepo;
- install the repository's required runtimes and package managers;
- link the Jetpack CLI;
- start the supported Docker environment;
- build and activate the Jetpack plugin;
- run a focused test command.

## Choose the right setup guide

This quick start supports macOS and Linux. Use [Configure the development environment](development-environment.md) for Windows, non-Docker setups, WordPress.com sandbox workflows, detailed debugging, and the complete tool reference.

Some cloud-feature and WordPress.com workflows require Automattic access. The public monorepo, local Docker environment, builds, and most contribution workflows do not.

## Install the repository

The paths used in this tutorial are:

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"AGENTS.md\n.github/\n  versions.sh\nprojects/\n  plugins/\n    jetpack/\ntools/\n  cli/\n  docker/\n    default.env\n    README.md\n  check-development-environment.sh\n  install-monorepo.sh","caption":"Start with the repository instructions, then use the checked-in versions and tooling instead of copying version numbers into your shell setup."} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Keep the monorepo outside wp-content/plugins","content":"<p>The repository contains many plugins and packages; it is not itself a WordPress plugin. Clone it into a normal development directory. The Docker environment mounts the projects it needs, while non-Docker setups use explicit symlinks.</p>","collapsible":false} /-->

### Using the installation script

The checked-in installer is the shortest supported route on macOS or Linux. Clone your fork when you intend to push a branch; otherwise clone the public repository.

<!-- wp:docspress/code-tabs {"tabs":[{"label":"SSH","language":"bash","filename":"Terminal","code":"git clone git@github.com:YOUR_GITHUB_USERNAME/jetpack.git\ncd jetpack"},{"label":"HTTPS","language":"bash","filename":"Terminal","code":"git clone https://github.com/YOUR_GITHUB_USERNAME/jetpack.git\ncd jetpack"}],"showLineNumbers":false,"caption":"Choose one clone method. Replace YOUR_GITHUB_USERNAME with the fork you control, or use Automattic for a read-only public clone."} /-->

<!-- wp:docspress/terminal-session {"title":"Install the monorepo toolchain","shell":"bash","prompt":"$","command":"tools/install-monorepo.sh","output":""} /-->

The installer checks the operating system, installs or selects the repository's Node.js and PHP versions, installs pnpm and Composer when needed, installs root dependencies, and links the `jetpack` CLI. Read the script before running it if your machine is managed or already has a custom language toolchain.

Once the installation is complete, continue to [Run Jetpack locally](#run-jetpack-locally).

### Installing manually

Manual setup is useful when you already manage runtimes yourself. Install Git, curl, Bash 4 or newer, jq, Node.js, pnpm, PHP, Composer, and Docker. Read `.github/versions.sh` before choosing runtime versions.

After the system tools are available, install repository dependencies and link the CLI:

<!-- wp:docspress/terminal-session {"title":"Install dependencies and link the Jetpack CLI","shell":"bash","prompt":"$","command":"nvm install\nnvm use\npnpm install\npnpm jetpack cli link\npnpm jetpack install --root","output":""} /-->

If linking the command is not possible, run it as `pnpm jetpack` from the repository root. See the [Jetpack CLI documentation](https://github.com/Automattic/jetpack/blob/trunk/tools/cli/README.md) for command discovery and relinking.

### Check if your environment is ready for Jetpack development

We provide a script to help you in assessing if everything's ready on your system to contribute to Jetpack.

<!-- wp:docspress/terminal-session {"title":"Check the development environment","shell":"bash","prompt":"$","command":"tools/check-development-environment.sh","output":""} /-->

Running the script will tell you if you have your environment already set up and what you need to do in order to get it ready for Jetpack development:

- All green `ok` or `yes` messages mean you're ready to start
- Red `no` or similar messages mean something is wrong or missing, and a link will be provided to help you with a fix.
- Yellow messages indicate something optional is broken or missing.

<!-- wp:docspress/result {"status":"success","title":"The contributor toolchain is ready","content":"<p>Continue when the checker reports the required Git, runtime, package-manager, and repository dependencies as available. Resolve every red required check before starting Docker or a build.</p>","meta":"tools/check-development-environment.sh"} /-->

## Run Jetpack locally

After everything is installed, you're ready to run Jetpack locally! While there are other supported methods of doing this, we recommend and support using Docker containers.

To setup Docker:

1. Install and start Docker Desktop on macOS, or a supported Docker Engine and Compose setup on Linux.
2. Copy the checked-in environment template and edit the local copy. At minimum, set a non-default `WP_ADMIN_PASSWORD` and review every exposed port.
3. Start the containers, install WordPress, and build Jetpack with its dependencies.

<!-- wp:docspress/terminal-session {"title":"Create the local WordPress environment","shell":"bash","prompt":"$","command":"cp tools/docker/default.env tools/docker/.env\njetpack docker up -d\njetpack docker install\njetpack build plugins/jetpack --deps","output":""} /-->

4. Open the URL configured by `PORT_WORDPRESS` in `tools/docker/.env`; the default is `http://localhost`.
5. Open `/wp-admin/plugins.php`, activate Jetpack, then open `/wp-admin/admin.php?page=jetpack#/settings`.

<!-- wp:docspress/callout {"tone":"tip","title":"A port conflict is a local configuration problem","content":"<p>If Docker cannot bind a host port, inspect the listener with <code>lsof -i :&lt;port&gt;</code>. Stop the conflicting service or assign a free <code>PORT_WORDPRESS</code> value in <code>tools/docker/.env</code>, then start the containers again.</p>","collapsible":true,"open":false} /-->

<!-- wp:docspress/result {"status":"success","title":"Jetpack is running locally","content":"<p>The WordPress Plugins screen shows Jetpack as active, its settings screen loads, and the local build is coming from the monorepo checkout.</p>","meta":"Docker → WordPress → Jetpack build"} /-->

For detailed Docker instructions, follow the [Docker environment for Jetpack development guide](https://github.com/Automattic/jetpack/blob/trunk/tools/docker/README.md).

## Set up Jurassic Tube

**Note:** This is for Automattician use only. For public alternatives, read [Using ngrok with Jetpack](https://github.com/Automattic/jetpack/blob/trunk/tools/docker/README.md#using-ngrok-with-jetpack) or use another tunneling service appropriate for your environment.

In order to test features that require a WordPress.com connection and other network related Jetpack features, you'll need a test site that can create local HTTP tunnels. If you're an Automattician, we recommend using Jurassic Tube.

Automatticians should follow the current internal Jurassic Tube instructions. Public contributors should use the documented ngrok workflow or another approved tunnel.

For detailed information about using Jurassic Tube with Docker, including recommended proxy configurations, see [Jurassic Tube tunneling service](https://github.com/Automattic/jetpack/blob/trunk/tools/docker/README.md#jurassic-tube-tunneling-service).

## Follow the development workflow

Once you have a local copy of Jetpack and all development tools installed, you can start developing.

1. Make sure the plugin you're developing is activated on your WordPress site.
2. [Build your project](development-environment.md#build-a-project) with `jetpack build [type/project]`, including dependencies when needed, such as `jetpack build plugins/jetpack --deps`.
3. Access the plugin's dashboard in your browser.

By default the development build above will run once and if you change any of the files, you need to run `jetpack build` again to see the changes on the site. If you want to avoid that, you can run a continuous build that will rebuild anytime it sees any changes on your local filesystem. To run it, use:

<!-- wp:docspress/terminal-session {"title":"Rebuild while files change","shell":"bash","prompt":"$","command":"jetpack watch","output":""} /-->

### Run tests

To run PHP, JS, and coverage tests, you can use the Jetpack CLI: `jetpack test` and then choose the project and type of test you'd like to run.

That's all!
