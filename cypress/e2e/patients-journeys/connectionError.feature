Feature: Alert user on failed search due to network error

  Scenario: Display alert when search fails due to no internet
    Given I have no internet connection
    When I try to search for a patient
    Then I should see an error message indicating a connection issue
