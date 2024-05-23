/// <reference types="cypress" />

// quando digito um nome de pokemon, aparece uma lista de apenas pokemons que começam com o nome digitado
// quando clico no botão de pesquisa, o pokemon é exibido na tela

describe("Search functionality", () => {
  describe("Search for a pokemon", () => {
    it("Given I am on the Pokedex page", () => {
      cy.visit("/");
      cy.get(".trainer-card").first().click();
      cy.url().should("include", "/pokedex");
    });

    it("Then I search for a pokemon by name", () => {
      // Enter the name of a pokemon in the search bar
      cy.get('input[name="search"]').type("Pid");

      // Check the input value
      cy.get('input[name="search"]').should("have.value", "Pid");
    });

    it("Then I should see a list of pokemons that start with the name", () => {
      // Verify the list of pokemons is displayed on the screen
      const expectedPokemons = ["Pidgey", "Pidgeotto", "Pidgeot"];

      // Verify the list of pokemons is displayed on the screen
      expectedPokemons.forEach((pokemon) => {
        cy.get('[data-cy="select-list"]')
          .children()
          .should("contain.text", pokemon);
      });
    });

    it("Then I click on the pokemon", () => {
      // Click on the first pokemon in the list
      cy.get('[data-cy="select-list"]').children().first().click();
    });

    it("Then I should see the pokemon displayed on the screen", () => {
      // Verify the pokemon is displayed on the screen
      cy.get('[data-cy="pokemon-screen"]').should("be.visible");
      cy.get('button[aria-label="Close"]').click();
    });

  });

  describe("Search for a pokemon that does not exist", () => {
    it("Given I search for a pokemon by name", () => {
      // Enter the name of a pokemon that does not exist
      cy.get('input[name="search"]').type("nonexistent");

      // Check the input value
      cy.get('input[name="search"]').should("have.value", "nonexistent");
    });

    it("Then I should not see the select list", () => {
      // check if select list not exists
      cy.get('[data-cy="select-list"]').should("not.exist");
      cy.get('input[name="search"]').clear();
    });
  });

  describe("Search for a pokemon and clear the search bar", () => {
    it("Given I search for a pokemon by name", () => {
      // Enter the name of a pokemon in the search bar
      cy.get('input[name="search"]').type("Pid");

      // Check the input value
      cy.get('input[name="search"]').should("have.value", "Pid");
    });

    it("Then I should see a list of pokemons that start with the name", () => {
      // Verify the list of pokemons is displayed on the screen
      const expectedPokemons = ["Pidgey", "Pidgeotto", "Pidgeot"];

      // Verify the list of pokemons is displayed on the screen
      expectedPokemons.forEach((pokemon) => {
        cy.get('[data-cy="select-list"]')
          .children()
          .should("contain.text", pokemon);
      });
    });

    it("Then I clear the search bar", () => {
      // Clear the search bar
      cy.get('input[name="search"]').clear();

      // Check the input value
      cy.get('input[name="search"]').should("have.value", "");
    });

    it("Then I should not see the select list", () => {
      // check if select list not exists
      cy.get('[data-cy="select-list"]').should("not.exist");
    });
  });
});
