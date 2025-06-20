Feature: Filter patients by Communication Status

  @basic
  Scenario: Filter patients with "Missing answers" communication status
    Given I am logged in as a healthcare professional
    And I open the Patients Journeys view
    When I expand the "More filters" menu
    And I filter by "Status of communication" with "Missing answers"
    And I close the "Filters" menu
    Then I should see only patients with status "Missing answers"
    Then the Patients Journeys page title should display 'Patients Journeys'

  @basic
  Scenario: Filter patients with "Ongoing" communication status
    Given I am logged in as a healthcare professional
    And I open the Patients Journeys view
    When I expand the "More filters" menu
    And I filter by "Status of communication" with "Ongoing"
    And I close the "Filters" menu
    Then I should see only patients with status "Missing answers"