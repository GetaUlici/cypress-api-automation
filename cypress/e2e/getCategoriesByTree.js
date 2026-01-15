/// <reference types="cypress" />
import { z } from 'zod';

describe('Get categories by tree', () => {
  it('GET categories tree test', () => {
    const categoryTreeSchema = z.array(
      z.object({
        id: z.string(),
      })
    );

    cy.request('GET', '/categories/tree')
      .validateSchemaZod(categoryTreeSchema)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property('id');
      });
  });
});
