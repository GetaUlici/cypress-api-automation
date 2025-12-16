/// <reference types="cypress" />

describe('Post Cart', () => {
  it('Create a new cart via /carts api', () => {
    cy.request({
      method: 'POST',
      url: '/carts',
    }).then((response) => {
      expect(response.status).to.eql(201);
    });
  });
});
