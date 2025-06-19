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
    .type(Cypress.env('USERNAME'), { log: false }) // Hide sensitive data in logs
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
    .type(Cypress.env('PASSWORD'), { log: false }) // Hide sensitive data in logs
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

Cypress.Commands.add('apiLogin', () => {
  cy.visit('https://id.uphillhealth.com/signin');
  cy.request({
    method: 'POST',
    url: 'https://id.uphillhealth.com/api/user/login',
    body: {
      application: null,
      email: Cypress.env('USERNAME'),
      password: Cypress.env('PASSWORD')
    },
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://id.uphillhealth.com/signin'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);

    const { access_token, refresh_token } = response.body.data;

    cy.setCookie('access_token', access_token, { domain: '.uphillhealth.com' });
    cy.setCookie('refresh_token', refresh_token, { domain: '.uphillhealth.com' });

    // XXX: do not seem impact the app startup language
    cy.setCookie('i18n', 'en', { domain: '.uphillhealth.com' }); // is overriden
    cy.setCookie('i18nLang', 'en', { domain: '.uphillhealth.com' });
  });
  cy.wait(3000);
});
