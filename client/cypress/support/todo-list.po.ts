/*
"_id": "58895985a22c04e761776d54",
"owner": "Blanche",
"status": false,
"body": "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
"category": "software design"
 */

export class TodoListPage {
  navigateTo() {
    return cy.visit('/todos');
  }

  getUrl() {
    return cy.url();
  }


  /**
   * Gets the page title, which appears in the page tab
   *
   * @return the title of the component page
   */
  getPageTitle() {
    return cy.title();
  }

  getTodoTitle() {
    return cy.get('.todo-list-title');
  }

  changeView(viewType: 'card' | 'list') {
    return cy.get(`[data-test=viewTypeRadio] mat-radio-button[value="${viewType}"]`).click();
  }

  getTodoCards() {
    return cy.get('.todo-cards-container app-todo-card');
  }

  getTodoListItems() {
    return cy.get('.todo-nav-list .todo-list-item');
  }

  selectStatus(status: true | false) {
    return cy.get(`[data-test=todoStatusSelect] mat-option[value]='${status}']`).click();
  }

  selectCategory(category: string) {
    return cy.get('[data-test=todoCategorySelect]').click()
      .get(`mat-option[value="${category}"]`).click();
  }
}
