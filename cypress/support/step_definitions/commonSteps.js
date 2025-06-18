import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I clear all saved preferences", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});