<script>
    import mapboxgl from 'mapbox-gl';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import { onMount, onDestroy } from 'svelte';

    import 'mapbox-gl/dist/mapbox-gl.css';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

    import { PUBLIC_MB_TOKEN } from '$env/static/public';

    let map;
    let mapContainer;
    let lng, lat, zoom, style;

    lng = -71.224518;
    lat = 42.213995;
    zoom = 9;
    style = "mapbox://styles/mit-spatial-action/cmd4tea3k009701s25hl6hr5y";

    let initialState = { lng, lat, zoom, style };

    onMount(() => {
        map = new mapboxgl.Map({
            container: mapContainer,
            accessToken: PUBLIC_MB_TOKEN,
            style: initialState.style,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });

        map.addControl(
            new MapboxGeocoder({
                accessToken: PUBLIC_MB_TOKEN,
                useBrowserFocus: true,
                mapboxgl: mapboxgl
            })
        );
    });

    onDestroy(() => {
        if (map) map.remove();
    });
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