<script>
    import { config } from "$lib/config";
    const { canonical } = config;
</script>

# Overview

[Tenant Power]({canonical}) was primarily developed during the summer of 2020 by [Eric Robsky Huntley](https://ericrobskyhuntley.github.io/) with contributions from [Daniel Friedman](https://www.linkedin.com/in/danielfriedman1/) and [Bailey Hu](https://www.linkedin.com/in/bailey-hu/). The [Mutual Aid Medford and Somerville (MAMAS)](https://mutualaidmamas.com/) Housing Justice Working Group was concerned about mounting pressure on tenants and reports of informal evictions despite Massachusetts's statewide moratorium. To understand the scale of operations of landlords in the region (and who owned particular properties of interest), we used off-the-shelf machine learning tools to deduplicate property owners listed in municipal assessors' data. Training datasets and model settings are availble in the Github repository (`/pipelines/dedupe/`).

In our analysis, we used MassGIS's standardized parcel dataset, as well as assessor's data from [Boston](https://www.cityofboston.gov/assessing/search/), [Cambridge](https://www.cambridgema.gov/PropertyDatabase), [Somerville](http://gis.vgsi.com/SomervilleMA/Search.aspx), [Medford](http://gis.vgsi.com/medfordma/), and [Brookline](http://apps.brooklinema.gov/assessors/propertylookup.asp). The tool's underlying database has not been updated since 2021. We encourage you to check [Massachusetts Land Records](http://www.masslandrecords.com/) and/or the assessors databases linked above to confirm ownership.

## Tooling

The application frontend and API were rewritten from the ground up for archiving in February/March 2026---the rewritten frontend is in [Svelte](https://svelte.dev/)/[SvelteKit](https://svelte.dev/docs/kit/introduction) and the API is [FastAPI](https://fastapi.tiangolo.com/). The application was originally built using [Express](https://expressjs.com/)/[Node.js](https://nodejs.org/en/) for the API layer and frontend, and a [PostgreSQL](https://www.postgresql.org/)/[PostGIS](https://postgis.net/) instance. We deduplicated assessors records using [dedupe](https://github.com/dedupeio/dedupe).


## What About `tenantpower.org`?

Great question! I (Eric) made the decision to give away the tool's original domain name in summer 2025 after members of the [Los Angeles Tenants Union (LATU)](https://latenantsunion.org/en/) expressed interest in acquiring it. I had inadvertantly purchased a very useful domain name and could not justify letting an old tool that was gathering more cobwebs by the day park on it. The transfer was completed on August 11, 2025 and the domain now hosts the (very cool) [Tenant Power Toolkit](https://tenantpower.org/) from [Debt Collective](https://debtcollective.org/), [LATU](https://latenantsunion.org/en/), the [Anti-Eviction Mapping Project](https://antievictionmap.com/), the [UCLA Luskin Institute on Inequality and Democracy](https://challengeinequality.luskin.ucla.edu/), and [Movement Legal](https://www.movementlegal.org/).

## Source Code and Contributions

[Source code](https://gitlab.com/ericrobskyhuntley/tenant-power) is available on GitHub, though feature requests and PRs that do anything more than bump versions and fix bugs will be ignored. While I plan to maintain this application in perpetuity, this is more for stability of citation and my own records than anything else.

---

Copyright (c) 2020--2026 Eric Robsky Huntley. Licensed under the [GPlv3](https://www.gnu.org/licenses/gpl-3.0.html).