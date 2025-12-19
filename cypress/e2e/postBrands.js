/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { z } from 'zod';

describe('Post Request', () => {
  it('Create a new brand via /brands api', () => {
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
});
