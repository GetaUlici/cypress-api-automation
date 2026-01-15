/// <reference types="cypress" />
import { z } from 'zod';

describe('Post Cart', () => {
  it('Create a new cart via /carts api', () => {
    const cartSchema = z.object({
      id: z.string(),
    });

    cy.request({
      method: 'POST',
      url: '/carts',
    })
      .validateSchemaZod(cartSchema)
      .then((response) => {
        expect(response.status).to.eql(201);
      });
  });
});
