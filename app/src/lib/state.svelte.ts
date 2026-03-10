import type { FeatureCollection } from 'geojson';

class AppState {
    selected = $state<FeatureCollection | null>(null);
}

export const appState: AppState = $state({
    loading: true,
    selected: null
});