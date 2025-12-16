/// <reference types="cypress" />

describe('Add item to cart', () => {
  let cartId;
  let productId;
  before('Get products and store one product id', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.practicesoftwaretesting.com/products',
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array').and.not.be.empty;

      productId = response.body.data[0].id;

      expect(productId).to.exist;
    });
  });

  it('Create a new item via /carts api', () => {
    cy.request({
      method: 'POST',
      url: '/carts',
    }).then((response) => {
      expect(response.status).to.eql(201);
      cartId = response.body.id;
      expect(cartId).to.exist;

      const requestBody = {
        product_id: productId,
        quantity: 1,
      };

      cy.request({
        method: 'POST',
        url: `/carts/${cartId}`,
        body: requestBody,
      }).then((getResponse) => {
        expect(getResponse.status).to.eql(200);
      });
    });
  });
});
