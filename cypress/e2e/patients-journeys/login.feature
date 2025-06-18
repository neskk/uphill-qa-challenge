Feature: Patients Journeys Login

  Scenario: Successful login
    Given I am logged in as a healthcare professional
    Then I should see the User Profile view