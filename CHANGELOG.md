# Changelog

All notable changes to `propeller-v2-cms-vue` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
once it reaches 1.0. Until then (the `0.x` line) the public API may change
between minor versions; breaking changes are called out in this file.

## [0.1.4] - 2026-07-24

### Added

- `<CmsBlock>` / `<CmsPageRenderer>` now render **typed** blocks
  (`CmsTypedBlock`, discriminated by `_type` with spread fields) in addition to
  the flat `{ type, data }` adapter blocks. The renderer resolves the
  discriminator as `_type ?? type` and passes the whole block through as
  `:block`, so a `CmsProvider.getPage` → `CmsRichPage` result renders directly.
  `<CmsPageRenderer>` `page` prop now accepts `CmsPage | CmsRichPage`.
  Backward-compatible: flat blocks keyed by `type` still work unchanged.

## [0.1.3] - 2026-07-24

### Changed

- Widened the `@propeller-commerce/propeller-v2-core-ui` peer range to
  `>=0.2.4 <0.4` so the package installs cleanly alongside core-ui 0.3.x
  (as pulled in by `propeller-v2-vue-ui` 0.4.x). All core-ui imports are
  type-only and the CMS contract types are unchanged across 0.2→0.3, so this
  is a peer-range fix only — no runtime or API change. Dev deps bumped to
  core-ui `^0.3.1` / SDK `^0.13.0` to build against the current line.

## [0.1.2] - 2026-07-08

### Changed

- Bumped the `@propeller-commerce/propeller-sdk-v2` dev dependency to `^0.12.0`
  to build and test against the SDK's 0.12.0 release. No API change.

## [0.1.1] - 2026-06-02

### Added

- **Docusaurus documentation site** under `docs/`, deployed to
  https://propeller-commerce.github.io/propeller-v2-cms-vue/ via a new
  `.github/workflows/docs.yml` GitHub Action (build + GitHub Pages
  deploy). Covers getting-started, the `<CmsAdapterProvider>` /
  `provideCmsAdapter()` / `<CmsPageRenderer>` / `<CmsBlock>` /
  `useCms()` APIs, and patterns for homepage fallback, catch-all
  routing, preview mode, multi-locale, and per-block data fetching.
- **`release_to_github` stage in `.gitlab-ci.yml`** — automatic GitHub
  Release on every `Release X.Y.Z` push, mirroring the SDK pattern.

### Notes

No runtime / public-API changes — this is a tooling release that
backfills documentation + release automation for the existing 0.1.0
surface. Consumers do not need to update.

## [0.1.0] - 2026-06-01

Initial release. A small Vue layer over the framework-agnostic
`CmsAdapter` contract from `propeller-v2-core-ui`. Mirrors the React
counterpart (`propeller-v2-cms-react`).

### Added

- **`<CmsAdapterProvider :adapter="...">`** — wires a `CmsAdapter` instance
  into the Vue tree. Wire at the app root, alongside the `propellerVue`
  plugin. Pass `null` for shops without a CMS — the catch-all CMS route
  returns 404 and the homepage renders its static fallback. Nothing
  breaks downstream.
- **`provideCmsAdapter(adapter)`** — composable-style alternative to the
  provider component, for shops that prefer wiring through `setup()` or
  `app.runWithContext`.
- **`useCms()`** — read the installed adapter via inject. Returns `null`
  when the shop wasn't configured with a CMS. Intended for client islands
  that need optional adapter access (preview banners, edit-this-page
  links). Server data fetchers should construct the adapter directly and
  pass results into views, not call this composable.
- **`<CmsPageRenderer :page="..." :renderers="...">`** — renders a
  `CmsPage`'s block list. Iterates `page.blocks`, dispatches each block
  through `<CmsBlock>`.
- **`<CmsBlock :block="..." :renderers="..." :debug="...">`** — single-block
  dispatcher. Takes a `renderers` map keyed by `block.type`. Unknown
  block types render nothing in prod, or a visible debug box when `debug`
  is true. Block components are the shop's responsibility — this package
  ships none, because brand styling, layout, and content shape vary too
  much to share.

### Requires

- `propeller-v2-core-ui` ≥ 0.2.0 (for the `CmsAdapter`, `CmsPage`,
  `CmsBlock` contract).
- `vue` ≥ 3.4.
