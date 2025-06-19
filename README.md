# UpHill Health - QA Challenge

[QA_Challenge_UpHill.pdf](QA_Challenge_UpHill.pdf)

## [QA Automation Strategy](qa-strategy.md)

## Requirements

- Node.js
- JAVA for Allure reports

## Usage

```bash
# open cypress
npx cypress open

# run test suite
npx cypress run
# run specific feature file
npx cypress run --spec "cypress/e2e/**/*.feature"
npx cypress run --headed --spec "cypress/e2e/patients-journeys/login.feature"

npx allure generate --clean
npx allure open
```

### Filter Scenarios by tags

You can select which scenarios to run based on their tags.
Set an env-var `tags` with "@smoke and @regression"

## External Resources

- [Cypress API](https://docs.cypress.io/api/table-of-contents)
- [Cypress Cucumber Pre-processor][https://github.com/badeball/cypress-cucumber-preprocessor]
- [Using Allure Cypress with other Cypress plugins](https://allurereport.org/docs/cypress-configuration/)


## Issues

Doing the first visit to the login subdomain, forces us to use cy.origin() in subsequent visits and inference.

## Suggestions / Improvements

### Login Page
After selecting the Email field, if we remove the focus it immediately triggers validation and displays: "Insira um email válido"/Insert a valid email.
Suggestion: Validation should not trigger if input is empty as it causes some confusion.

### Best Practice: Use data-testid or data-cy attributes

The #mat-input-0 and #mat-input-1 IDs are likely generated dynamically by Angular Material, making them unreliable for consistent testing.

```html
<input id="mat-input-0" data-testid="username-input" />
<button class="login-cta" data-testid="login-button">Next</button>
```

Then in Cypress:

```js
cy.get('[data-testid="login-button"]')
```


### Patients Journeys view

There are two elements with the `data-testid=avatar` attribute.

---

On More Filters > Status of communication, there's an overlap, both "Outgoing" and "Missing Answers" show the same set of patients.

### Flakiness

If you encounter flakiness, increase timeouts (e.g., { timeout: 15000 }) or add retries in cypress.config.ts:
```ts
e2e: {
  retries: { runMode: 2, openMode: 1 },
  // ... other config
}
```