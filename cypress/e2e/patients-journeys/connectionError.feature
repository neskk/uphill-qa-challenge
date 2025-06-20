Feature: Alert user on failed search due to network error

  @basic
  Scenario: Display alert when search fails due to no internet
    Given I am logged in as a healthcare professional
    And I open the Patients Journeys view
    And I have no internet connection
    When I enter "José Alves" in the search bar
    Then I should see an error message indicating a connection issue
