/// <reference types="cypress" />

describe("Pokemon Screen", () => {
  describe("Viewing a Pokemon", () => {
    it("Given I am on the Pokedex page", () => {
      cy.visit("/");
      cy.get(".trainer-card").first().click();
      cy.url().should("include", "/pokedex");
    });

    it("Then I click on a pokemon", () => {
      // Click on the first pokemon in the list
      cy.get('[data-cy="pokemon-list"]').children().first().click();
    });

    it("Then I should see the pokemon displayed on the screen", () => {
      // Verify the pokemon is displayed on the screen
      cy.get('[data-cy="pokemon-screen"]').should("be.visible");
    });

    it("Then I should see the pokemon name", () => {
      // Verify the pokemon details are displayed on the screen
      cy.get('[data-cy="pokemon-screen"]').should("contain.text", 'Bulbasaur');
    });

    it("Then I should see the pokemon types", () => {
      cy.get('[data-cy="pokemon-types"]').should("contain.text", "grass");
      cy.get('[data-cy="pokemon-types"]').should("contain.text", "poison");
    });

    it("Then I should see the pokemon weight, height and moves", () => {
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "6.9 kg");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "0.7 m");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "Overgrow");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "Chlorophyll");
    });

    it("And I should see the pokemon stats", () => {
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "HP");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "ATK");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "DEF");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SATK");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SDEF");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SPD");
    });
  });

  describe("Viewing a Pokemon and Going Next", () => {
    it("Given I am viewing a pokemon and go next", () => {
      // Click on the first pokemon in the list
      cy.get('button[aria-label="Next"]').click();
    });

    it("Then I should see the next pokemon name", () => {
      // Verify the pokemon details are displayed on the screen
      cy.get('[data-cy="pokemon-screen"]').should("contain.text", 'Ivysaur');
    });

    it("Then I should see the next pokemon types", () => {
      cy.get('[data-cy="pokemon-types"]').should("contain.text", "grass");
      cy.get('[data-cy="pokemon-types"]').should("contain.text", "poison");
    });

    it("Then I should see the next pokemon weight, height and moves", () => {
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "13 kg");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "1 m");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "Overgrow");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "Chlorophyll");
    });

    it("And I should see the next pokemon stats", () => {
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "HP");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "ATK");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "DEF");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SATK");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SDEF");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SPD");
    });
  });

  describe("Viewing a Pokemon and Going Back", () => {
    it("Given I am viewing a pokemon and go back", () => {
      // Click on the first pokemon in the list
      cy.get('button[aria-label="Back"]').click();
    });

    it("Then I should see the back pokemon name", () => {
      // Verify the pokemon details are displayed on the screen
      cy.get('[data-cy="pokemon-screen"]').should("contain.text", 'Bulbasaur');
    });

    it("Then I should see the back pokemon types", () => {
      cy.get('[data-cy="pokemon-types"]').should("contain.text", "grass");
      cy.get('[data-cy="pokemon-types"]').should("contain.text", "poison");
    });

    it("Then I should see the back pokemon weight, height and moves", () => {
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "6.9 kg");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "0.7 m");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "Overgrow");
      cy.get('[data-cy="pokemon-about"]').should("contain.text", "Chlorophyll");
    });

    it("And I should see the back pokemon stats", () => {
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "HP");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "ATK");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "DEF");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SATK");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SDEF");
      cy.get('[data-cy="pokemon-stats"]').should("contain.text", "SPD");
    });
  });

  describe("Viewing a Pokemon and exiting the Pokemon Screen", () => {
    it("Given I am viewing a pokemon and exit the pokemon screen", () => {
      // Click on the first pokemon in the list
      cy.get('button[aria-label="Close"]').click();
    });

    it("Then I should not see the pokemon screen", () => {
      // Verify the pokemon screen is not displayed on the screen
      cy.get('[data-cy="pokemon-screen"]').should("not.exist");
    });

    it("And I should see the pokedex page", () => {
      // Verify the pokemon list is displayed on the screen
      cy.get('[data-cy="pokemon-list"]').should("be.visible");
    });
  });
});