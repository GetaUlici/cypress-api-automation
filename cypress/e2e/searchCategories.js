/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Post Request', () => {
  const name = faker.company.name();
  const slug = faker.helpers.slugify(name.toLowerCase());
  let responseBody;

  before('', () => {
    cy.request({
      method: 'POST',
      url: '/categories',
      body: {
        name: name,
        slug: slug,
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
      expect(response.body.name).to.eq(name);
      expect(response.body.slug).to.eq(slug);
      responseBody = response.body;
    });
  });

  it('Create a new category via /categories api and perform search after name', () => {
    cy.request({
      method: 'GET',
      url: `/categories/search?q=${name}`,
    }).then((getResponse) => {
      expect(getResponse.status).to.eql(200);
      expect(getResponse.body).to.have.length(1);

      const category = getResponse.body[0];

      expect(category.name).to.eq(name);
      expect(category.slug).to.eq(slug);
    });
  });
});
