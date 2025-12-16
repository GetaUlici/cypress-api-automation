/// <reference types="cypress" />

describe('Search Brand by query params', () => {
  it('Create a new brand and search for it by query params', () => {
    const uniqueId = Date.now();
    let brandId;
    let responseBody;
    const requestBody = {
      name: `brand-${uniqueId}`,
      slug: `brand-${uniqueId}`,
    };

    cy.request({
      method: 'POST',
      url: '/brands',
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eql(201);
      // Extract the ID from the response body
      brandId = response.body.id;
      responseBody = response.body;
      expect(brandId).to.exist;

      cy.request({
        method: 'GET',
        url: `/brands/search?q=brand-${uniqueId}`,
      }).then((getResponse) => {
        expect(getResponse.status).to.eql(200);
        expect(getResponse.body).to.eql([responseBody]);
      });
    });
  });
});
