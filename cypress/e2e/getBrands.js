/// <reference types="cypress" />
import { z } from 'zod';

describe('Get brands suite', () => {
  it('GET brands test', () => {
    const schema = z.array(z.object({ id: z.string(), name: z.string(), slug: z.string() }));
    cy.request('GET', '/brands')
      .validateSchemaZod(schema)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});
