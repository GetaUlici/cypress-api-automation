# Cypress API Automation 🧪

A Cypress-based **API automation project** targeting the public Practice Software Testing API:

```
https://api.practicesoftwaretesting.com
```

This repository contains comprehensive API tests covering multiple endpoints including Brands, Categories, Carts, and User management with authentication support.

---

## 🚀 Tech Stack

- **Cypress** – API testing via `cy.request`
- **Zod** – Schema validation for API responses (via `cypress-schema-validator`)
- **Faker.js** – Test data generation
- **Prettier** – Code formatting
- **Node.js** – JavaScript runtime (v18+ recommended)
- **npm** – Dependency management

---

## 📦 Setup

### Prerequisites

- Node.js **18+**
- npm (bundled with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## ▶️ Running the Tests

### Open Cypress Test Runner (GUI)

```bash
npm run test:headed
# or
npx cypress open
```

### Run All Tests Headlessly

```bash
npm run test:headless
# or
npx cypress run
```

### Run a Single Spec File

```bash
npx cypress run --spec cypress/e2e/getBrands.js
```

### Format Code

```bash
npm run format
```

---

## 🗂️ Project Structure

```text
cypress/
├── e2e/                    # API test specifications
│   ├── getBrands.js
│   ├── getBrandsById.js
│   ├── postBrands.js
│   ├── patchBrandsById.js
│   ├── updateBrandById.js
│   ├── deleteBrandsById.js
│   ├── searchBrand.js
│   ├── getCategories.js
│   ├── getCategoriesByTree.js
│   ├── getCategoriesTreeById.js
│   ├── postCategories.js
│   ├── searchCategories.js
│   ├── updateCategoryById.js
│   ├── postCart.js
│   ├── getCartById.js
│   ├── postCartById.js
│   ├── updateCartById.js
│   └── postUserWithAuthentication.js
├── fixtures/               # Test data fixtures
├── screenshots/            # Test failure screenshots
├── support/
│   ├── commands.js        # Custom Cypress commands (schema validation)
│   └── e2e.js
cypress.config.js           # Cypress configuration
package.json
```

---

## 📋 Test Coverage Overview

### Brands API

| Spec File             | Description                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `getBrands.js`        | Validates `GET /brands` returns **200 OK** with array of brands                                       |
| `getBrandsById.js`    | Creates a brand, then validates `GET /brands/{id}` returns **200** and matches `id` and `name`        |
| `postBrands.js`       | Creates a unique brand via `POST /brands`, expects **201 Created**                                    |
| `patchBrandsById.js`  | Creates then updates a brand slug using `PATCH /brands/{id}`, expects **200** and `{ success: true }` |
| `updateBrandById.js`  | Creates then fully updates a brand using `PUT /brands/{id}`, expects **200** and `{ success: true }`  |
| `deleteBrandsById.js` | Attempts to delete a brand **without authentication**, expects **401 Unauthorized**                   |
| `searchBrand.js`      | Creates a brand and searches for it via `GET /brands/search?q={query}`, expects **200**               |

### Categories API

| Spec File                  | Description                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| `getCategories.js`         | Validates `GET /categories` returns **200 OK** with array of categories                        |
| `getCategoriesByTree.js`   | Validates `GET /categories/tree` returns **200 OK**                                            |
| `getCategoriesTreeById.js` | Validates `GET /categories/tree/{id}` returns **200 OK**                                       |
| `postCategories.js`        | Creates a unique category via `POST /categories`, expects **201 Created**                      |
| `searchCategories.js`      | Creates a category and searches for it via `GET /categories/search?q={query}`, expects **200** |
| `updateCategoryById.js`    | Creates then updates a category using `PUT /categories/{id}`, expects **200**                  |

### Cart API

| Spec File           | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| `postCart.js`       | Creates a new cart via `POST /carts`, expects **201 Created**             |
| `getCartById.js`    | Creates a cart and retrieves it via `GET /carts/{id}`, expects **200 OK** |
| `postCartById.js`   | Creates a cart and adds items via `POST /carts/{id}`, expects **200 OK**  |
| `updateCartById.js` | Creates a cart and updates it via `PUT /carts/{id}`, expects **200 OK**   |

### Users API

| Spec File                       | Description                                                                                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `postUserWithAuthentication.js` | Complete user flow: registers user via `POST /users/register`, logs in via `POST /users/login`, then retrieves user info via `GET /users/me` with Bearer token authentication |

---

## ⚙️ Configuration Notes

- `baseUrl` is configured in `cypress.config.js` as `https://api.practicesoftwaretesting.com`, allowing requests to use **relative paths only**
- Tests rely on `cy.request()` for API interactions
- **Schema validation** is implemented using **Zod** via the `cypress-schema-validator` plugin
- Test data is generated using **Faker.js** to ensure uniqueness and realistic values
- Brand names and slugs are generated using `Date.now()` or Faker.js to avoid collisions
- **Authentication** is supported via Bearer tokens in request headers

---

## 🔧 Custom Commands

The project uses custom Cypress commands for schema validation:

- `.validateSchemaZod(schema)` – Validates API responses against Zod schemas

Example usage:

```javascript
cy.request('GET', '/brands')
  .validateSchemaZod(brandSchema)
  .then((response) => {
    expect(response.status).to.eq(200);
  });
```

---

## ✅ Implemented Features

- ✅ **Schema validation** using Zod
- ✅ **Authentication support** (Bearer tokens)
- ✅ **Test data generation** with Faker.js
- ✅ **Custom commands** for reusable validation
- ✅ **Comprehensive test coverage** across multiple API endpoints
- ✅ **Code formatting** with Prettier

---

## 🔮 Future Improvements

- 🧹 Implement test data cleanup (hooks or fixtures)
- 📊 Add reporting (JUnit / Mochawesome)
- 🔄 Improve test organization and reusability
- 📝 Add more comprehensive error handling tests
- 🎯 Add performance/load testing capabilities

---

## 📌 Disclaimer

This project is for **learning and demonstration purposes** and is not intended for production use.
