import * as os from "node:os";
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { allureCypress } from "allure-cypress/reporter";
import cypressOnFix from "cypress-on-fix";

export default defineConfig({
  defaultBrowser: "chrome",
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      on = cypressOnFix(on);
      
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      allureCypress(on, config, {
        resultsDir: "allure-results",
        links: {
            jira: {
                urlTemplate: (v) => `https://jira.example.com/browse/${v}`,
            },
        },
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      });
      
      return config;
    },
    baseUrl: "https://uphillhealth.com", // optional
    env: {
      login_url: "https://id.uphillhealth.com/signin?service=uphillhealth.com&idpdomain=uphillchallenge&continue=https:%2F%2https://uphillhealth.com/uphillchallenge/desk?routePackageId=ROUTE_PACKAGE_AS_CHALLENGE&page=0&tab=2&phasesIds=*",
      allure: true,
    },
  },
});
