# propeller-v2-cms-vue

CMS page renderer + block dispatcher + adapter provider for Propeller Commerce Vue shops.

This package contains the **rendering + provider layer** only. It is adapter-agnostic: you supply a `CmsAdapter` implementation (the framework-agnostic contract from [propeller-v2-core-ui](https://github.com/propeller-commerce/propeller-v2-core-ui)) and this package renders the pages it returns. There is no adapter to install from npm — write one for your CMS, or use the Strapi and Prepr providers already built into the [Propeller Vue boilerplate](https://github.com/propeller-commerce/propeller-v2-vue-boilerplate)'s `frontend/src/lib/cms/providers`.

## What's in the box

- **`<CmsAdapterProvider>`** + **`provideCmsAdapter()`** — wires a `CmsAdapter` instance into the Vue tree.
- **`useCms()`** — reads the adapter from inject (for client islands that need optional CMS access).
- **`<CmsPageRenderer>`** — renders a `CmsPage`'s block list.
- **`<CmsBlock>`** — single-block dispatcher; takes a `renderers` map keyed by `block.type`.

## Install

```bash
npm install @propeller-commerce/propeller-v2-cms-vue @propeller-commerce/propeller-v2-core-ui @propeller-commerce/propeller-sdk-v2
```

## Minimal usage

```vue
<!-- App.vue -->
<script setup lang="ts">
import { CmsAdapterProvider } from '@propeller-commerce/propeller-v2-cms-vue';
import { adapter } from '@/lib/cms'; // your CmsAdapter implementation
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
import { CmsPageRenderer } from '@propeller-commerce/propeller-v2-cms-vue';
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

- [propeller-v2-core-ui](https://github.com/propeller-commerce/propeller-v2-core-ui) — the framework-agnostic `CmsAdapter` contract this package builds on.
- [propeller-v2-vue-ui](https://github.com/propeller-commerce/propeller-v2-vue-ui) — commerce components (cart, checkout, catalog).
