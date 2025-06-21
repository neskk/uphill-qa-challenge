Cypress.Commands.add('login', () => {

  cy.visit('/');
  const args = {
      username: Cypress.env('USERNAME'),
      password: Cypress.env('PASSWORD')
  }
  cy.intercept('POST', '/api/user/login').as('login');
  //cy.intercept('https://api-iam.eu.intercom.io/messenger/web/ping');
  // https://api.uphillhealth.com/institutions
  cy.intercept('POST', 'api.uphillhealth.com/institutions').as('institutions');

  // https://docs.cypress.io/api/commands/origin#SSO-login-custom-command
  cy.origin('https://id.uphillhealth.com', { args: args }, ({ username, password }) => {

    cy.visit('https://id.uphillhealth.com/signin?service=uphillhealth.com&idpdomain=uphillchallenge&continue=https:%2F%2https://uphillhealth.com/uphillchallenge/desk?routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&page=0&tab=2&phasesIds=*');

    // Accept cookie consent if present
    cy.get('#onetrust-accept-btn-handler', { timeout: 5000 })
      .should('be.visible')
      .click({ force: true }) // Force click to handle potential overlays
      .then(() => {
        cy.log('Cookie consent accepted');
      })

    // Enter email
    cy.get('[name="upid-login-input-email"]')
      .should('be.visible')
      .type(username, { log: false }) // Hide sensitive data in logs
      .then(() => {
        cy.log('Email entered');
      });

    // Click "Next" button
    cy.get('[name="upid-login-btn-next"]')
      .should('be.visible')
      .contains('Next')
      .click()
      .then(() => {
        cy.log('Clicked Next after email');
      });

    // Enter password
    cy.get('[name="upid-login-input-password"]')
      .should('be.visible')
      .type(password, { log: false }) // Hide sensitive data in logs
      .then(() => {
        cy.log('Password entered');
      });

    // Click "Sign in" button
    cy.get('[name="upid-login-btn-next"]')
      .should('be.visible')
      .contains('Sign in')
      .click()
      .then(() => {
        cy.log('Clicked Sign in');
        cy.wait('@login');
      });
    //cy.pause();
    cy.visit('https://id.uphillhealth.com/settings/profile?loginapps=1');
    // Verify successful login by checking redirection profile settings
    cy.url()
      .should('contain', 'settings/profile?loginapps=1', { timeout: 5000 })
      .then(() => {
        // XXX: fails due to inconsistent login language
        //cy.contains('p.title', 'Personal Data').should('be.visible');
        cy.log('Login successful');
      });
    });
  });

Cypress.Commands.add('apiLogin', () => {
  // XXX: this should also run in inside an cy.origin() block
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
