/// <reference types="cypress" />
import { z } from 'zod';

describe('Put Brand by ID', () => {
  it('Create a new brand and update it by ID', () => {
    const uniqueId = Date.now();
    let brandId;
    const schema = z.object({ success: z.boolean() });

    cy.request({
      method: 'POST',
      url: '/brands',
      body: {
        name: `brand-${uniqueId}`,
        slug: `brand-${uniqueId}`,
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
      // Extract the ID from the response body
      brandId = response.body.id;
      expect(brandId).to.exist;

      cy.request({
        method: 'PUT',
        url: `/brands/${brandId}`,
        body: {
          name: `brand-${uniqueId}-updated`,
          slug: `brand-${uniqueId}-updated`,
        },
      })
        .validateSchemaZod(schema)
        .then((getResponse) => {
          const responseBody = {
            success: true,
          };
          expect(getResponse.status).to.eql(200);
          expect(getResponse.body).to.eql(responseBody);
        });
    });
  });
});
