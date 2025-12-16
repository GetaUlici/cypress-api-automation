# Cypress API Automation

Cypress-based API test suite targeting `https://api.practicesoftwaretesting.com`.

## Setup
- Prereqs: Node.js 18+ recommended.
- Install deps: `npm install`

## Running
- Open Cypress GUI: `npx cypress open`
- Run headless (all specs): `npx cypress run`
- Run a single spec: `npx cypress run --spec cypress/e2e/getBrands.js` (adjust path as needed)

## Project Structure
- `cypress.config.js` – Cypress config; `baseUrl` set to the Practice Software Testing API.
- `cypress/e2e/` – API specs:
  - `getBrands.js` – GET `/brands` returns 200.
  - `getBrandsById.js` – POST creates a brand, then GET `/brands/{id}` returns 200 and matches name/id.
  - `postBrands.js` – POST `/brands` creates a unique brand, expects 201.
  - `patchBrandsById.js` – POST then PATCH `/brands/{id}` updates slug, expects 200 and `{ success: true }`.
  - `updateBrandById.js` – POST then PUT `/brands/{id}` updates name/slug, expects 200 and `{ success: true }`.
  - `deleteBrandsById.js` – POST then DELETE `/brands/{id}` without auth, expects 401 (no auth header).
- `cypress/support/` – Default Cypress support files (`commands.js`, `e2e.js`).

## Notes
- Tests use `cy.request` with `baseUrl`, so only path segments are specified.
- IDs are generated via `Date.now()` to avoid collisions.
- Delete spec expects 401 because no authorization header is provided (kept intentional for this POC).

## Future Improvements
- Add auth handling and positive DELETE coverage.
- Add data cleanup hooks/fixtures.
- Extend assertions on response bodies/schemas.