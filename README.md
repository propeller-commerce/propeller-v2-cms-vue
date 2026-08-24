# propeller-v2-cms-vue

CMS page renderer + block dispatcher + adapter provider for Propeller Commerce Vue shops.

This package contains the **rendering + provider layer**. The actual CMS adapter (Strapi, Sanity, etc.) ships as a separate `propeller-v2-cms-adapter-*` package, which you install alongside this one.

## What's in the box

- **`<CmsAdapterProvider>`** + **`provideCmsAdapter()`** — wires a `CmsAdapter` instance into the Vue tree.
- **`useCms()`** — reads the adapter from inject (for client islands that need optional CMS access).
- **`<CmsPageRenderer>`** — renders a `CmsPage`'s block list.
- **`<CmsBlock>`** — single-block dispatcher; takes a `renderers` map keyed by `block.type`.

## Minimal usage

```vue
<!-- App.vue -->
<script setup lang="ts">
import { CmsAdapterProvider } from 'propeller-v2-cms-vue';
import { createStrapiAdapter } from 'propeller-v2-cms-adapter-strapi';

const adapter = createStrapiAdapter({ endpoint: import.meta.env.VITE_CMS_URL });
</script>

<template>
  <CmsAdapterProvider :adapter="adapter">
    <RouterView />
  </CmsAdapterProvider>
</template>
```

```vue
<!-- A page -->
<script setup lang="ts">
import { CmsPageRenderer } from 'propeller-v2-cms-vue';
import HeroBlock from '@/components/HeroBlock.vue';
import TextBlock from '@/components/TextBlock.vue';

defineProps<{ page: CmsPage }>();

const renderers = { hero: HeroBlock, text: TextBlock };
</script>

<template>
  <CmsPageRenderer :page="page" :renderers="renderers" />
</template>
```

Block components are the shop's responsibility — this package ships no opinionated blocks because shop styling, layout, and content shape vary too much to share. Register whatever your CMS emits.

## Pair with

- [propeller-v2-core-ui](https://gitlab.com/propellor-eu/cloud/frontend/ui/propeller-v2-core-ui) — the framework-agnostic `CmsAdapter` contract this package builds on.
- [propeller-v2-cms-adapter-strapi](https://gitlab.com/propellor-eu/cloud/frontend/ui/propeller-v2-cms-adapter-strapi) — Strapi REST adapter.
- [propeller-v2-vue-ui](https://gitlab.com/propellor-eu/cloud/frontend/ui/propeller-v2-vue-ui) — commerce components (cart, checkout, catalog).
