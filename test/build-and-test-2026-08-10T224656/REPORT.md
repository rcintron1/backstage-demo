# Build-and-test report

| Field | Value |
|-------|-------|
| Date | 2026-08-10T224656 |
| Branch | `build-and-test/mcp-chat-templates-20260810` |
| MR / PR | https://github.com/rcintron1/backstage-demo/pull/1 |
| Prompt summary | Chatbot using local MCP (template how-to) + Ollama `qwen2.5:7b-instruct` |
| Overall | PENDING |

## Change brief

- Goal: Add a Backstage chatbot that uses local Ollama (`qwen2.5:7b-instruct`) and a locally run MCP server with guidance on how to use the example Software Templates.
- Surfaces touched: Chat UI/sidebar, local template-help MCP, Ollama provider config.
- Build target: `yarn tsc`, `yarn test`, `yarn start` (web portal).
- Full-function areas to verify: Chat answers template how-tos via MCP; Ollama responds.
- Regression areas: Catalog (laptop-apps), Create / iPhone template, Tech Radar.

## Timeline

1. MR created: 2026-08-10 — https://github.com/rcintron1/backstage-demo/pull/1
2. Baseline completed: 2026-08-10 (this section)
3. Changes applied / build green: pending
4. After-test completed: pending

## Baseline (before)

### Automated suite

- Command: `yarn tsc && yarn test --watchAll=false --passWithNoTests`
- Exit code: 0
- Log: `before/test-output.log`

### Performance

| Metric | Before |
|--------|--------|
| Suite wall seconds | 9.71 |
| Notes | tsc 2.85s + unit tests 6.86s |

Raw: `before/performance.json`

### Screenshots

| Scene | Before |
|-------|--------|
| Catalog | ![before](before/screenshots/01-catalog.png) |
| Create templates | ![before](before/screenshots/02-create.png) |
| Tech Radar | ![before](before/screenshots/03-tech-radar.png) |
| Chat (not present yet) | ![before](before/screenshots/04-chat-missing-or-empty.png) |

### Regression smoke (before)

| Area | Result | Notes |
|------|--------|-------|
| Catalog laptop-apps components | PASS | API returned 20 components |
| Templates registered | PASS | `example-nodejs-template`, `iphone-app` |
| Tech Radar page loads | PASS | `/tech-radar` reachable after guest login |
| Chat page | N/A | `/mcp-chat` not implemented yet |
