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

  selectStatus(status: 'Complete' | 'Incomplete' | '--') {
    return cy.get('[data-test=todoStatusSelect]').click()
      .get(`mat-option:contains("${status}")`).click();
  }

  selectCategory(category: string) {
    return cy.get('[data-test=todoCategorySelect]').click()
      .get(`mat-option[value="${category}"]`).click();
  }

  selectSort(sortBy: 'owner' | 'category' | 'body' | 'status') {
    return cy.get('[data-test=todoSorterSelect]').click()
      .get(`mat-option[value="${sortBy}"]`).click();
  }
}
