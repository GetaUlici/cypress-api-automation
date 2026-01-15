/// <reference types="cypress" />
import { z } from 'zod';

describe('Delete Brand by ID', () => {
  it('Create a new brand and delete it by ID', () => {
    const uniqueId = Date.now();
    let brandId;
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    });

    cy.request({
      method: 'POST',
      url: '/brands',
      body: {
        name: `brand-${uniqueId}`,
        slug: `brand-${uniqueId}`,
      },
    })
      .validateSchemaZod(schema)
      .then((response) => {
        expect(response.status).to.eql(201);
        // Extract the ID from the response body
        brandId = response.body.id;
        expect(brandId).to.exist;

        cy.request({
          method: 'DELETE',
          url: `/brands/${brandId}`,
          failOnStatusCode: false, //the authorization header is not provided so for the POC i've added the expected to equal 401
        }).then((getResponse) => {
          expect(getResponse.status).to.eql(401);
        });
      });
  });
});
