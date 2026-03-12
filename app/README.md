# Tenant Power App

The archival Tenant Power tool is a [Svelte](https://github.com/sveltejs/svelte)/[SvelteKit](https://github.com/sveltejs/kit) application [deployed on Netlify](https://tenantpower.netlify.app/). The original tool was built using vanilla HTML/JS/CSS. I ported to a modern web framework for ease of archiving and maintenance.

## Setting Up a Development Environment

The application relies heavily on [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js), which requires a token. It also needs to a pass an authentication credential to the [backend](https://github.com/mit-spatial-action/tenantpower.org/tree/main/backend). These should be stored in a .env file as follows (see also [.env.example](https://github.com/mit-spatial-action/tenantpower.org/tree/main/app/.env.example)):

```sh
PUBLIC_MB_TOKEN=
API_KEY=
```

Once you've installed dependencies with `npm install`, start a development server:

```sh
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.
