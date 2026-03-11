<script lang="ts">
	import type { PageProps } from './$types';
    import { appState } from '$lib/state.svelte';
    import { fly } from 'svelte/transition';
    import type { FeatureCollection } from 'geojson';

	let { data }: PageProps = $props();

    $effect(() => {
		appState.selected = data as FeatureCollection;
	});
    const prop = $derived(data?.features[0]?.properties ?? null);

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });
    const muniExpand = (abb:string): string => {
        const towns: Record<string, string> = {
            som: "Somerville",
            bos: "Boston",
            med: "Medford",
            brk: "Brookline",
            cam: "Cambridge"
        };
        return `${towns[abb] ?? "unknown"}, MA`
    }
</script>

{#if prop}
<div transition:fly={{ x: -200, duration: 200 }} class="bordered box mx-2 mt-2">
    <div class="block">
        <h2 class="title is-3">{prop.prop_addr}</h2>
        <h3 class="subtitle is-4">{muniExpand(prop.town)}</h3>
        <div class="field is-grouped is-grouped-multiline">
            {#if prop.year}
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag has-text-weight-bold">Year</span>
                    <span class="tag">{prop.year}</span>
                </div>
            </div>
            {/if}
            {#if prop.ass_val}
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag has-text-weight-bold">Value</span>
                    <span class="tag">{USDollar.format(prop.ass_val)}</span>
                </div>
            </div>
            {/if}
            {#if prop.sale_p}
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag has-text-weight-bold">Sale Price</span>
                    <span class="tag">{USDollar.format(prop.sale_p)}</span>
                </div>
            </div>
            {/if}
            {#if prop.sale_d}
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag has-text-weight-bold">Sale Date</span>
                    <span class="tag">{new Date(prop.sale_d).toLocaleDateString("en-US")}</span>
                </div>
            </div>
            {/if}
            <span class="tag is-primary has-text-weight-bold">
                <a href="" class="has-text-white">What's Nearby?</a>
            </span>
        </div>
    </div>
    {#if prop.own}
        <h4 class="title is-4">Owner</h4>
        <div class="box">
            <div class="block">
            <p class="has-text-weight-bold">{prop.own}</p>
            {#if prop.own_city}
                <p>{prop.own_city}{#if prop.own_state}, {prop.own_state}{/if}</p>
            {/if}
            </div>
            {#if prop.count > 1}
            <div class="field is-grouped is-grouped-multiline">
                <div class="control">
                    <div class="tags has-addons">
                        <span class="tag has-text-weight-bold">Other Properties</span>
                        <span class="tag">{prop.count - 1}</span>
                    </div>
                </div>
                <span class="tag is-primary has-text-weight-bold">
                    <a href="" class="has-text-white">What Else Do They Own?</a>
                </span>
            </div>
            {/if}
        </div>
    {/if}
</div>
{/if}