<script lang="ts">
  import favicon from "$lib/assets/favicon.ico";
  import favicon32 from "$lib/assets/favicon_32x32.png";
  import favicon192 from "$lib/assets/favicon_192x192.png";
  import SvelteSeo from "svelte-seo";
  import "@fontsource-variable/overpass";
  import "@fontsource-variable/overpass-mono";
  import Map from "$lib/components/Map.svelte";
  import type { Config } from "$lib/schemas/instance";

  import { config } from "$lib/config";
  const { title, description, canonical, keywords, images } = config;

  const assetFiles = import.meta.glob('$lib/assets/*.{png,jpg,jpeg,svg}', { 
    eager: true, 
    import: 'default' 
  });

  const resolvedImages = images.map(img => ({
    ...img,
    url: assetFiles[`/src/lib/assets/${img.url}`] 
  })) as Config["images"];

  let kw=keywords.join(",")

  import "$lib/styles/global.scss";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} type="image/x-icon" sizes="16x16" />
  <link rel="icon" href={favicon32} type="image/png" sizes="32x32" />
  <link rel="icon" href={favicon192} type="image/png" sizes="192x192" />
  <link rel="apple-touch-icon" href={favicon192} sizes="192x192" />
</svelte:head>

<SvelteSeo
  {title}
  {description}
  {canonical}
  keywords={kw}
  openGraph={{
    title: title,
    description: description,
    images: resolvedImages,
    url: canonical,
    type: "website",
    site_name: title
  }}
/>

<Map/>
{@render children()}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
