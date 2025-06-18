Feature: Change application language

  Scenario: Switch from English to Portuguese
    Given I am logged in as a healthcare professional
    And the current language is English
    When I change the language to Portuguese
    Then the Patients Journeys view should appear in Portuguese
    And all labels in the Patients Journeys view should be in Portuguese

  Scenario: Switch from Portuguese to English
    Given I am logged in as a healthcare professional
    And the current language is Portuguese
    When I change the language to English
    Then the Patients Journeys view should appear in English
    And all labels in the Patients Journeys view should be in English

  Scenario: Language selection persists across views
    Given I am logged in as a healthcare professional
    And the current language is Portuguese
    When I navigate to the Patients Journeys view
    Then the interface should be displayed in Portuguese
