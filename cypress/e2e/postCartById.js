/// <reference types="cypress" />
import { z } from 'zod';

describe('Add item to cart', () => {
  let cartId;
  let productId;
  before('Get products and store one product id', () => {
    const schema = z.object({
      current_page: z.number(),
      data: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          price: z.number(),
          is_location_offer: z.boolean(),
          is_rental: z.boolean(),
          co2_rating: z.string(),
          in_stock: z.boolean(),
          is_eco_friendly: z.boolean(),
          product_image: z.object({
            id: z.string(),
            by_name: z.string(),
            by_url: z.string(),
            source_name: z.string(),
            source_url: z.string(),
            file_name: z.string(),
            title: z.string(),
          }),
          category: z.object({
            id: z.string(),
            name: z.string(),
            slug: z.string(),
          }),
          brand: z.object({ id: z.string(), name: z.string() }),
        })
      ),
      from: z.number(),
      last_page: z.number(),
      per_page: z.number(),
      to: z.number(),
      total: z.number(),
    });

    cy.request({
      method: 'GET',
      url: 'https://api.practicesoftwaretesting.com/products',
    })
      .validateSchemaZod(schema)
      .then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array').and.not.be.empty;

        productId = response.body.data[0].id;

        expect(productId).to.exist;
      });
  });

  it('Create a new item via /carts api', () => {
    const cartSchema = z.object({ id: z.string() });

    const addItemSchema = z.object({ result: z.string() });

    cy.request({
      method: 'POST',
      url: '/carts',
    })
      .validateSchemaZod(cartSchema)
      .then((response) => {
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
        })
          .validateSchemaZod(addItemSchema)
          .then((getResponse) => {
            expect(getResponse.status).to.eql(200);
          });
      });
  });
});
