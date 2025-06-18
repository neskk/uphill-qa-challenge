# UpHill Health - QA Challenge

[QA_Challenge_UpHill.pdf](QA_Challenge_UpHill.pdf)

## [QA Automation Strategy](qa-strategy.md)

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

## External Resources

- [Cypress API](https://docs.cypress.io/api/table-of-contents)
- [Using Allure Cypress with other Cypress plugins](https://allurereport.org/docs/cypress-configuration/)


## Suggestions / Improvements

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


### Flakiness

If you encounter flakiness, increase timeouts (e.g., { timeout: 15000 }) or add retries in cypress.config.ts:
```ts
e2e: {
  retries: { runMode: 2, openMode: 1 },
  // ... other config
}
```