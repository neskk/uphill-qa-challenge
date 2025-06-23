Feature: Search patients by name

  Scenario: Search for an existing patient by name
    Given I am logged in as a healthcare professional
    And I open the Patients Journeys view
    When I enter "José Alves" in the search bar
    Then I should see a patient named "José Alves" in the results

  Scenario: Search for a non-existing patient by name
    Given I am logged in as a healthcare professional
    And I open the Patients Journeys view
    When I enter "Arnaldo Dias" in the search bar
    Then I should not see any patient in the results
