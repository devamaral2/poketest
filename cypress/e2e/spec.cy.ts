/* eslint-disable no-undef */
/* eslint-disable eol-last */
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h1').contains('Pokemon');
    cy.get('li').contains('pikaju');
  });
});