Feature: Filter patients by Communication Status

  @basic
  Scenario: Filter patients with "Missing An" communication status
    Given I am logged in as a healthcare professional
    And I open the Patients Journeys view
    When I expand the "More Filters" menu
    And I filter by Communication Status "Ongoing"
    Then I should see only patients with status "Ongoing"
