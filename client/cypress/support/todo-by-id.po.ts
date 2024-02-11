/*
"_id": "58895985a22c04e761776d54",
"owner": "Blanche",
"status": false,
"body": "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
"category": "software design"
 */

export class TodoByIdPage {
  navigateToById(id: string) {
    return cy.visit('/todos/' + id);
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
}
