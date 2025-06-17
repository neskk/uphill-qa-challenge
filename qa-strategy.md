# QA Automation Strategy

## 1. Core Testing Principles and Methodologies

- Shift Left Testing: Start testing early in the development cycle to promote early defect detection.
- Test Pyramid: Prioritize unit tests (more emphasis on developers doing them but requirements coming from QA and user stories) > integration tests > E2E tests.
- Behavior-Driven Development (BDD): Write tests in a human-readable format (Gherkin) to improve collaboration and clarity.
- Continuous Feedback Loop: Ensure fast feedback from automated tests integrated into the CI pipeline.
- Risk-Based Testing: Prioritize tests for high-impact, high-risk areas such as patient data filters and localization.
