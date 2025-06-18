Feature: View localized content in selected language

  Scenario: Content is displayed in English
    Given I have selected English as the language
    Then all labels in the Patients Journeys view should be in English
