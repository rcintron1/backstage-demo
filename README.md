# Rolando's Developer Portal (Backstage)

Local Backstage demo for interviews: Software Catalog of laptop projects plus an **iPhone App** software template.

## Prerequisites

- Node.js 22 or 24
- Yarn (Corepack: `corepack enable`)

## Start

```sh
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000) (guest login is enabled).

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:7007`

## Demo walkthrough

### 1. Software Catalog — apps on this laptop

1. Open the Catalog (home page).
2. Filter by system **laptop-apps** (or search for a project name).
3. Open any component — each has a `local.path` annotation pointing at `~/projects/...`.

Catalog data lives in [`examples/laptop-apps/catalog-info.yaml`](examples/laptop-apps/catalog-info.yaml).

### 2. Create an iPhone app (local scaffold)

1. Sidebar → **Create**.
2. Choose **iPhone App**.
3. Enter an app name (e.g. `DemoNotes`), bundle ID, and owner.
4. Run the template.

Output is written to `scaffolded/<AppName>/` (gitignored). The new component is registered in the Catalog automatically via `publish:filesystem`.

### 3. Tech Radar

Sidebar → **Tech Radar** (or open `/tech-radar`).

Classic circular radar with rings **Adopt → Trial → Assess → Hold** (inside → out) and quadrants:

- Languages & Frameworks
- Data Stores
- Infrastructure
- Messaging & Compute

Demo data lives in [`packages/app/src/lib/techRadarData.ts`](packages/app/src/lib/techRadarData.ts).

## Layout

| Path | Purpose |
| --- | --- |
| `examples/laptop-apps/` | Catalog entities for `~/projects` |
| `templates/iphone-app/` | SwiftUI iPhone Software Template |
| `plugins/scaffolder-backend-module-filesystem/` | Local `publish:filesystem` scaffolder action |
| `scaffolded/` | Generated apps from Create (not committed) |

## Notes

- Uses in-memory SQLite and guest auth — fine for demos, not production.
- No GitHub token required for the iPhone template.
- TechDocs generator is set to `local` (Docker is not required).
