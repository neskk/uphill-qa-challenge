import { loginSelectors } from './selectors';

Cypress.Commands.add('login', () => {

  const loginUrl = "https://id.uphillhealth.com/signin?service=uphillhealth.com&idpdomain=uphillchallenge&continue=https:%2F%2https://uphillhealth.com/uphillchallenge/desk?routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&page=0&tab=2&phasesIds=*";

  cy.visit(loginUrl);

  // Accept cookie consent if present
  cy.get(loginSelectors.cookieConsentButton, { timeout: 5000 })
    .should('be.visible')
    .click({ force: true }) // Force click to handle potential overlays
    .then(() => {
      cy.log('Cookie consent accepted');
    })

  // Enter email
  cy.get(loginSelectors.emailInput)
    .should('be.visible')
    .type(Cypress.env('username'), { log: false }) // Hide sensitive data in logs
    .then(() => {
      cy.log('Email entered');
    });

  // Click "Next" button
  cy.get(loginSelectors.submitButton)
    .should('be.visible')
    .contains('Next')
    .click()
    .then(() => {
      cy.log('Clicked Next after email');
    });

  // Enter password
  cy.get(loginSelectors.passwordInput)
    .should('be.visible')
    .type(Cypress.env('password'), { log: false }) // Hide sensitive data in logs
    .then(() => {
      cy.log('Password entered');
    });

  // Click "Sign in" button
  cy.get(loginSelectors.submitButton)
    .should('be.visible')
    .contains('Sign in')
    .click()
    .then(() => {
      cy.log('Clicked Sign in');
    });

  // Verify successful login by checking redirection profile settings
  cy.url()
    .should('include', 'settings/profile?loginapps=1', { timeout: 5000 })
    .then(() => {
      cy.log('Login successful');
    });
});