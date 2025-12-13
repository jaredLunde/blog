require("@testing-library/jest-dom");
require("@testing-library/jest-dom/extend-expect");
const mockRouter = require("next-router-mock").default;
const { matchers } = require("@dash-ui/jest");

/**
 * Adds matchers for toHaveStyleRule from @dash-ui/jest
 * @see https://github.com/dash-ui/jest
 */
expect.extend(matchers);

/**
 * Adds mock for Next.js router before each test
 * @see https://github.com/scottrippey/next-router-mock#sync-vs-async
 */
jest.mock("next/dist/client/router", () => require("next-router-mock"));
jest.mock("next/router", () => require("next-router-mock"));

beforeEach(() => {
  // Resets the mock router to index before each test
  mockRouter.setCurrentUrl("/");
});

afterEach(() => {
  // Clears all mocks after each test
  jest.clearAllMocks();
  // Clears local storage after each test
  typeof localStorage !== "undefined" && localStorage.clear();
});

beforeAll(() => {
  // Instructs Jest to use fake versions of the standard timer functions.
  jest.useFakeTimers();
  /**
   * Turns off the warning about not using act()
   * @see https://github.com/reactwg/react-18/discussions/102
   */
  (global as any).IS_REACT_ACT_ENVIRONMENT = true;
});

// Make this file a module for TypeScript
export {};
