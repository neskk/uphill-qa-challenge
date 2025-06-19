Feature: Change application language
  
  Background:
    Given I am logged in as a healthcare professional

  @basic
  Scenario: Switch from English to Portuguese
    Given the current language is "English"
    When I change the language to "Português"
    Then the Patients Journeys page title should display "Jornadas de Doentes"

  @basic
  Scenario: Switch from Portuguese to English
    Given the current language is "Português"
    When I change the language to "English"
    Then the Patients Journeys page title should display 'Patients Journeys'

  Scenario: Language selection persists across views
    And the current language is "Português"
    When I navigate to the Patients Journeys view
    Then the Patients Journeys page title should display "Jornadas de Doentes"
