import os
import json
from typing import Annotated
from fastapi import FastAPI, Response, Path, Query
import asyncpg

app = FastAPI(root_path="/tenantpower")

DB_CONFIG=f"postgresql://{os.getenv("DB_USER")}:{os.getenv("DB_PASS")}@{os.getenv("DB_HOST")}:{os.getenv("DB_PORT")}/{os.getenv("DB_NAME")}"

@app.get("/props/{id}")
async def get_props(
    id: Annotated[int, Path(title="The ID of the cluster to filter by")]
):
    conn = await asyncpg.connect(DB_CONFIG)
    try:
        query = """
            SELECT jsonb_build_object(
                'type', 'FeatureCollection',
                'features', jsonb_agg(features)
            )
            FROM (
                SELECT jsonb_build_object(
                    'type',       'Feature',
                    'id',         id,
                    'geometry',   ST_AsGeoJSON(geometry)::jsonb,
                    'properties', to_jsonb(row) - 'geometry'
                ) AS feature
                FROM (
                    SELECT * FROM props 
                    WHERE clst = $1 
                    ORDER BY clst ASC
                ) row
            ) features;
        """
        result = await conn.fetchval(query, id)
        if not result:
            return {"type": "FeatureCollection", "features": []}
        
        return Response(content=result, media_type="application/json")
    
    finally:
        await conn.close()

@app.get("/props_by_loc/")
async def get_props_by_loc(
    lat: Annotated[float, Query(gt=-90, lt=90)],
    lng: Annotated[float, Query(gt=-180, lt=180)],
    n: Annotated[int, Query(gt=0)]
):
    conn = await asyncpg.connect(DB_CONFIG)
    try:
        query = """
            SELECT jsonb_build_object(
                'type', 'FeatureCollection',
                'features', jsonb_agg(ST_AsGeoJSON(t.*)::jsonb)
            )
            FROM ( 
                SELECT *
                FROM props
                WHERE ST_DWithin(
                    ST_Transform(geometry, 2249),
                    ST_Transform(ST_SetSRID(ST_Point($1, $2), 4326), 2249),
                    100
                )
                ORDER BY ST_Transform(geometry, 2249) <-> ST_Transform(ST_SetSRID(ST_Point($1, $2), 4326), 2249)
                LIMIT $3
            ) AS t;
        """
        result = await conn.fetchval(query, lng, lat, n)
        if not result:
            return {"type": "FeatureCollection", "features": []}
        
        return Response(content=result, media_type="application/json")
    
    finally:
        await conn.close()