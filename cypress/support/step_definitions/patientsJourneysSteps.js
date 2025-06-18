const searchInput = '[data-testid="search-input"]';
const patientRow = '[data-testid="patient-row"]';
const moreFiltersButton = '[data-testid="more-filters-button"]';
const communicationStatusFilter = '[data-testid="filter-communication-status"]';
const languageToggle = '[data-testid="language-toggle"]';

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in as a healthcare professional", () => {
  cy.login();
});

Given("I open the Patients Journeys view", () => {
  cy.visit("/uphillchallenge/desk?routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&page=0&tab=2&phasesIds=*");
});

When("I expand the {string} menu", (menu) => {
  if (menu === "More Filters") {
    cy.get(moreFiltersButton).click();
  }
});

When("I filter by Communication Status {string}", (status) => {
  cy.get(communicationStatusFilter).select(status);
});

Then("I should see only patients with status {string}", (expectedStatus) => {
  cy.get(patientRow).each(($el) => {
    cy.wrap($el).contains(expectedStatus);
  });
});



When("I enter {string} in the search bar", (name) => {
  cy.get(searchInput).clear().type(name);
});

Then("I should see a patient named {string} in the results", (name) => {
  cy.get(patientRow).should("contain.text", name);
});


Given("I have no internet connection", () => {
  cy.intercept("GET", "**/search**", { forceNetworkError: true }).as("searchError");
});

When("I try to search for a patient", () => {
  cy.get(searchInput).type("Test Patient");
});

Then("I should see an error message indicating a connection issue", () => {
  cy.wait("@searchError");
  cy.contains("Connection error").should("be.visible");
});


Given("the current language is {string}", (lang) => {
  cy.visit("/");
  if (lang === "English") {
    cy.get(languageToggle).contains("EN").click();
  } else if (lang === "Portuguese") {
    cy.get(languageToggle).contains("PT").click();
  } else {
    assert.fail("Unrecognized language: "+ lang);
  }
});

When("I change the language to {string}", (lang) => {
  cy.get(languageToggle).click();
  cy.contains(lang).click();
});

Then("the Patients Journeys view should appear in {string}", (lang) => {
  if (lang === "Portuguese") {
    cy.contains("Jornadas do Paciente").should("be.visible");
  } else {
    cy.contains("Patients Journeys").should("be.visible");
  }
});

Then("all labels in the Patients Journeys view should be in {string}", (lang) => {
  // Simplified version: check for a key label
  const labels = {
    English: ["Patients", "Status", "Search"],
    Portuguese: ["Pacientes", "Estado", "Pesquisar"]
  };

  labels[lang].forEach((label) => {
    cy.contains(label).should("be.visible");
  });
});

