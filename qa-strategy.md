# QA & Automation Strategy for Patients Journeys

## 1. Core Testing Principles & Methodologies

- **Testing Shows the Presence of Defects**: Testing reveals defects but cannot prove their absence — especially in critical areas like filtering and localization — emphasizing thorough validation of high-risk areas.
- **Absence-of-Defects Fallacy**: A defect-free feature isn't necessarily a usable one. Validation ensures that features meet real user needs (e.g., clarity in filters, search result relevance, completeness in language switching).
- **Defect Clustering**: Focus testing on high-risk areas like patient data retrieval and UI interactions, where defects are likely to concentrate.
- **Shift-Left Testing**: Begin testing during story refinement to catch issues early and reduce rework. Well-defined user stories with clear, unambiguous, feasible, and traceable acceptance criteria form the baseline for validation (ATDD). QA collaborates in backlog grooming and sprint planning to identify edge cases, test scenarios, and automation needs.
- **Risk-Based Testing**: Prioritize testing for high-impact, high-risk areas affecting patient safety and data security, such as patient data filters, localization, and error handling (e.g., unavailable services, heavy server loads).
- **Test Pyramid**: Separation of concerns to minimize test overlap.
  - **Unit Tests**: Fast, developer-owned tests for individual components (e.g., filter logic), with QA supporting behavior definition from user stories.
  - **Integration Tests**: Validate data flow and interactions between internal and external services (e.g., patient data APIs).
  - **End-to-End (E2E) Tests**: Cover critical user workflows (e.g., filtering, searching, language switching).
- **Behavior-Driven Development (BDD)**: Write tests in Gherkin syntax to bridge communication among developers, QAs, and stakeholders, ensuring features align with expectations. Reusable step definitions maintain consistency and focus on business logic.
- **Continuous Feedback Loop**: Automated tests run in the CI pipeline on every commit and pull request, providing fast feedback to catch issues early and enforce quality policies.
- **Pesticide Paradox**: Stale tests cases lose effectiveness. Regularly update test cases to avoid flaky and repetitive testing that misses new defects, incorporating exploratory testing to uncover unexpected issues.
- **Exploratory Testing**: Complement automation with exploratory testing for complex user scenarios and edge cases, documented for traceability.
- **Context-Dependent Testing**: Tailor testing to the healthcare domain, ensuring compliance with usability, accessibility, and data security standards critical for healthcare professionals.


## 2. Tools & Frameworks

| Layer          | Tool                      | Rationale                                                   |
| -------------- | ------------------------- | ----------------------------------------------------------- |
| E2E Tests      | **Cypress + Cucumber**    | Fast, reliable browser testing with Gherkin syntax support for BDD. |
| Test Reporting | **Allure**                | Rich, visual reports integrated with Cypress for stakeholder visibility. |
| CI/CD          | **GitHub Actions**        | Automates testing on pull requests and merges, ensuring rapid feedback. |
| Linting        | **eslint + prettier**     | Ensures clean, consistent test code for maintainability.     |

### Additional Tools
- **Jira**: For test case management, defect tracking, and linking test scenarios to user stories, ensuring traceability in a healthcare context.
- **Confluence**: For storing test plans, strategy documents, and compliance reports, supporting collaboration and version control.
- **AssertThat**: Enhances Jira with BDD features, integrating Cucumber feature files for automated test reporting and linking Gherkin scenarios to Jira issues.

### Rationale
- **Cypress + Cucumber**: Combines fast E2E testing with Gherkin syntax, aligning with BDD and enabling clear communication of test scenarios.
- **Allure**: Provides detailed, visual reports with screenshots, videos, and Cucumber mapping, ideal for debugging and stakeholder reporting in healthcare.
- **GitHub Actions**: Seamlessly integrates with the repository for automated testing and deployment validation.
- **eslint + prettier**: Maintains code quality for test scripts, reducing maintenance overhead.
- **Jira**: Centralizes test case management and defect tracking, ensuring traceability and compliance.
- **Confluence**: Supports collaborative documentation of test strategies and compliance reports.
- **AssertThat**: Enhances BDD by linking Gherkin scenarios to Jira, streamlining test reporting and traceability.

## 3. Test Architecture & Project Structure

### Test Architecture
- **E2E Tests**: Cypress with Cucumber tests validate critical user workflows (e.g., patient filtering, search, localization) using Gherkin feature files, simulating real interactions and verifying API responses.
- **API Tests**: Validate backend endpoints (e.g., patient data retrieval, error handling) to ensure reliability.
- **Unit Tests**: Cover frontend components and utilities for fast feedback.
- **Manual/Exploratory Tests**: Documented in Jira for usability and edge cases.

