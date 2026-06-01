/**
 * propeller-v2-cms-vue — public surface.
 *
 * A small Vue layer over the framework-agnostic CMS contract from
 * `propeller-v2-core-ui`. Three pieces:
 *
 *   - <CmsAdapterProvider> + provideCmsAdapter() + useCms() — plumbing
 *   - <CmsPageRenderer>                                      — renders a CmsPage
 *   - <CmsBlock>                                             — single-block dispatcher
 *
 * The shop wires the adapter once at the root, then any descendant can call
 * `useCms()` for optional adapter access. Server data fetchers should
 * construct the adapter directly and pass results into views.
 *
 * Block component registration is the consumer's job — pass a `renderers`
 * map keyed by `block.type` to <CmsPageRenderer>. The package ships no
 * opinionated block components; commerce shops register their own
 * brand-styled <HeroBlock>, <TextBlock>, <ProductCarouselBlock>, etc.
 */

// ── Re-export the contract from core for ergonomic single-import usage ──────
export type {
  CmsAdapter,
  CmsBlock as CmsBlockShape,
  CmsPage,
  CmsMenuItem,
  CmsGlobals,
  CmsFetchOptions,
} from 'propeller-v2-core-ui';

// ── Composables ─────────────────────────────────────────────────────────────
export {
  provideCmsAdapter,
  useCms,
  CmsAdapterKey,
} from './composables/cmsAdapter';

// ── Components ──────────────────────────────────────────────────────────────
export { default as CmsAdapterProvider } from './components/CmsAdapterProvider.vue';
export { default as CmsBlock } from './components/CmsBlock.vue';
export { default as CmsPageRenderer } from './components/CmsPageRenderer.vue';
