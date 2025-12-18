/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Post Request', () => {
  it('Create a new brand via /brands api', () => {
    const name = faker.company.name();
    const slug = faker.helpers.slugify(name.toLowerCase());

    cy.request({
      method: 'POST',
      url: '/brands',
      body: {
        name: name,
        slug: slug,
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
      expect(response.body.name).to.eq(name);
      expect(response.body.slug).to.eq(slug);
    });
  });
});
