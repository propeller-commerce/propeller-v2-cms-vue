<script setup lang="ts">
import { computed } from 'vue';
import type { CmsBlock as CmsBlockShape } from '@propeller-commerce/propeller-v2-core-ui';

export type CmsBlockRenderer = (block: CmsBlockShape) => unknown;

/**
 * Two block shapes flow through here:
 *
 *  - Flat/adapter blocks — `{ type: string, data: ... }` (the generic
 *    `CmsBlock` contract; portable across Strapi / Sanity / Prepr).
 *  - Typed blocks — `{ _type: 'hero-banner', ...fields }` (the discriminated
 *    `CmsTypedBlock` union a `CmsProvider.getPage` returns on a `CmsRichPage`).
 *
 * We accept BOTH so a shop can register brand components keyed by either
 * discriminator. `_type` wins when present (the typed contract), else `type`.
 * The whole block is passed to the renderer as `:block` (typed components read
 * `block.title` etc.); `:data` is also passed for flat blocks that keep their
 * payload under `data`.
 */
type AnyBlock = { type?: string; _type?: string; data?: unknown } & Record<string, unknown>;

const props = withDefaults(
  defineProps<{
    block: CmsBlockShape;
    /**
     * Map from block discriminator (`_type` or `type`) → component (or render
     * function). The consumer registers renderers for the block types its CMS
     * emits; unknown types render nothing in prod, or a debug box when `debug`.
     */
    renderers: Record<string, unknown>;
    /** When true, unknown block types render a visible debug box. */
    debug?: boolean;
  }>(),
  { debug: false }
);

/** Discriminator: prefer the typed `_type`, fall back to the flat `type`. */
const blockType = computed<string>(() => {
  const b = props.block as AnyBlock;
  return b._type ?? b.type ?? '';
});

const renderer = computed(() => props.renderers[blockType.value]);
</script>

<template>
  <component
    :is="renderer"
    v-if="renderer"
    :block="block"
    :data="(block as AnyBlock).data"
  />
  <div
    v-else-if="debug"
    style="
      padding: 0.75rem;
      margin: 0.5rem 0;
      border: 1px dashed #c33;
      background: #fdd;
      color: #900;
      font-family: monospace;
      font-size: 0.85rem;
    "
  >
    Unknown CMS block: <strong>{{ blockType }}</strong>
  </div>
</template>
