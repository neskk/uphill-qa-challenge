const selectors = {
  searchInput: 'i.icon-search + input:not([readonly])',
  moreFiltersButton: '[data-testid="Button"]',
  communicationStatusFilter: '[data-testid="filter-communication-status"]',
  avatar: '[data-testid="Avatar"]',
  boardCard: '[id^="board-card-"]',
  tooltipTrigger: '[data-testid="Tooltip-Trigger"]'
};

const mainUrl = "/uphillchallenge/desk?routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&page=0&tab=2&phasesIds=*";


import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in as a healthcare professional", () => {
  cy.login();
});

Given("I open the Patients Journeys view", () => {
  cy.visit("/uphillchallenge/desk?routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&page=0&tab=2&phasesIds=*");
});

When("I expand the {string} menu", (menu) => {
  if (menu === "More Filters") {
    cy.get(selectors.moreFiltersButton).first().should('be.visible').click();
  }
});

When("I filter by Communication Status {string}", (status) => {
  cy.get('button[data-testid="DropdownTrigger"]').eq(5).click();
  cy.get('div[role="menuitem"]').contains(status).click();
});

Then('I should see the User Profile view', () => {
  cy.url().should('include', 'settings/profile');
  //cy.contains('Patients Journeys').should('be.visible');
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
});

Then("I should see a patient named {string} in the results", (name) => {
  cy.get(selectors.boardCard).contains(name).should("be.visible");
});

Given("I have no internet connection", () => {
  cy.intercept("GET", "**/search**", { forceNetworkError: true }).as("searchError");
  cy.intercept('GET', 'https://api.uphillhealth.com/436/patient-sessions/phases?institutionId=436&tab=2&sizePerPage=25&page=0&routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&status=COMPLETED,REVOKED&patient=joao', {
                statusCode: 500,
                body: { message: 'Internal Server Error' }});
});

When("I try to search for a patient", () => {
  cy.get(selectors.searchInput).type("Test Patient");
});

Then("I should see an error message indicating a connection issue", () => {
  cy.wait("@searchError");
  cy.contains("Connection error").should("be.visible");
});

// Language Switching Feature

Given('the current language is {string}', (lang) => {
  cy.visit(mainUrl);
  cy.url().should('include', 'uphillchallenge/desk');
  cy.get(selectors.avatar)
    .last()
    .should('be.visible')
    .click();

  cy.get('.LanguageSelecterContainer')
    .find('p.LanguageSelecterFont')
    .should('be.visible')
    .invoke('text')
    .should('equal', lang);
  /*
  cy.get('.LanguageSelecterContainer')
    .find('p.LanguageSelecterFont')
    .click();
  */
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

  Cypress.env('currentLanguage', targetLang);
});

Then('the Patients Journeys page title should display {string}', (text) => {
  const expectedLabel = lang === "Portuguese" ? "Jornadas de Doentes" : "Patients Journeys";

  cy.get('p').contains(text).should("be.visible");
});


