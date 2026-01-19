/// <reference types="cypress" />
import { z } from 'zod';
import { faker } from '@faker-js/faker';

describe('Post user', () => {
  const email = faker.internet.email();
  const uppercase = faker.string.alpha({ length: 2, casing: 'upper' });
  const lowercase = faker.string.alpha({ length: 4, casing: 'lower' });
  const numbers = faker.string.numeric({ length: 6 });
  const password = `${uppercase}${lowercase}${numbers}$`;
  let accessToken;

  it('Register an new user via /users/register api', () => {
    const registerSchema = z.object({
      first_name: z.string(),
      last_name: z.string(),
      phone: z.string(),
      dob: z.string(),
      email: z.string(),
      id: z.string(),
      created_at: z.string(),
      address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postal_code: z.string(),
      }),
    });
    cy.request({
      method: 'POST',
      url: '/users/register',
      body: {
        first_name: 'John',
        last_name: 'Doe',
        address: {
          street: 'Street 1',
          city: 'City',
          state: 'State',
          country: 'Country',
          postal_code: '1234AA',
        },
        phone: '0987654321',
        dob: '1970-01-01',
        password: password,
        email: email,
      },
    })
      .validateSchemaZod(registerSchema)
      .then((response) => {
        expect(response.status).to.eql(201);
      });
  });

  it('Login user via /users/login api', () => {
    const loginSchema = z.object({
      access_token: z.string(),
      token_type: z.string(),
      expires_in: z.number(),
    });

    cy.request({
      method: 'POST',
      url: '/users/login',
      body: {
        email: email,
        password: password,
      },
    })
      .validateSchemaZod(loginSchema)
      .then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body).to.have.property('access_token');
        accessToken = response.body.access_token;
      });
  });

  it('Get users via /users/me api with authentication token', () => {
    const userMeSchema = z.object({
      id: z.string(),
      provider: z.string().nullable(),
      first_name: z.string(),
      last_name: z.string(),
      phone: z.string(),
      dob: z.string(),
      email: z.string(),
      totp_enabled: z.boolean(),
      created_at: z.string(),
      address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postal_code: z.string().nullable(),
      }),
    });

    cy.request({
      method: 'GET',
      url: '/users/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .validateSchemaZod(userMeSchema)
      .then((response) => {
        expect(response.status).to.eql(200);
      });
  });
});
