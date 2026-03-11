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
        "cluster": {
            type: "FeatureCollection",
            features: results.features.filter((r) => String(r.id) !== prop_id)
        },
        "prop": {
            type: "FeatureCollection",
            features: results.features.filter((r) => String(r.id) === prop_id)
        }
    };
};