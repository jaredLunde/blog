import "@testing-library/jest-dom";
import type { matchers } from "@dash-ui/jest";

declare global {
  namespace jest {
    interface Matchers<R = void>
      extends ReturnType<typeof matchers>,
        Testing.LibraryJestMatchers<R> {}
  }
}

export {};
