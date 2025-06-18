Feature: Change application language

  Scenario: Switch interface from English to Portuguese
    Given the current language is English
    And I am logged in as a healthcare professional
    When I change the language to Portuguese
    Then the Patients Journeys view should appear in Portuguese

  Scenario: Switch interface from Portuguese to English
    Given I am logged in as a healthcare professional
    And the current language is Portuguese
    When I change the language to English
    Then the interface should be displayed in English