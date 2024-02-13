import { TodoListPage } from "cypress/support/todo-list.po";

const page = new TodoListPage();

describe('Todo list',() => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct page title', () => {
    page.getPageTitle().should('eq', 'Todos');
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should change the view', () => {
        // Choose the view type "Card"
        page.changeView('card');

        // There should be cards
        // We should not see any list items
        page.getTodoCards().should('exist');
        page.getTodoListItems().should('not.exist');
    // Choose the view type "List"
    page.changeView('list');

    // We should not see any cards
    // There should be list items
    page.getTodoCards().should('not.exist');
    page.getTodoListItems().should('exist');
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'software design'
    page.changeView('card');
    page.selectCategory('software design');

    page.getTodoCards().should('have.lengthOf', 74);

    // All of the todo cards that shouldn't be found
    page.getTodoCards().find('.todo-card-category')
      .should('not.contain.text', 'homework')
      .should('not.contain.text', 'video games')
      .should('not.contain.text', 'groceries');
  });

 it('Should type a name in the owner filter and check that it returned correct elements', () => {
    // Filter for owner 'Blanche'
    page.changeView('card');
    cy.get('[data-test=todoOwnerInput]').type('Blanche');

    page.getTodoCards().should('have.lengthOf', 43);

    // All of the todo cards should have the owner we are filtering by
    page.getTodoCards().find('.todo-card-owner').each($card => {
      cy.wrap($card).should('have.text','Blanche');
    })

    page.getTodoCards().find('.todo-card-owner')
      .should('not.contain.text', 'Fry')
      .should('not.contain.text', 'Barry')
      .should('not.contain.text', 'Dawn');
  });

  it('Should type something in the body filter and check that it returned correct elements', () => {
    // Filter for body 'Amet do velit tempor'
    page.changeView('card');
    cy.get('[data-test=todoBodyInput]').type('Amet do velit tempor');

    page.getTodoCards().should('have.lengthOf', 1);
    page.getTodoCards().find('.todo-card-owner').each($card => {
      cy.wrap($card).should('have.text','Blanche');
    })

  });


});
