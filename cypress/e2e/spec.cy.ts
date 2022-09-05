/* eslint-disable no-undef */

describe('empty spec', () => {
  before(() => {
    cy.fixture('mockList').then((mockList) => {
      cy.intercept('GET', '**pokemon', {
        statusCode: 200,
        body: mockList,
      }).as('mockList');
    });
    cy.visit('http://localhost:3000/');
  });
  it('passes', () => {
    cy.get('li').contains('pikaju');
  });
  it('passes23', () => {
    cy.get('li').contains('pikaju');
  });
});

export {};
