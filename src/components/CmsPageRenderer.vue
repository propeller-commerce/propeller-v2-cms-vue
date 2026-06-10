<script setup lang="ts">
import type { CmsPage } from '@propeller-commerce/propeller-v2-core-ui';
import CmsBlock from './CmsBlock.vue';

withDefaults(
  defineProps<{
    page: CmsPage;
    /** Block-type → component map. See <CmsBlock>. */
    renderers: Record<string, unknown>;
    /** Show debug boxes for unknown block types. */
    debug?: boolean;
    /** Optional wrapper class. */
    wrapperClass?: string;
  }>(),
  { debug: false }
);
</script>

<template>
  <div :class="wrapperClass" :data-cms-page-id="String(page.id)">
    <CmsBlock
      v-for="(block, i) in page.blocks"
      :key="`${block.type}-${i}`"
      :block="block"
      :renderers="renderers"
      :debug="debug"
    />
  </div>
</template>
