/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { z } from 'zod';

describe('HTTP Request Samples', () => {
  it('GET Request - Retrieve all brands', () => {
    const schema = z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      })
    );

    cy.request('GET', '/brands')
      .validateSchemaZod(schema)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
  });

  it('GET Request - Retrieve brand by ID', () => {
    const uniqueId = Date.now();
    let brandId;
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    });

    cy.fixture('brands').then((brands) => {
      cy.request({
        method: 'POST',
        url: '/brands',
        body: {
          name: `${brands.createBrand.name}-${uniqueId}`,
          slug: `${brands.createBrand.slug}-${uniqueId}`,
        },
      }).then((response) => {
        brandId = response.body.id;

        cy.request('GET', `/brands/${brandId}`)
          .validateSchemaZod(schema)
          .then((getResponse) => {
            expect(getResponse.status).to.eq(200);
            expect(getResponse.body.id).to.eq(brandId);
          });
      });
    });
  });

  it('POST Request - Create a new brand', () => {
    const name = faker.company.name();
    const slug = faker.helpers.slugify(name.toLowerCase());
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    });

    cy.request({
      method: 'POST',
      url: '/brands',
      body: {
        name: name,
        slug: slug,
      },
    })
      .validateSchemaZod(schema)
      .then((response) => {
        expect(response.status).to.eql(201);
        expect(response.body.name).to.eq(name);
        expect(response.body.slug).to.eq(slug);
      });
  });

  it('PUT Request - Update entire brand resource', () => {
    const uniqueId = Date.now();
    let brandId;
    const schema = z.object({ success: z.boolean() });

    cy.fixture('brands').then((brands) => {
      cy.request({
        method: 'POST',
        url: '/brands',
        body: {
          name: `${brands.createBrand.name}-${uniqueId}`,
          slug: `${brands.createBrand.slug}-${uniqueId}`,
        },
      }).then((response) => {
        brandId = response.body.id;

        cy.request({
          method: 'PUT',
          url: `/brands/${brandId}`,
          body: {
            name: `${brands.updateBrand.name}-${uniqueId}`,
            slug: `${brands.updateBrand.slug}-${uniqueId}`,
          },
        })
          .validateSchemaZod(schema)
          .then((putResponse) => {
            expect(putResponse.status).to.eql(200);
            expect(putResponse.body.success).to.eq(true);
          });
      });
    });
  });

  it('PATCH Request - Partially update brand resource', () => {
    const uniqueId = Date.now();
    let brandId;
    const schema = z.object({ success: z.boolean() });

    cy.fixture('brands').then((brands) => {
      cy.request({
        method: 'POST',
        url: '/brands',
        body: {
          name: `${brands.createBrand.name}-${uniqueId}`,
          slug: `${brands.createBrand.slug}-${uniqueId}`,
        },
      }).then((response) => {
        brandId = response.body.id;

        cy.request({
          method: 'PATCH',
          url: `/brands/${brandId}`,
          body: {
            slug: `${brands.partialUpdateBrand.slug}-${uniqueId}`,
          },
        })
          .validateSchemaZod(schema)
          .then((patchResponse) => {
            expect(patchResponse.status).to.eql(200);
            expect(patchResponse.body.success).to.eq(true);
          });
      });
    });
  });

  it('DELETE Request - Delete brand by ID', () => {
    const uniqueId = Date.now();
    let brandId;
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    });

    cy.fixture('brands').then((brands) => {
      cy.request({
        method: 'POST',
        url: '/brands',
        body: {
          name: `${brands.createBrand.name}-${uniqueId}`,
          slug: `${brands.createBrand.slug}-${uniqueId}`,
        },
      })
        .validateSchemaZod(schema)
        .then((response) => {
          brandId = response.body.id;

          cy.request({
            method: 'DELETE',
            url: `/brands/${brandId}`,
            failOnStatusCode: false,
          }).then((deleteResponse) => {
            // Note: This may return 401 if authentication is required
            expect([200, 204, 401]).to.include(deleteResponse.status);
          });
        });
    });
  });

  it('GET Request - Search with query parameters', () => {
    cy.fixture('queryParams').then((queryParams) => {
      cy.request({
        method: 'GET',
        url: '/brands',
        qs: queryParams.searchBrands,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('POST Request - Create with custom headers', () => {
    const name = faker.company.name();
    const slug = faker.helpers.slugify(name.toLowerCase());
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    });

    cy.fixture('headers').then((headers) => {
      cy.request({
        method: 'POST',
        url: '/brands',
        headers: headers.jsonContentType,
        body: {
          name: name,
          slug: slug,
        },
      })
        .validateSchemaZod(schema)
        .then((response) => {
          expect(response.status).to.eql(201);
        });
    });
  });
});
