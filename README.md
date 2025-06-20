# UpHill Health - QA Challenge

[QA_Challenge_UpHill.pdf](QA_Challenge_UpHill.pdf)

## [QA Automation Strategy](qa-strategy.md)

## Requirements

- Node.js v18+
- Java SE v8+ (for Allure reports)

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
- [Cypress Cucumber Pre-processor](https://github.com/badeball/cypress-cucumber-preprocessor)
- [Using Allure Cypress with other Cypress plugins](https://allurereport.org/docs/cypress-configuration/)


## Issues / Suggestions

### cy.origin()
Doing the first visit to the login subdomain, forces us to use cy.origin() in subsequent visits and inference.

Solution: ended up disabling Chrome's web security `chromeWebSecurity: false`.

### Login Page
After selecting the Email field, if we remove the focus it immediately triggers validation and displays: "Insira um email válido"/Insert a valid email.
Suggestion: Validation should not trigger if input is empty as it causes some confusion.

### Language Switching

If I change the language to something other than browser language, when I relog the language defaults back to the browser language which means it did not store my language preferences.


### Best Practice: Use data-testid or data-cy attributes

There are multiple cases of DOM elements that have the same `data-testid` attribute. This causes tests to be inconsistent and defeats the purpose of having unambigous identifiers.

#### data-testid used

- 1x `data-testid="active-workspace"` attribute.
- 2x `data-testid="avatar"` attribute.
- 4x `data-testid="menu-link"` attribute.
- 2x `data-testid="ToggleItem"` attribute.
- 3x `data-testid="DropdownTrigger"` attribute.
- 2x `data-testid="Button"` attribute.
- 1x `data-testid="Switch"` attribute.
- 1x `data-testid="SwitchThumb"` attribute.
- 28x `data-testid="Tooltip-Trigger"` attribute.
- 7x `data-testid="PopoverTrigger"` attribute.

### Each patient card should appear only under one status?

On More Filters > Status of communication, there's an overlap, both "Outgoing" and "Missing Answers" show the same set of patients.

### Flakiness

If you encounter flakiness, increase timeouts (e.g., { timeout: 15000 }) or add retries in cypress.config.ts:
```ts
e2e: {
  retries: { runMode: 2, openMode: 1 },
  // ... other config
}
```