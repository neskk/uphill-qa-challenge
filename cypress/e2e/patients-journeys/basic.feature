Feature: Example test using Netflix

  Scenario: Successful website visit
    Given I navigate to "https://www.netflix.com/pt-en/"
    Then I should see the text "Unlimited movies, TV shows, and more"