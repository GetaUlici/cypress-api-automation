/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Post Request', () => {
  it('Create a new category via /categories api', () => {
    const name = faker.company.name();
    const slug = faker.helpers.slugify(name.toLowerCase());

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

      let catId = response.body.id;
      cy.log(catId);

      cy.request({
        method: 'PUT',
        url: `/categories/${catId}`,
        body: {
          name: `${name}-new`,
          slug: `${slug}-new`,
        },
      }).then((response) => {
        let responseBody = {
          success: true,
        };
        expect(response.status).to.eql(200);
        expect(response.body).to.eql(responseBody);
      });
    });
  });
});
