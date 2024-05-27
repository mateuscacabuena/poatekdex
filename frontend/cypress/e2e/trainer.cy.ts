/// <reference types="cypress" />

class TrainerForm {
  fillName(name: string) {
    cy.get('[data-cy="name"]').type(name);
  }
  fillImageUrl(imageUrl: string) {
    cy.get('[data-cy="imageUrl"]').type(imageUrl);
  }
  submit() {
    cy.get('[data-cy="submit"]').click();
  }
}

describe("Trainer Screen", () => {
  describe("Creating a new trainer", () => {
    const form = new TrainerForm();
    const input = {
      name: "Mateus",
      imageUrl:
        "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    };
    it("Given I am on the select trainer page", () => {
      cy.visit("/");
      cy.url().should("include", "/");
    });

    it("Then I click on the create trainer button", () => {
      // Open the popover
      cy.contains("Create Trainer").click();
      cy.get('[data-cy="name"]').should("be.visible");
      cy.get('[data-cy="imageUrl"]').should("be.visible");
    });

    it(`Then I enter "${input.name}" in the trainer name field`, () => {
      form.fillName(input.name);
      cy.get('[data-cy="name"]').should("have.value", input.name);
    });

    it(`Then I enter a link in the trainer image url field`, () => {
      form.fillImageUrl(input.imageUrl);
      cy.get('[data-cy="imageUrl"]').should("have.value", input.imageUrl);
    });

    it("Then I submit the form", () => {
      form.submit();
    });

    it("And I should see the new trainer in the list", () => {
      cy.get('[data-cy="trainer-card"]').last().should("contain", input.name);
      cy.get('[data-cy="trainer-card"]').last().should("contain", "0 pokémon(s)");
    });
  });

  describe("Choose a trainer", () => {
    it("Given I click on a trainer", () => {
      cy.get('[data-cy="trainer-avatar"]').last().click();
    });

    it("And I should be on the pokedex page", () => {
      cy.url().should("include", "/pokedex");
      cy.visit("/");
    });
  });


  describe("Deleting a trainer", () => {
    it("Given I click on the delete trainer button", () => {
      // Open the popover
      cy.get('[data-cy="exclude-trainer"]').last().click();
    });

    it("And I should not see the deleted trainer in the list", () => {
      // Verify the trainer is not in the list
      cy.get('[data-cy="trainer-card"]').should("not.contain", "Mateus");
    });
  });
});
