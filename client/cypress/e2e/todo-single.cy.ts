import { TodoByIdPage } from "cypress/support/todo-by-id.po";

const page = new TodoByIdPage();

/*
"_id": "58895985a22c04e761776d54",
"owner": "Blanche",
"status": false,
"body": "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
"category": "software design"
 */

describe('Display of a single todo by ID',( ) => {

  beforeEach(() => {
    page.navigateToById('58895985a22c04e761776d54');
  });

  it('Should have the correct page title', () => {
    page.getPageTitle().should('eq', 'Todo Details');
  });

});
