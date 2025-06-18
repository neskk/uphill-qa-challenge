Feature: Search patients by name

  Scenario: Search for an existing patient by name
    Given I open the Patients Journeys view
    When I enter "Maria Silva" in the search bar
    Then I should see a patient named "Maria Silva" in the results
