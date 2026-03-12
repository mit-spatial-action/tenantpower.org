import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ params, fetch }) => {
    const { lng, lat, n } = params;

    const apiUrl = "/api/v1/props_by_loc/";
    const query = `${apiUrl}?lng=${lng}&lat=${lat}&n=${n}`;
    const response = await fetch(query, {
        headers: {
            'X-API-Key': API_KEY
        }
    });

    if (!response.ok) {
        return new Response(null, { status: response.status });
    }
    const data = await response.json();
    return json(data);
};