const selectors = {
  searchInput: '[data-testid="search-input"]',
  patientRow: '[data-testid="patient-row"]',
  moreFiltersButton: '[data-testid="more-filters-button"]',
  communicationStatusFilter: '[data-testid="filter-communication-status"]',
  languageToggle: '[data-testid="language-toggle"]',
  avatar: '[data-testid="Avatar"]',
};


import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in as a healthcare professional", () => {
  cy.login();
});

Given("I open the Patients Journeys view", () => {
  cy.visit("/uphillchallenge/desk?routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&page=0&tab=2&phasesIds=*");
});

When("I expand the {string} menu", (menu) => {
  if (menu === "More Filters") {
    cy.get(selectors.moreFiltersButton).click();
  }
});

When("I filter by Communication Status {string}", (status) => {
  cy.get(selectors.communicationStatusFilter).select(status);
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
  cy.get(selectors.patientRow).each(($el) => {
    cy.wrap($el).contains(expectedStatus);
  });
});

// Search Feature

When("I enter {string} in the search bar", (name) => {
  cy.get(selectors.searchInput).clear().type(name);
});

Then("I should see a patient named {string} in the results", (name) => {
  cy.get(selectors.patientRow).should("contain.text", name);
});


Given("I have no internet connection", () => {
  cy.intercept("GET", "**/search**", { forceNetworkError: true }).as("searchError");
});

When("I try to search for a patient", () => {
  cy.get(selectors.searchInput).type("Test Patient");
});

Then("I should see an error message indicating a connection issue", () => {
  cy.wait("@searchError");
  cy.contains("Connection error").should("be.visible");
});

// Language Switching Feature

Given("the current language is {string}", (lang) => {
  cy.visit("/");
  if (lang === "English") {
    cy.get(selectors.languageToggle).contains("EN").click();
  } else if (lang === "Portuguese") {
    cy.get(selectors.languageToggle).contains("PT").click();
  } else {
    // todo: remove, this is not an "assertion error"
    assert.fail("Unrecognized language: "+ lang);
  }
});

// todo: refactor these, we need at least selectors?
When("I change the language to {string}", (targetLang) => {
  cy.get(selectors.avatar).last().should('be.visible').click();

  const toggleLabel = targetLang === "English" ? "Português" : "English";
  const optionLabel = targetLang === "English" ? "English" : "Português";

  cy.contains(toggleLabel).should('be.visible').click();
  cy.contains('p', optionLabel).should('be.visible').click();
});

Then("the Patients Journeys view should appear in {string}", (lang) => {
  const expectedLabel = lang === "Portuguese" ? "Jornadas de Doentes" : "Patients Journeys";

  cy.contains(expectedLabel).should("be.visible");
});

Then("all labels in the Patients Journeys view should be in {string}", (lang) => {
  const labels = {
    English: ["Patients", "Status", "Search", "More filters"],
    Portuguese: ["Pacientes", "Estado", "Pesquisar", "Mais filtros"]
  };

  labels[lang].forEach((label) => {
    cy.contains(label).should("be.visible");
  });
});

