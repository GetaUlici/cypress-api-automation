/// <reference types="cypress" />
import { z } from 'zod';

describe('Get categories/tree by id', () => {
  it('GET categories tree by id test', () => {
    let responseId;
    const categoryTreeSchema = z.array(
      z.object({
        id: z.string(),
      })
    );

    const categoryTreeByIdSchema = z.object({
      id: z.string(),
    });

    cy.request('GET', '/categories/tree')
      .validateSchemaZod(categoryTreeSchema)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property('id');
        responseId = response.body[0].id;

        cy.request('GET', `/categories/tree/${responseId}`)
          .validateSchemaZod(categoryTreeByIdSchema)
          .then((getResponse) => {
            expect(getResponse.status).to.eql(200);
            expect(getResponse.body).to.have.property('id');
          });
      });
  });
});
