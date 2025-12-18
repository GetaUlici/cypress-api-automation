describe('Get categories/tree by id', () => {
  it('GET categories tree by id test', () => {
    let responseId;
    cy.request('GET', '/categories/tree').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property('id');
      responseId = response.body[0].id;

      cy.request('GET', `/categories/tree/${responseId}`).then((getResponse) => {
        expect(getResponse.status).to.eql(200);
        expect(getResponse.body).to.have.property('id');
      });
    });
  });
});
