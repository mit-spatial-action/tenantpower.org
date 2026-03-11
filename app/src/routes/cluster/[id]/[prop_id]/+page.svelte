<script lang="ts">
    import { appState } from '$lib/state.svelte';
    import PropertyCard from '$lib/components/PropertyCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
    
    $effect(() => {
        if (data.prop) {
            appState.selected = data.prop;
        }
	});
</script>

<PropertyCard feature={data.prop.features[0]} />
