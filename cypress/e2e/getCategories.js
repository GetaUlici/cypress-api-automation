/// <reference types="cypress" />
import { z } from 'zod';

describe('Get categories', () => {
  it('GET categories test', () => {
    const schema = z.array(
      z.union([
        z.object({
          id: z.string(),
          name: z.string(),
          slug: z.string(),
          parent_id: z.null(),
        }),
        z.object({
          id: z.string(),
          name: z.string(),
          slug: z.string(),
          parent_id: z.string(),
        }),
      ])
    );

    cy.request('GET', '/categories')
      .validateSchemaZod(schema)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property('id');
      });
  });
});
