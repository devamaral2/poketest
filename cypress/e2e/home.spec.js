/// <reference types="cypress"/>

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should something', () => {
    cy.get('h1').contains('Pokemon');
  });
});
