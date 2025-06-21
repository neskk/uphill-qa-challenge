const selectors = {
  searchInput: 'i.icon-search + input:not([readonly])',
  openButton: '[data-testid="Button"]',
  closeButton: 'i.icon-close',
  communicationStatusFilter: '[data-testid="filter-communication-status"]',
  avatar: '[data-testid="Avatar"]',
  boardCard: '[id^="board-card-"]',
  tooltipTrigger: '[data-testid="Tooltip-Trigger"]',
  menuLink: '[data-testid="menu-link"]'
};

const mainUrl = "/uphillchallenge/desk?routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&page=0&tab=2&phasesIds=*";


import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am programmatically logged in as a healthcare professional", () => {
  cy.apiLogin();
  cy.visit(mainUrl);
  cy.wait(3000);
});

Given("I am logged in as a healthcare professional", () => {
  cy.login();
});

Given("I open the Patients Journeys view", () => {
  cy.visit(mainUrl);
  cy.url()
    .should('include', 'uphillchallenge/desk', { timeout: 5000 })
});

/*
Given("I open the Patients Journeys view", () => {
  cy.origin("https://uphillhealth.com", { args: { mainUrl } }, ({ mainUrl }) => {
    cy.visit(mainUrl);
    cy.wait(3000);
    cy.url().should('include', 'uphillchallenge/desk');
  });
});
*/
When("I click the {string} menu", (text) => {
  cy.get(selectors.menuLink)
    .contains(text)
    .should('be.visible')
    .click();

  cy.wait(3000);
});

When("I expand the {string} menu", (menu) => {
    cy.contains(menu)
      .parent()
      .find(selectors.openButton)
      .should('be.visible')
      .click();
});

When("I close the {string} menu", (menu) => {
  cy.contains(menu)
    .siblings()
    .find(selectors.closeButton)
    .should('be.visible')
    .click();
});

When("I filter by {string} with {string}", (filter, status) => {
  cy.contains(filter)
    .parent()
    .find('button[data-testid="DropdownTrigger"]')
    .should('be.visible')
    .click();
  cy.get('div[role="menuitem"]').contains(status).click();
  cy.wait(1000);
  cy.get('body').type('{esc}'); // close the dropdown
  //cy.get('body').click(0, 0); // alternatively: click the corner of screen
});

Then('I should see the User Profile view', () => {
  cy.origin('https://id.uphillhealth.com', () => {
    cy.contains('p.title', 'Personal Data').should('be.visible');
  });
});

Then('I should see the Patients Journeys view', () => {
  cy.url().should('include', '/uphillchallenge/desk');
  //cy.contains('Patients Journeys').should('be.visible');
});


Then("I should see only patients with status {string}", (expectedStatus) => {
  cy.get(selectors.boardCard).each(($el) => {
    cy.wrap($el).contains(expectedStatus);
  });
});

// Search Feature

When("I enter {string} in the search bar", (name) => {
  cy.get(selectors.searchInput).click().clear().type(name);
  cy.wait(3000);
});

Then("I should see a patient named {string} in the results", (name) => {
  cy.get(selectors.boardCard).contains(name).should("be.visible");
});

Given("I have no internet connection", () => {
  cy.intercept("GET", "**/patient-sessions/phases**", { forceNetworkError: true }).as("searchError");
});

Then("I should see an error message indicating a connection issue", () => {
  cy.wait("@searchError");
  //cy.contains("Connection error").should("be.visible", { timeout: 30000 });
  cy.get('.Loading').find('.MuiCircularProgress-indeterminate').should("be.visible", { timeout: 5000 });
});

// Language Switching Feature

Given('the current language is {string}', (lang) => {
  cy.visit(mainUrl);
  cy.url().should('include', 'uphillchallenge/desk');
  cy.get(selectors.avatar)
    .last()
    .should('be.visible')
    .click();

  cy.get('.LanguageSelecterContainer p.LanguageSelecterFont')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      if (text !== lang) {
        // If language doesn't match, change it
        cy.get('.LanguageSelecterContainer p.LanguageSelecterFont')
          .click();
        cy.get('p:not(.LanguageSelecterFont)')
          .contains(lang)
          .should('be.visible')
          .click();
        cy.log(`Changed language to ${lang}`);
      } else {
        cy.log(`Language already set to ${lang}`);
      }
    });

  Cypress.env('currentLanguage', lang);
});

When('I change the language to {string}', (targetLang) => {

  cy.get(selectors.avatar)
    .last()
    .should('be.visible')
    .click({force: true});

  cy.get('.LanguageSelecterContainer')
    .find('p.LanguageSelecterFont')
    .should('be.visible')
    .click();

  cy.get('p:not(.LanguageSelecterFont)').contains(targetLang)
    .should('be.visible')
    .click();
  cy.wait(3000);
  Cypress.env('currentLanguage', targetLang);
});

Then('the page title should display {string}', (text) => {
  cy.contains(text).should("be.visible");
});

