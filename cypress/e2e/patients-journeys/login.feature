Feature: Patients Journeys Manual Login

  @wip
  Scenario: Successful manual login
    Given I am logged in as a healthcare professional
    And the current language is "English"
    And I open the Patients Journeys view
    Then I should see the Patients Journeys view

  Scenario: Successful programmatic login
    Given I am programmatically logged in as a healthcare professional
    And I open the Patients Journeys view
    Then I should see the Patients Journeys view