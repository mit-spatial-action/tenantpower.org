import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { loadEnvFile } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadEnvFile()

// pg.defaults.ssl = true;

const { Pool } = pg;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
})

const getPropsByClst = (request, response) => {
    const clst = parseInt(request.params.clst, 10);
    const query = `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
        ) AS geojson
    FROM (
        SELECT p.* FROM props AS p WHERE clst=$1 ORDER BY clst ASC
    ) AS t;`
    pool.query(query, [clst], (error, results) => {
        if (error) {
            console.error(error);
            return response.status(500).send('Internal Server Error');
        }
        response.status(200).json(results.rows[0].geojson);
    })
}

const getPropsByLoc = (request, response) => {
    const lng = parseFloat(request.params.lng)
    const lat = parseFloat(request.params.lat)
    const cnt = parseFloat(request.params.cnt)
    const query = `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
        ) AS geojson
    FROM ( 
        SELECT *, st_distance(ST_Transform(geometry, 2249), ST_Transform(ST_SetSRID(ST_Point($1, $2), 4326), 2249)) as d
        FROM props AS p
        ORDER BY ST_Transform(geometry, 2249) <-> ST_Transform(ST_SetSRID(ST_Point($1, $2), 4326), 2249) LIMIT $3) AS t
    WHERE t.d <= 100;`
    pool.query(query, [lng, lat, cnt], (error, results) => {
        if (error) {
            console.error(error);
            return response.status(500).send('Internal Server Error');
        }
        response.status(200).json(results.rows[0].geojson);
    })
}

export {
    getPropsByClst,
    getPropsByLoc,
}