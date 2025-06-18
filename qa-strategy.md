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
| Test Reporting | **Allure**                | Rich, visual reports integrated with Cypress and Cucumber for debugging and stakeholder visibility. |
| CI/CD          | **GitHub Actions**        | Automates testing on pull requests and merges, ensuring rapid feedback. |
| Linting        | **eslint + prettier**     | Enforces consistent, clean test code for long-term maintainability. |

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
├── .github/
│   ├── workflows/
│   │   ├── test.yml
├── allure-results/
│   └── (generated test data for Allure)
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
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   ├── utils/
│   ├── api/
│   │   ├── patientsApi.tests.js
├── cypress.config.js
├── README.md
├── package.json
```

- **cypress/e2e/**: Gherkin feature files for BDD-style E2E tests, organized by feature.
- **cypress/support/**: Custom commands and configuration for reusable test steps.
- **tests/**: Unit and API tests for components and backend validation.
- **allure-results/**: Test case documentation and reports.
- **.github/workflows/**: CI/CD pipeline configurations.

## 4. CI/CD Integration

Tests are integrated into a GitHub Actions pipeline for rapid, reliable feedback:
- **Triggers**:
  - Pull Requests and pushes to `main` and `dev`
  - Scheduled nightly regression runs
- **Pipeline Steps**:
  1. Install dependencies.
  2. Run linting (eslint + prettier).
  3. Run unit tests for component logic.
  4. Run API tests for backend validation.
  5. Run E2E tests using Cypress in headless mode.
  6. Generate Allure report.
  7. Upload reports as artifacts.
- **Validation**: Fail builds on test or linting failures.
- **Environment**: Use Docker containers for consistent test environments.
- **Reporting**: Allure reports are stored and linked for team access.
  - __Optional__: Notify stakeholders via Slack/email with test summaries

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
        run: npm run test:e2e
      - name: Generate Allure Report
        run: npm run allure:generate
      - name: Upload Allure Report
        uses: actions/upload-artifact@v3
        with:
          name: allure-report
          path: allure-report/
```

## 5. Test Automation Prioritization Strategy

### Priority Matrix

#### High Priority
- **Critical Business Functions**: Core operations, revenue generation, patient safety, and critical data integrity.
- **Regulatory & Compliance**: Adherence to legal, industry, or internal standards.
- **Core User Journeys**: Most frequent or vital user interactions.

#### Medium Priority
- **Key Integrations**: Verification of internal/external system interfaces.
- **Performance & Scalability**: System responsiveness and stability under load.
- **Robust Error Handling**: Expected system behavior and user feedback during failures.

#### Low Priority
- **Non-Critical Features**: Functionality not impacting core business or safety.
- **Complex Edge Cases**: Less frequent scenarios, automated post-core coverage.
- **Cosmetic/Minor UI Issues**: Visual discrepancies not impeding core functionality.

### Automation Prioritization Criteria
- **Frequency**: Automate heavily used features first (e.g., login, patient search, filtering).
- **Risk**: Focus on features where failure impacts patient safety or compliance.
- **Stability**: Prioritize automation for mature features with stable requirements to reduce rework.
- **ROI**: Target tests that significantly reduce manual effort for repetitive, high-impact scenarios.

## 6. Key Performance Indicators (KPIs)

| KPI                           | Target                         |
| ----------------------------- | ------------------------------ |
| E2E Test Coverage             | ≥ 90% of critical flows        |
| Test Execution Time           | < 5 minutes on CI              |
| Test Flakiness                | < 5%                           |
| Bug Regressions in Production | 0 known regressions from previously covered test cases |
| PR Feedback Time              | < 10 minutes for automated checks |
| Defect Detection Rate         | 95% of defects caught pre-release |
| Automation ROI                | 50% reduction in manual testing within 6 months |
