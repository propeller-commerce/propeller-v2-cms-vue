<script setup lang="ts">
import type { CmsPage, CmsRichPage } from '@propeller-commerce/propeller-v2-core-ui';
import CmsBlock from './CmsBlock.vue';

/**
 * Accepts either page shape:
 *  - `CmsPage`     — flat blocks (`{ type, data }`), the adapter contract.
 *  - `CmsRichPage` — typed blocks (`{ _type, ...fields }`), what a
 *    `CmsProvider.getPage` returns.
 * <CmsBlock> resolves the discriminator (`_type ?? type`) for either.
 */
withDefaults(
  defineProps<{
    page: CmsPage | CmsRichPage;
    /** Block-discriminator → component map. See <CmsBlock>. */
    renderers: Record<string, unknown>;
    /** Show debug boxes for unknown block types. */
    debug?: boolean;
    /** Optional wrapper class. */
    wrapperClass?: string;
  }>(),
  { debug: false }
);

/** Stable per-block key working for both flat (`type`) and typed (`_type`). */
function blockKey(block: unknown, i: number): string {
  const b = block as { type?: string; _type?: string };
  return `${b._type ?? b.type ?? 'block'}-${i}`;
}
</script>

<template>
  <div :class="wrapperClass" :data-cms-page-id="String(page.id)">
    <CmsBlock
      v-for="(block, i) in page.blocks"
      :key="blockKey(block, i)"
      :block="(block as any)"
      :renderers="renderers"
      :debug="debug"
    />
  </div>
</template>
