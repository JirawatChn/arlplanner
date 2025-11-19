# ARL Planner - Airport Rail Link Passenger Density Prediction System

ARL Planner is a React + TypeScript web application that helps Airport Rail Link passengers plan their trips with hourly passenger density forecasts for every station. The UI is primarily Thai-first but mixes English helper text, supports both desktop and mobile screens, and is ready for deployment to GitHub Pages with an `/arlplanner` base path.

## Project Overview
- Display prediction results from the backend model through REST endpoints defined in `src/api/predictions.tsx`
- Provide interactive forms for selecting station, date, and time and visualize the results with color-coded density levels and fallback states when no data is returned
- Offer a full-day overview, low-density slot suggestions, an embedded Looker Studio dashboard, and an admin tool for triggering three-day forecasts
- Share UI building blocks (`TopNavigation`, `StationLine`, shadcn/ui components) across every page to keep the experience consistent

## Key Features
- **Interactive prediction** - `PredictionSettings` collects station/date/time input and calls `fetchPredictions`; results are rendered inside `DensityForecast` with Thai labels and density badges ranging from "low" to "very high"
- **Low-density recommendations** - The extra button on `/predict` uses `fetchRecommendation` to fetch and sort the three quietest hours for the selected station
- **Full-day overview** - `/overview` uses `OverviewSettings` and `fetchOverview` to fetch every hour of the selected day and display it alongside the Airport Rail Link station line map
- **Looker Studio dashboard** - `/dashboard` embeds a Google Looker Studio report for historical KPIs and operational monitoring beyond the interactive forecast blocks
- **Admin three-day trigger** - `/admin` exposes a simple button that calls `threedaysPrediction` and prints the JSON payload so operators can verify batch runs or data quality checks

## Tech Stack
- React 18 + TypeScript + Vite
- React Router DOM 6 with `basename=/arlplanner`
- Tailwind CSS + shadcn/ui + Radix UI + Lucide icons
- Axios for REST calls to a FastAPI (or compatible) backend
- dayjs, date-fns, and local utilities for Thai date/time formatting
- ESLint + TypeScript for linting and type safety
- gh-pages for GitHub Pages deployment

## Project Structure
```text
.
|- public/
|- src/
|  |- api/
|  |  |- predictions.tsx
|  |- components/
|  |  |- DensityForecast.tsx
|  |  |- PredictionSettings.tsx
|  |  |- OverviewSettings.tsx
|  |  |- StationLine.tsx
|  |  |- TopNavigation.tsx
|  |- data/
|  |  |- stations.tsx
|  |- pages/
|  |  |- Dashboard.tsx
|  |  |- Home.tsx
|  |  |- Overview.tsx
|  |  |- Predict.tsx
|  |  |- ThreeDaysPredict.tsx
|  |- utils/
|  |  |- date.tsx
|  |  |- time.tsx
|  |- main.tsx
|- package.json
|- vite.config.ts
|- README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ (npm 10+ recommended)
- Backend REST API that exposes `/api/predict/*` endpoints (default base URL is `http://localhost:8000/`)
- Git or another source control tool

### Installation
1. Clone or download the repository and open the `arlplanner` folder
2. Install dependencies with `npm install`
3. Start the dev server with `npm run dev` and open `http://localhost:5173/arlplanner`
4. Build production assets with `npm run build` to generate the `dist` folder

### Common Scripts
- `npm run dev` - start Vite with HMR
- `npm run build` - produce optimized assets in `dist`
- `npm run preview` - serve the build output locally
- `npm run lint` - run ESLint across the project
- `npm run deploy` - build and publish `dist` to GitHub Pages via `gh-pages`

## API & Base Path Configuration
Update the backend host in `src/api/predictions.tsx`:

```ts
const API_URL = "http://localhost:8000/";
```

Ensure the backend exposes `api/predict/predictions`, `api/predict/recommendation`, `api/predict/overview`, and `api/predict/3days`. Adjust `API_URL` for staging/production hosts as needed.

Routing uses a base path inside `src/App.tsx`:

```ts
const router = createBrowserRouter(routes, {
  basename: "/arlplanner",
});
```

If you deploy to the domain root, change both the router `basename` and the `homepage` field inside `package.json`.

## Pages & Workflows
- **Home (`/`)** - highlight the project, logo, CTA buttons, and key feature blocks
- **Predict (`/predict`)** - choose station/date/time, run `fetchPredictions`, visualize the hourly density, or request low-density recommendations
- **Overview (`/overview`)** - pick a station and date to fetch an entire day via `fetchOverview`; the page auto-loads today's data on mount
- **Dashboard (`/dashboard`)** - embedded Looker Studio iframe for KPI tracking
- **Admin (`/admin`)** - trigger the three-day prediction job and inspect the raw JSON response

## GitHub Pages Deployment
1. Confirm `homepage` in `package.json` and the router `basename` both match your GitHub Pages URL (e.g., `jirawatchn.github.io/arlplanner`)
2. Run `npm run deploy` to build and push `dist` to the `gh-pages` branch
3. Enable GitHub Pages on the repository and point it at the `gh-pages` branch generated by the script

## Development Notes
- Run `npm run lint` before committing to satisfy ESLint + TypeScript rules
- When adding new API integrations, keep them inside `src/api/predictions.tsx` and propagate status flags (`idle | success | error | no-data`) so UI states remain consistent
- Test every page on desktop and mobile widths to confirm shadcn/ui components respond correctly and the navigation collapses into the mobile menu without layout shifts
