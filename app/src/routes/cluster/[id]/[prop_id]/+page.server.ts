import type { PageServerLoad } from './$types';
import { API_KEY } from '$env/static/private';
import type { Feature, FeatureCollection } from 'geojson';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const { id, prop_id } = params;
    const response = await fetch(`/api/v1/clusters/${id}`, {
        headers: {
            'X-API-Key': `${API_KEY}`
        }
    });

    if (!response.ok) return null;
    const results = await response.json() as FeatureCollection;

    return {
        type: "FeatureCollection",
        features: results.features.map((feature) => ({
            ...feature,
            properties: {
                ...feature.properties,
                selected: String(feature.id) === prop_id
            }
        }))
        .sort((a, b) => +b.properties.selected - +a.properties.selected)
    };
};