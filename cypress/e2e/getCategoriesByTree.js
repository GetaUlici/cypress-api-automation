/// <reference types="cypress" />

describe('Get categories by tree', () => {
  it('GET categories tree test', () => {
    cy.request('GET', '/categories/tree').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property('id');
    });
  });
});
