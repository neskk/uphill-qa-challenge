import "allure-cypress";

import './commands'; // Load custom commands


Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent failing tests due to known third-party errors
  return false;
});

Cypress.Screenshot.defaults({
  // Add screenshots on failure
  capture: 'runner',
});
