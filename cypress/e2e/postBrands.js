/// <reference types="cypress" />

describe('Post Request', () => {
  it('Create a new brand via /brands api', () => {
    const uniqueId = Date.now();

    cy.request({
      method: 'POST',
      url: '/brands',
      body: {
        name: `brand-${uniqueId}`,
        slug: `brand-${uniqueId}`,
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
    });
  });
});
