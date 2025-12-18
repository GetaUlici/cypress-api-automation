/// <reference types="cypress" />

describe('Get categories', () => {
  it('GET categories test', () => {
    cy.request('GET', '/categories').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property('id');
    });
  });
});
