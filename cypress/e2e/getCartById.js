/// <reference types="cypress" />

describe('Get Cart By ID test', () => {
  let cartId;
  let productId;

  it('Create a new item via /carts api', () => {
    cy.request({
      method: 'POST',
      url: '/carts',
    }).then((response) => {
      expect(response.status).to.eql(201);
      cartId = response.body.id;
      expect(cartId).to.exist;

      cy.request({
        method: 'GET',
        url: `/carts/${cartId}`,
      }).then((getResponse) => {
        expect(getResponse.status).to.eql(200);
        expect(response.body).to.have.property('id');
        expect(response.body.id).to.eql(cartId);
      });
    });
  });
});