### Project Structure
The GitHub repository is organized for clarity and CI/CD integration:
```
patients-journeys-qa/
├── cypress/
│   ├── e2e/
│   │   ├── patients-journeys/
│   │   │   ├── filterByCommunicationStatus.feature
│   │   │   ├── searchByName.feature
│   │   │   ├── connectionError.feature
│   │   │   ├── languageSwitch.feature
│   │   │   ├── viewLocalizedContent.feature
│   ├── support/
│   │   ├── commands.js
│   │   ├── index.js
├── cypress.config.js
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   ├── utils/
│   ├── api/
│   │   ├── patientsApi.tests.js
├── .github/
│   ├── workflows/
│   │   ├── test.yml
├── README.md
├── package.json
```
- **cypress/e2e/**: Gherkin feature files for BDD-style E2E tests, organized by feature.
- **cypress/support/**: Custom commands and configuration for reusable test steps.
- **tests/**: Unit and API tests for components and backend validation.
- **allure-report/**: Test case documentation and reports.
- **.github/workflows/**: CI/CD pipeline configurations.

## 4. CI/CD Integration

Tests are integrated into a GitHub Actions pipeline for rapid, reliable feedback:
- **Triggers**: Run on pull requests and pushes to `main`/`dev` branches, with nightly regression tests.
- **Pipeline Steps**:
  1. Install dependencies.
  2. Run linting (eslint + prettier) to ensure test code quality.
  3. Run unit tests for component logic.
  4. Run API tests for backend validation.
  5. Run Cypress E2E tests headlessly against the staging environment (e.g., https://uphillhealth.com/uphillchallenge/desk2).
  6. Generate and upload test reports (Allure or Mochawesome) as artifacts.
- **Validation**: Fail builds on test or linting failures to block unstable code.
- **Environment**: Use Docker containers for consistent test environments.
- **Reporting**: Store reports from Allure and notify stakeholders via Slack/email.

### Example GitHub Workflow
```
name: CI Pipeline
on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Install Dependencies
        run: npm install
      - name: Run Linting
        run: npm run lint
      - name: Run Unit Tests
        run: npm run test:unit
      - name: Run API Tests
        run: npm run test:api
      - name: Run E2E Tests
        run: npm run test:e2e -- --headless
      - name: Upload Test Reports
        uses: actions/upload-artifact@v3
        with:
          name: test-reports
          path: mochawesome-report/
```

## 5. Test Automation Prioritization Strategy

| Priority | Criteria                                                 |
| -------- | -------------------------------------------------------- |
| High     | Critical user flows (filters, search, language switch)   |
| Medium   | System feedback (error messages, UI alerts)              |
| Low      | UI style checks, edge cases after main flows are covered |

### Prioritization Plan
- **Phase 1**: Automate E2E tests for critical user flows (e.g., filtering by Communication Status, searching by name, language switching).
- **Phase 2**: Automate API tests for patient data endpoints and error handling (e.g., internet failure alerts).
- **Phase 3**: Expand unit test coverage and add negative testing for robustness.
- **Phase 4**: Incorporate accessibility testing to ensure compliance with healthcare standards.
- **Ongoing**: Balance automation with exploratory testing for new features and edge cases.

## 6. Key Performance Indicators (KPIs)

| KPI                           | Target                         |
| ----------------------------- | ------------------------------ |
| E2E Test Coverage             | ≥ 80% of critical flows        |
| Test Execution Time           | < 5 minutes on CI              |
| Test Flakiness                | < 5%                           |
| Bug Regressions in Production | Zero known regressions         |
| PR Feedback Time              | < 10 minutes for automated checks |
| Defect Detection Rate         | 95% of defects caught pre-release |
| Automation ROI                | 50% reduction in manual testing within 6 months |

## Conclusion
This QA and Automation Strategy ensures high-quality releases for Patients Journeys by integrating ISTQB principles with Shift-Left Testing, a balanced Test Pyramid, and BDD with Gherkin. Leveraging tools like Cypress with Cucumber, Allure/Mochawesome, and GitHub Actions, we prioritize critical user flows, ensure rapid feedback via CI/CD, and focus on high-risk areas like patient safety and data security. Clear KPIs track success, enabling efficient delivery of reliable features that empower healthcare professionals.