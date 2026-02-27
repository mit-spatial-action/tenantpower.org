<script>
    import mapboxgl from 'mapbox-gl';
    import { onMount, onDestroy } from 'svelte';

    import { PUBLIC_MB_TOKEN } from '$env/static/public';

    let map;
    let mapContainer;
    let lng, lat, zoom, style;

    lng = -71.224518;
    lat = 42.213995;
    zoom = 9;
    style = "mapbox://styles/mit-spatial-action/cmd4tea3k009701s25hl6hr5y";

    onMount(() => {
        map = new mapboxgl.Map({
        container: mapContainer,
        accessToken: PUBLIC_MB_TOKEN,
        style: style,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
        });
    });

    onDestroy(() => {
        if (map) map.remove();
    });

let initialState = { lng, lat, zoom };
</script>


<div class="map" bind:this={mapContainer}></div>

<style>
  .map {
    position: absolute;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>