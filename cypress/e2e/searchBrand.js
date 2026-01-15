/// <reference types="cypress" />
import { z } from 'zod';

describe('Search Brand by query params', () => {
  it('Create a new brand and search for it by query params', () => {
    const uniqueId = Date.now();
    let brandId;
    let responseBody;
    const requestBody = {
      name: `brand-${uniqueId}`,
      slug: `brand-${uniqueId}`,
    };

    const brandSchema = z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    });

    const searchSchema = z.array(brandSchema);

    cy.request({
      method: 'POST',
      url: '/brands',
      body: requestBody,
    })
      .validateSchemaZod(brandSchema)
      .then((response) => {
        expect(response.status).to.eql(201);
        // Extract the ID from the response body
        brandId = response.body.id;
        responseBody = response.body;
        expect(brandId).to.exist;

        cy.request({
          method: 'GET',
          url: `/brands/search?q=brand-${uniqueId}`,
        })
          .validateSchemaZod(searchSchema)
          .then((getResponse) => {
            expect(getResponse.status).to.eql(200);
            expect(getResponse.body).to.eql([responseBody]);
          });
      });
  });
});
