Cypress.Commands.add('login', () => {
  cy.visit(Cypress.env('login_url'));

  cy.get('#onetrust-accept-btn-handler').click();
  cy.get('input[id="mat-input-0"]').type(Cypress.env('username'));
  cy.get('.login-cta').click();
  cy.get('#mat-input-1').type(Cypress.env('password'));
  cy.get('.login-cta').click();
});

