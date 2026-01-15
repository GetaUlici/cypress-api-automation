/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { z } from 'zod';

describe('Post Request', () => {
  it('Create a new category via /categories api', () => {
    const name = faker.company.name();
    const slug = faker.helpers.slugify(name.toLowerCase());

    const categorySchema = z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    });

    cy.request({
      method: 'POST',
      url: '/categories',
      body: {
        name: name,
        slug: slug,
      },
    })
      .validateSchemaZod(categorySchema)
      .then((response) => {
        expect(response.status).to.eql(201);
        expect(response.body.name).to.eq(name);
        expect(response.body.slug).to.eq(slug);
      });
  });
});
