# QA Automation Strategy

## 1. Core Testing Principles and Methodologies

### Shift-Left Testing

In line with Agile principles, testing is embedded early in the development cycle to ensure fast feedback, continuous improvement, and shared responsibility for quality.  

We incorporate _[Poka-Yoke](https://en.wikipedia.org/wiki/Poka-yoke)_ (mistake-proofing) practices to prevent defects rather than just detect them. These safeguards are embedded across the development lifecycle:

- All user stories should include well-defined requirements and acceptance criteria:
    - Unambiguous: Clear and open to only one interpretation.
    - Consistent: Does not contradict other requirements.
    - Feasible: Can be achieved within technical and resource constraints.
    - Traceable: Linked to its origin and subsequent design and test artifacts.
- Cucumber Step Definitions:
    - Reusable and well-structured step definitions to ensure consistency across test scenarios and reduce duplication/errors in test logic.
    - Clear semantics and simple phrasing to keep the focus on behavior rather than on implementation details.
- Linting, Formatting, Coverage and Security Scanners (eslint, prettier, nyc, istanbul, OWASP Dependency-Check):
    - Enforce code quality standards to avoid syntax issues, inconsistent patterns, and anti-patterns early.
    - Track test coverage to ensure critical paths are exercised and flag untested areas for attention.
    - Automatically detect known vulnerabilities in dependencies.

### Shift-Left Testing

In alignment with Agile best practices, __shift-left__ means **integrating testing activities early to prevent defects and ensure fast feedback**.
Testing begins at the story refinement stage, where the foundation of quality is laid through:

- Well-defined user stories and acceptance criteria:
    - Each story must be unambiguous, consistent, feasible, and traceable — forming the baseline for all validation efforts.
    - Clear specifications ensure shared understanding, reduce rework, and allow tests to be defined before code is written (ATDD).

- Cross-functional collaboration during backlog grooming and sprint planning:
    - QA actively participates in story refinement, helping identify edge cases, test scenarios, and automation requirements early.
    - Define priorities, timelines and critical paths for implementing automated tests.

- Behavioral alignment through BDD:
    - Using Gherkin syntax to describe expected behavior bridges communication across developers, QAs, and stakeholders, ensuring features are built according to expectations the first time.
    - Clear, reusable, and well-structured step definitions ensure consistency and abstract implementation details to help focus on core business logic.

Tools and practices support testing often and early with continuous validation, static analysis, and tight CI integration, embedding quality rather than inspecting it later.

### Test Pyramid Strategy

We will strive to minimize overlapping tests across the pyramid levels. Each ascending level of the pyramid addresses more complex problems, assuming that basic functionalities and lower-level interactions have already been covered by the preceding test levels.

- Unit Tests: These are fast, isolated tests focused on individual components or functions. They should be mostly owned by developers, with QA providing support in defining expected behavior directly from user stories.
- Integration Tests: These tests ensure proper functionality and data flow on interactions between various internal and external services.
- End-to-End (E2E) Tests: These tests cover essential user workflows and critical user behaviors. They are written in a business-readable Gherkin language to ensure clear communication and alignment with stakeholder expectations.


### Behavior-Driven Development (BDD)

We adopt BDD to bridge the gap between business and engineering. Scenarios are written in Gherkin to describe user behavior in a shared, human-readable format — promoting alignment across developers, QA, and stakeholders. This fosters collaborative refinement of features and enables smoother transitions from requirements to implementation.

In parallel, we advocate for Test-Driven Development (TDD) at the unit and integration levels.
By writing tests before implementation, TDD encourages modular design, improves code quality, and provides fast, localized feedback — reinforcing our shift-left strategy.


### Continuous Feedback Loop

Automated tests run in the CI pipeline to provide fast, consistent feedback on every commit and pull request. This supports early issue detection and allows developers to address problems while changes are still fresh.

- Merge Request CI Pipelines:
    - Run validation tests to enforce company policies and to catch issues early.
    - Execute comprehensive test suites to verify system integrity.
    - Block progress if any of validations is not passing.


### Risk-Based Testing: 
Testing effort is concentrated on high-impact, high-risk areas—particularly, specially those affecting patient safety and patient data.

Documentation as a Core QA Principle

Effective documentation is critical for knowledge sharing, test clarity, and long-term maintainability. We treat it as a first-class citizen in our QA strategy, with two main focus areas:

    Test Case & User Story Documentation:
    All test cases are derived from well-defined user stories and acceptance criteria. Using BDD and Gherkin syntax, we document behavior in a way that is readable by all stakeholders — bridging the gap between business and engineering. This ensures alignment on expected outcomes, simplifies onboarding, and enables traceability between features and their validations.

    Test Code Documentation:
    Automated tests should be self-descriptive and consistent. Where needed, inline comments or READMEs within feature directories will explain the purpose, structure, or edge cases covered. Additionally, reusable functions or custom commands will include JSDoc-style annotations to help developers and testers use and maintain them properly.

This approach reduces onboarding time, prevents test duplication, and ensures that quality is treated as a shared, visible responsibility.
