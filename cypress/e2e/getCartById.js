/// <reference types="cypress" />
import { z } from 'zod';

describe('Get Cart By ID test', () => {
  let cartId;
  let productId;

  it('Create a new item via /carts api', () => {
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
        cartId = response.body.id;
        expect(cartId).to.exist;

        cy.request({
          method: 'GET',
          url: `/carts/${cartId}`,
        })
          .validateSchemaZod(cartSchema)
          .then((getResponse) => {
            expect(getResponse.status).to.eql(200);
            expect(getResponse.body).to.have.property('id');
            expect(getResponse.body.id).to.eql(cartId);
          });
      });
  });
});
