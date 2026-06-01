<script setup lang="ts">
import { computed } from 'vue';
import type { CmsBlock as CmsBlockShape } from 'propeller-v2-core-ui';

export type CmsBlockRenderer = (block: CmsBlockShape) => unknown;

const props = withDefaults(
  defineProps<{
    block: CmsBlockShape;
    /**
     * Map from `block.type` → component (or render function). The consumer
     * registers renderers for the block types its CMS emits; unknown types
     * render nothing in prod, or a debug box when `debug` is true.
     */
    renderers: Record<string, unknown>;
    /** When true, unknown block types render a visible debug box. */
    debug?: boolean;
  }>(),
  { debug: false }
);

const renderer = computed(() => props.renderers[props.block.type]);
</script>

<template>
  <component
    :is="renderer"
    v-if="renderer"
    :block="block"
    :data="block.data"
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
    Unknown CMS block: <strong>{{ block.type }}</strong>
  </div>
</template>
