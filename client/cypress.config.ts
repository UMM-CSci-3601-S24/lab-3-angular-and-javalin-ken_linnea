import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'bqm9o6',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require('./cypress/plugins/index.ts').default(on, config);
    },
  },
});
