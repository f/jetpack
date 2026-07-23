---
title: "Use the Jetpack REST API"
description: "Discover, authenticate, call, and test the Jetpack plugin REST endpoints registered on a WordPress site."
audience: "WordPress developers"
document_type: reference
sidebar_position: 70
---
Jetpack extends the [WordPress REST API](https://developer.wordpress.org/rest-api/) under the `jetpack/v4` namespace. Use this reference when code running on a WordPress site needs a documented Jetpack plugin endpoint.

The registered routes depend on the active Jetpack version, connection state, modules, standalone plugins, and packages. Runtime discovery and the source shipped with the installed version are authoritative.

## Understand the API boundary

This page covers routes served by the WordPress site at `/wp-json/jetpack/v4/...`. It does not document the public WordPress.com REST API, Jetpack Cloud APIs, or private Automattic services.

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  plugins/\n    jetpack/\n      _inc/\n        lib/\n          class.core-rest-api-endpoints.php\n          core-api/\n      tests/\n        php/\n          _inc/lib/\n          core-api/\n  packages/\n    connection/\n      src/\n        class-rest-connector.php\n      tests/\n        php/\n          REST_Endpoints_Test.php","caption":"Core plugin routes, connection routes, permission callbacks, arguments, and regression tests are the source of truth for the installed code."} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"An endpoint path is not an authorization grant","content":"<p>Every write must pass its registered permission callback and parameter validation. A REST nonce protects a cookie-authenticated request from cross-site request forgery; it does not give the current user a capability they do not have.</p>","collapsible":false} /-->

Before calling an endpoint:

1. Confirm that it appears in the installed site's REST index.
2. Inspect its `methods`, `args`, and schema in the discovery response.
3. Authenticate through a supported WordPress mechanism.
4. Check the current user's required capability and the route's permission callback.
5. Exercise writes with disposable data on a local or staging site.
6. Treat response fields as versioned data unless the route documents a stable contract.

## Discover registered routes

Open `/wp-json/` to inspect the site's complete REST index. The Jetpack namespace index narrows the result:

<!-- wp:docspress/api-request {"method":"GET","endpoint":"/wp-json/jetpack/v4","headers":"Accept: application/json","requestBody":"","requestBodyFormat":"json","responseStatus":"200 OK","responseBody":"","responseBodyFormat":"json"} /-->

Search the response's `routes` object for the exact path you plan to call. A route entry tells you which methods are registered and may expose accepted arguments. A route absent from discovery is unavailable in that environment even if it exists on another Jetpack version.

<!-- wp:docspress/callout {"tone":"tip","title":"Record discovery with bug reports","content":"<p>When an integration behaves differently across sites, record the WordPress and Jetpack versions, active Jetpack plugins, connection state, and the discovered route definition. Do not attach cookies, nonces, tokens, or private response data.</p>","collapsible":true,"open":false} /-->

## Authenticate a browser request

Code running in an authenticated WordPress administration session can use [cookie authentication](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/#cookie-authentication) with a nonce created for the `wp_rest` action.

On the Jetpack administration screen, current Jetpack code exposes the REST root and nonce through:

- `window.Initial_State.WP_API_root`
- `window.Initial_State.WP_API_nonce`

These browser-console examples are development diagnostics, not a production client architecture:

<!-- wp:docspress/code-tabs {"tabs":[{"label":"fetch","language":"javascript","filename":"Browser console","code":"const root = window.Initial_State.WP_API_root;\nconst nonce = window.Initial_State.WP_API_nonce;\n\nconst response = await fetch( `${ root }jetpack/v4/connection`, {\n\tcredentials: 'same-origin',\n\theaders: {\n\t\tAccept: 'application/json',\n\t\t'X-WP-Nonce': nonce,\n\t},\n} );\n\nif ( ! response.ok ) {\n\tthrow new Error( `Jetpack API returned ${ response.status }` );\n}\n\nconsole.log( await response.json() );"},{"label":"jQuery","language":"javascript","filename":"Browser console","code":"const root = window.Initial_State.WP_API_root;\nconst nonce = window.Initial_State.WP_API_nonce;\n\njQuery.ajax( {\n\turl: `${ root }jetpack/v4/connection`,\n\tmethod: 'GET',\n\theaders: {\n\t\tAccept: 'application/json',\n\t\t'X-WP-Nonce': nonce,\n\t},\n} )\n\t.done( response => console.log( response ) )\n\t.fail( error => console.error( error.responseJSON || error.responseText ) );"}],"showLineNumbers":true,"caption":"Equivalent cookie-authenticated diagnostics using the REST root and nonce already present on the Jetpack admin page."} /-->

For an external application, use a WordPress-supported authentication method such as [Application Passwords](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/#basic-authentication-with-application-passwords). Do not scrape the Jetpack administration page for a nonce.

## Send and evaluate a request

Use the same sequence for every route:

1. Read the route definition from discovery.
2. Confirm the method and required arguments.
3. Send `Accept: application/json`.
4. For a JSON body, send `Content-Type: application/json`.
5. Include the authentication material required by your WordPress auth method.
6. Check the HTTP status before reading the response body.
7. Handle a WordPress `WP_Error` response as structured JSON, not as a successful resource.

### Read connection status

`GET /connection` is intentionally readable without a logged-in user, but it returns status flags rather than credentials or private connection data.

<!-- wp:docspress/api-request {"method":"GET","endpoint":"/wp-json/jetpack/v4/connection","headers":"Accept: application/json","requestBody":"","requestBodyFormat":"json","responseStatus":"200 OK","responseBody":"{\n  \"isActive\": true,\n  \"isStaging\": false,\n  \"isRegistered\": true,\n  \"isUserConnected\": true,\n  \"hasConnectedOwner\": true,\n  \"offlineMode\": {\n    \"isActive\": false,\n    \"constant\": false,\n    \"url\": false,\n    \"filter\": false,\n    \"wpLocalConstant\": false,\n    \"option\": false\n  },\n  \"isPublic\": true\n}","responseBodyFormat":"json"} /-->

The connection package can add or filter fields. Test only the fields your integration needs and define behavior for disconnected, site-only, user-connected, staging, and offline states.

### Read settings

The settings response combines module activation states and settings available to the current user. Its keys vary with active modules and the installed version.

<!-- wp:docspress/api-request {"method":"GET","endpoint":"/wp-json/jetpack/v4/settings","headers":"Accept: application/json\nX-WP-Nonce: [wp-rest-nonce]","requestBody":"","requestBodyFormat":"json","responseStatus":"200 OK","responseBody":"{\n  \"carousel\": true,\n  \"carousel_background_color\": \"white\"\n}","responseBodyFormat":"json"} /-->

Treat the response above as a minimal shape, not a complete settings schema. Discover the route and inspect the installed source before depending on a key.

### Update one or more settings

Send only the keys you intend to change. The endpoint validates known settings and can return `400` when a value has the wrong type or is not updateable.

<!-- wp:docspress/api-request {"method":"POST","endpoint":"/wp-json/jetpack/v4/settings","headers":"Accept: application/json\nContent-Type: application/json\nX-WP-Nonce: [wp-rest-nonce]","requestBody":"{\n  \"carousel_background_color\": \"black\"\n}","requestBodyFormat":"json","responseStatus":"200 OK","responseBody":"","responseBodyFormat":"json"} /-->

Read the setting again after a successful write when your workflow needs to prove the stored value. Do not assume a `200` response means every unrelated setting stayed unchanged.

### Activate or deactivate modules

Use the dedicated toggle route for one module. The module slug is part of the path and `active` is a required Boolean.

<!-- wp:docspress/api-request {"method":"POST","endpoint":"/wp-json/jetpack/v4/module/protect/active","headers":"Accept: application/json\nContent-Type: application/json\nX-WP-Nonce: [wp-rest-nonce]","requestBody":"{\n  \"active\": true\n}","requestBodyFormat":"json","responseStatus":"200 OK","responseBody":"","responseBodyFormat":"json"} /-->

For several modules, use `POST /module/all/active` with a `modules` array and an optional shared `active` Boolean. Module availability and connection requirements still apply.

## Route families

The core Jetpack plugin and Connection package currently register these important route families. Specialized packages and active features can add more.

| Purpose | Representative routes | Notes |
| --- | --- | --- |
| Discovery | `GET /jetpack/v4` | Runtime source for methods and arguments |
| Connection status and health | `GET /connection`, `/connection/check`, `/connection/test`, `/connection/data`, `/connection/plugins` | Permission requirements differ; user data is not public status data |
| Connection changes | `POST /connection`, `/connection/user`, `/connection/reconnect` | Disconnect and unlink operations are destructive |
| Connection entry | `GET /connection/url` | Returns a fresh connection URL for an authorized user |
| Settings | `GET|POST /settings`, `POST /settings/{slug}` | Available keys are dynamic and validated |
| Modules | `GET /module/all`, `POST /module/all/active`, `GET|POST /module/{slug}`, `POST /module/{slug}/active`, `GET /module/{slug}/data` | A module may require a site or user connection |
| Site and plan data | `GET /site`, `/site/features`, `/site/products`, `/site/purchases`, `/site/benefits`, `/site/activity`, `/site/discount`, `/plans`, `/products` | Responses depend on connection, products, and permissions |
| Security products | `GET /rewind`, `/scan` | Administrative visibility is required |
| Plugin management | `GET|POST /plugins`, `POST /plugins/{plugin}`, `GET /plugin/{plugin}`, `GET /updates/plugins` | Requires plugin-management capability; prefer WordPress core routes when they meet the need |
| Feature availability | `GET /features/available`, `/features/enabled` | Registered by current Jetpack feature APIs |
| Tracking and recommendations | `GET|POST /tracking/settings`, `/recommendations/data`, `/recommendations/step`; recommendation read routes | User and site permissions vary |
| Site verification and widgets | `GET|POST /verify-site/{service}`, `GET /widgets/{id}` | Inspect route arguments before use |
| Notices and reset operations | `POST /notice/{notice}`, `POST /options/{options}` | Notice IDs and reset targets are validated |

<!-- wp:docspress/callout {"tone":"danger","title":"Disconnect, unlink, reset, install, and activation routes change site state","content":"<p>Do not experiment with these routes on production. Confirm ownership, backups, rollback, expected connection behavior, and the exact permission callback. A copied request can disconnect a site, unlink a user, reset settings, or change installed software.</p>","collapsible":false} /-->

## Handle errors explicitly

WordPress REST errors normally include a machine-readable `code`, human-readable `message`, and `data.status`. Your client should:

- branch on the HTTP status and stable error code, not translated message text;
- preserve enough redacted context for diagnosis;
- handle `401` and `403` as authentication or capability problems;
- handle `400` as invalid or unsupported input;
- avoid automatically retrying a rejected write;
- tolerate additional response fields;
- fail safely when a route or required field is absent.

<!-- wp:docspress/colorful-code {"language":"javascript","filename":"jetpack-request.js","code":"export async function jetpackRequest( path, options = {} ) {\n\tconst response = await fetch( `/wp-json/jetpack/v4/${ path }`, {\n\t\tcredentials: 'same-origin',\n\t\theaders: {\n\t\t\tAccept: 'application/json',\n\t\t\t'Content-Type': 'application/json',\n\t\t\t...options.headers,\n\t\t},\n\t\t...options,\n\t} );\n\n\tconst payload = await response.json().catch( () => null );\n\n\tif ( ! response.ok ) {\n\t\tconst error = new Error( payload?.message || `HTTP ${ response.status }` );\n\t\terror.code = payload?.code || 'jetpack_rest_error';\n\t\terror.status = response.status;\n\t\tthrow error;\n\t}\n\n\treturn payload;\n}","highlightedLines":"13-21","showLineNumbers":true,"caption":"A client wrapper should separate HTTP failure from a successful JSON payload and preserve the structured WordPress error code."} /-->

The wrapper deliberately does not invent an authentication strategy. Add the nonce or authorization header at the call site appropriate to the WordPress environment.

## Verify an integration

Test at least:

- the route absent and present;
- unauthenticated, authenticated-but-forbidden, and authorized users;
- valid, missing, wrong-type, and unknown arguments;
- disconnected, site-connected, and user-connected states when relevant;
- local/offline, staging, and production-like states;
- the installed Jetpack version range you claim to support;
- retries and timeouts for any route that reaches WordPress.com;
- rollback for every write.

For Jetpack core route changes, run the focused endpoint and authentication tests from the repository's Docker environment:

<!-- wp:docspress/terminal-session {"title":"Run focused Jetpack REST API tests","shell":"bash","prompt":"$","command":"jetpack docker phpunit jetpack -- --filter=Jetpack_REST_API","output":""} /-->

Connection route changes also require the Connection package tests and the consumers identified by that package.

<!-- wp:docspress/result {"status":"success","title":"The REST integration has a bounded contract","content":"<p>The route is discovered on every supported environment, permission failures are expected and tested, request values match the registered schema, responses are parsed defensively, and every write has a staging proof and rollback.</p>","meta":"discover → authorize → validate → call → verify"} /-->

## Continue

- Use [Choose a Jetpack integration](developers/choose-an-integration.md) before treating an internal route as a public extension point.
- Follow [Jetpack coding guidelines](coding-guidelines.md) for capability checks, input validation, output escaping, and compatibility.
- Build a version and connection-state matrix with [Test a Jetpack integration](developers/test-an-integration.md).
- Inspect the installed route in the WordPress REST index and the corresponding Jetpack source before shipping.
