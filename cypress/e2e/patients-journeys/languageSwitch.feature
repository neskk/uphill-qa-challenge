Feature: Change application language
  
  Background:
    Given I clear all saved preferences
    And I am logged in as a healthcare professional

  Scenario: Switch from English to Portuguese
    Given the current language is "English"
    When I change the language to "Português"
    Then the page title should display "Jornadas de Doentes"

  Scenario: Switch from Portuguese to English
    Given the current language is "Português"
    When I change the language to "English"
    Then the page title should display 'Patients Journeys'

  Scenario: Language selection persists across views
    Given the current language is "Português"
    And I open the Patients Journeys view
    Then the page title should display "Jornadas de Doentes"
    When I click the "Diretório de Doentes" menu
    Then the page title should display "Diretório de Doentes"