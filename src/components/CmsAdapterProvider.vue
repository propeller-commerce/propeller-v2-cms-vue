<script setup lang="ts">
import type { CmsAdapter } from '@propeller-commerce/propeller-v2-core-ui';
import { provideCmsAdapter } from '../composables/cmsAdapter';

const props = defineProps<{
  adapter: CmsAdapter | null;
}>();

provideCmsAdapter(props.adapter);
</script>

<template>
  <slot />
</template>
