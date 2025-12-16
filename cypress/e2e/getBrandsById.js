/// <reference types="cypress" />

describe('Get Brand by ID', () => {
  it('Create a new brand and retrieve it by ID', () => {
    const uniqueId = Date.now();
    let brandId;

    cy.request({
      method: 'POST',
      url: '/brands',
      body: {
        name: `brand-${uniqueId}`,
        slug: `brand-${uniqueId}`,
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
      // Extract the ID from the response body
      brandId = response.body.id;
      expect(brandId).to.exist;

      // Perform GET request using the retrieved ID
      cy.request({
        method: 'GET',
        url: `/brands/${brandId}`,
      }).then((getResponse) => {
        expect(getResponse.status).to.eql(200);
        expect(getResponse.body.id).to.eql(brandId);
        expect(getResponse.body.name).to.eql(`brand-${uniqueId}`);
      });
    });
  });
});
