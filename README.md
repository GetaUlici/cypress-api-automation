# Cypress API Automation 🧪

A Cypress-based **API automation project** targeting the public Practice Software Testing API:

```
https://api.practicesoftwaretesting.com
```

This repository is a **work in progress** and serves as a proof of concept (POC) for testing REST APIs using Cypress.

---

## 🚀 Tech Stack

* **Cypress** – API testing via `cy.request`
* **Node.js** – JavaScript runtime (v18+ recommended)
* **npm** – Dependency management

---

## 📦 Setup

### Prerequisites

* Node.js **18+**
* npm (bundled with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## ▶️ Running the Tests

### Open Cypress Test Runner (GUI)

```bash
npx cypress open
```

### Run All Tests Headlessly

```bash
npx cypress run
```

### Run a Single Spec File

```bash
npx cypress run --spec cypress/e2e/getBrands.js
```

> Adjust the spec path as needed.

---

## 🗂️ Project Structure

```text
cypress/
├── e2e/                 # API test specifications
│   ├── getBrands.js
│   ├── getBrandsById.js
│   ├── postBrands.js
│   ├── patchBrandsById.js
│   ├── updateBrandById.js
│   └── deleteBrandsById.js
├── support/
│   └── e2e.js
cypress.config.js        # Cypress configuration
package.json
```

### Test Coverage Overview

| Spec File             | Description                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `getBrands.js`        | Validates `GET /brands` returns **200 OK**                                                            |
| `getBrandsById.js`    | Creates a brand, then validates `GET /brands/{id}` returns **200** and matches `id` and `name`        |
| `postBrands.js`       | Creates a unique brand via `POST /brands`, expects **201 Created**                                    |
| `patchBrandsById.js`  | Creates then updates a brand slug using `PATCH /brands/{id}`, expects **200** and `{ success: true }` |
| `updateBrandById.js`  | Creates then fully updates a brand using `PUT /brands/{id}`, expects **200** and `{ success: true }`  |
| `deleteBrandsById.js` | Attempts to delete a brand **without authentication**, expects **401 Unauthorized**                   |

---

## ⚙️ Configuration Notes

* `baseUrl` is configured in `cypress.config.js`, allowing requests to use **relative paths only**
* Tests rely on `cy.request()` for API interactions
* Brand names and slugs are generated using `Date.now()` to avoid collisions

---

## ℹ️ Known Limitations

* No authentication handling yet
* Test data is not cleaned up after execution
* Schema validation is minimal

These constraints are intentional for this POC.

---

## 🔮 Future Improvements

* ✅ Add authentication support (tokens / headers)
* 🧹 Implement test data cleanup (hooks or fixtures)
* 📐 Add schema validation (e.g., JSON Schema)
* 🔁 Improve reusability with custom commands
* 📊 Add reporting (JUnit / Mochawesome)

---

## 📌 Disclaimer

This project is for **learning and demonstration purposes** and is not intended for production use.

