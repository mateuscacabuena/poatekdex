/// <reference types="cypress" />

function init() {
  cy.visit("/");
  cy.get(".trainer-card").first().click();
}

function finish() {
  cy.get("button").contains("Change Trainer").click();
}

describe("Filter Functionality", () => {
  describe("List by name A-Z", () => {
    it("Given I am on the Pokedex page", () => {
      init();
      cy.url().should("include", "/pokedex");
    });

    it("Then I open the filter menu", () => {
      // Click on the filter button
      cy.get('[data-cy="menu-button"]').click();
    });

    it("Then I should filter the list by name A-Z", () => {
      // Click on the filter option for "A-Z"
      cy.get("button").contains("A-Z").click();

      // Verify the list is sorted by name A-Z
      cy.get('[data-cy="pokemon-list"]')
        .children()
        .first()
        .should("contain.text", "Abra"); // Assuming 'Abra' is first alphabetically
    });
  });

  describe("List by name Z-A", () => {
    it("Given I open the filter menu", () => {
      // Click on the filter button
      cy.get('[data-cy="menu-button"]').click();
    });

    it("Then I should filter the list by name Z-A", () => {
      // Click on the filter option for "Z-A"
      cy.get("button").contains("Z-A").click();

      // Verify the list is sorted by name Z-A
      cy.get('[data-cy="pokemon-list"]')
        .children()
        .first()
        .should("contain.text", "Zubat"); // Assuming 'Abra' is first alphabetically
    });
  });

  describe("List by the highest number", () => {
    it("Given I open the filter menu", () => {
      // Click on the filter button
      cy.get('[data-cy="menu-button"]').click();
    });

    it("Then I should filter the list by the highest number", () => {
      // Click on the filter option for "Z-A"
      cy.get("button").contains("Highest Number").click();

      // Verify the list is sorted by highest number
      cy.get('[data-cy="pokemon-list"]')
        .children()
        .first()
        .should("contain.text", "251"); // Assuming '251' is the highest number
    });
  });

  describe("List by the lowest number", () => {
    it("Given I open the filter menu", () => {
      // Click on the filter button
      cy.get('[data-cy="menu-button"]').click();
    });

    it("Then I should filter the list by the lowest number", () => {
      // Click on the filter option for "Z-A"
      cy.get("button").contains("Lowest Number").click();

      // Verify the list is sorted by lowest number
      cy.get('[data-cy="pokemon-list"]')
        .children()
        .first()
        .should("contain.text", "001"); // Assuming '001' is the lowest number
    });
  });
});