Feature: Filter patients by Communication Status

  Scenario: Filter patients with "Pending" communication status
    Given I open the Patients Journeys view
    When I expand the "More Filters" menu
    And I filter by Communication Status "Pending"
    Then I should see only patients with status "Pending"
