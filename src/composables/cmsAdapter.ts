import { inject, provide, type InjectionKey } from 'vue';
import type { CmsAdapter } from '@propeller-commerce/propeller-v2-core-ui';

/**
 * Symbol-keyed injection — never collides with consumer keys.
 *
 * Wire ONCE at the app root, alongside the propellerVue plugin:
 *
 *   import { provideCmsAdapter } from 'propeller-v2-cms-vue';
 *   const strapiAdapter = createStrapiAdapter({ endpoint: ... });
 *
 *   // Either in a setup() at the root, or via app.runWithContext:
 *   provideCmsAdapter(strapiAdapter);
 *
 * Pass `null` for shops without a CMS — the catch-all CMS route returns 404
 * and the homepage renders its `<HomeFallback>`. Nothing breaks downstream.
 */
export const CmsAdapterKey: InjectionKey<CmsAdapter | null> =
  Symbol('propeller-cms-adapter');

/** Wire the adapter into the current component tree. */
export function provideCmsAdapter(adapter: CmsAdapter | null): void {
  provide(CmsAdapterKey, adapter);
}

/**
 * Return the installed CMS adapter, or `null` when the shop wasn't
 * configured with one (or `provideCmsAdapter` wasn't called).
 *
 * Server-side data fetchers should NOT call this composable — they should
 * receive the adapter via prop drilling or construct it directly in their
 * server entry. This is for client islands that need to check "do we have
 * a CMS at all" before rendering optional UI.
 */
export function useCms(): CmsAdapter | null {
  return inject(CmsAdapterKey, null);
}
