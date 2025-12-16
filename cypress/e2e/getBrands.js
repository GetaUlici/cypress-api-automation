/// <reference types="cypress" />

describe('Get brands suite', () => {
  it('GET brands test', () => {
    cy.request('GET', '/brands').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
