import type { PersistOptions } from "./flux";
import { createFluxStore, createPersistentFluxStore } from "./flux";

describe("createFluxStore()", () => {
  function create() {
    return createFluxStore({
      state: (): { values: string[] } => ({
        values: [],
      }),

      actions: {
        add(draft, value: string) {
          draft.values.push(value);
        },
        remove(draft, value: string) {
          draft.values.splice(draft.values.indexOf(value), 1);
        },
      },
    });
  }

  it("should invoke mutation on dispatch", () => {
    const useStore = create();
    useStore.dispatch("add", "foo");
    expect(useStore.getState().values).toEqual(["foo"]);
  });

  it("should be immutable", () => {
    const useStore = create();
    useStore.dispatch("add", "foo");
    const first = useStore.getState().values;
    useStore.dispatch("add", "foo");
    expect(useStore.getState().values).not.toBe(first);
  });

  it("should set state from api", () => {
    const useStore = create();
    useStore.setState((draft) => {
      draft.values.push("foo");
    });
    expect(useStore.getState().values).toEqual(["foo"]);
  });

  it("should set state from promise api", () => {
    const useStore = create();
    useStore.setState((draft) => {
      draft.values.push("foo");
    });
    expect(useStore.getState().values).toEqual(["foo"]);
  });
});

describe("createPersistentFluxStore()", () => {
  function create(
    {
      name = "values",
      version = 1,
      serialize,
      deserialize,
      include,
      exclude,
    }: PersistOptions<{ values: string[]; other: number }> = { name: "values" }
  ) {
    return createPersistentFluxStore({
      state: (): { values: string[]; other: number } => ({
        values: [],
        other: 0,
      }),

      actions: {
        add(draft, value: string) {
          draft.values.push(value);
        },
        remove(draft, value: string) {
          draft.values.splice(draft.values.indexOf(value), 1);
        },
      },

      options: {
        name,
        version,
        serialize,
        deserialize,
        include,
        exclude,
      },
    });
  }

  it("should invoke mutation on dispatch", () => {
    const useStore = create();
    useStore.dispatch("add", "foo");
    expect(useStore.getState().values).toEqual(["foo"]);
  });

  it("should be immutable", () => {
    const useStore = create();
    useStore.dispatch("add", "foo");
    const first = useStore.getState().values;
    useStore.dispatch("add", "foo");
    expect(useStore.getState().values).not.toBe(first);
  });

  it("should commit items to localStorage", () => {
    const useStore = create();

    useStore.dispatch("add", "foo");
    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({ state: { values: ["foo"], other: 0 }, version: 1 })
    );

    useStore.dispatch("add", "bar");
    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({
        state: { values: ["foo", "bar"], other: 0 },
        version: 1,
      })
    );
  });

  it("should exclude keys from localStorage", () => {
    const useStore = create({ name: "values", exclude: ["values"] });

    useStore.dispatch("add", "foo");
    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({ state: { other: 0 }, version: 1 })
    );
  });

  it("should not exclude keys from localStorage if include is defined", () => {
    const useStore = create({
      name: "values",
      include: ["values", "other"],
      exclude: ["values"],
    });

    useStore.dispatch("add", "foo");
    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({ state: { values: ["foo"], other: 0 }, version: 1 })
    );
  });

  it("should not include keys from localStorage", () => {
    const useStore = create({
      name: "values",
      include: ["other"],
    });

    useStore.dispatch("add", "foo");
    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({ state: { other: 0 }, version: 1 })
    );
  });

  it("should persist to localStorage from api setState", () => {
    const useStore = create({
      name: "values",
    });

    useStore.setState((draft) => {
      draft.other = 1;
    });

    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({ state: { values: [], other: 1 }, version: 1 })
    );
  });

  it("should clear items in localStorage if versions mismatch and reset with initialState", () => {
    const useStore = create();

    useStore.dispatch("add", "foo");
    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({ state: { values: ["foo"], other: 0 }, version: 1 })
    );

    const useStoreB = create({ name: "values", version: 2 });
    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({ state: { values: [], other: 0 }, version: 2 })
    );

    useStoreB.dispatch("add", "bar");
    expect(localStorage.getItem("values")).toBe(
      JSON.stringify({ state: { values: ["bar"], other: 0 }, version: 2 })
    );
  });
});
