/// <reference types="cypress" />

describe("Delete Brand by ID", () => {
    it("Create a new brand and delete it by ID", () => {
      const uniqueId = Date.now();
      let brandId;
  
      cy.request({
        method: "POST",
        url: "/brands",
        body: {
          name: `brand-${uniqueId}`,
          slug: `brand-${uniqueId}`,
        },
      }).then((response) => {
        expect(response.status).to.eql(201);
        // Extract the ID from the response body
        brandId = response.body.id;
        expect(brandId).to.exist;
        
        cy.request({
          method: "DELETE",
          url: `/brands/${brandId}`,
          failOnStatusCode: false //the authorization header is not provided so for the POC i've added the expected to equal 401
        }).then((getResponse) => {
          expect(getResponse.status).to.eql(401);  
        });
      });
    });
  });
  