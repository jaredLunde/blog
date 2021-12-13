import produce from "immer";
import type { Draft } from "immer";
import omit from "lodash.omit";
import create from "zustand";
import type {
  GetState,
  State,
  StateCreator,
  StoreApi,
  UseBoundStore,
} from "zustand";
import { keys } from "@/utils/obj";

/**
 * Create a zustand store with immer and actions
 *
 * @param root0
 * @param root0.state
 * @param root0.actions
 */
export function createFluxStore<S extends State, M extends ActionTypes>({
  state,
  actions,
}: {
  state: StateCreator<
    S,
    SetFluxState<S>,
    GetState<S>,
    // @ts-expect-error
    StoreApiWithDispatch<S, M>
  >;
  actions: ActionsMap<S, M>;
}) {
  return create<
    S,
    SetFluxState<S>,
    GetState<S>,
    // @ts-expect-error
    StoreApiWithDispatch<S, M>
  >(immer(state, actions));
}

/**
 * Create a zustand store with immer and actions that persists to
 * localStorage or a user-defined storage with getItem/setItem methods.
 *
 * @param root0
 * @param root0.state
 * @param root0.actions
 * @param root0.options
 */
export function createPersistentFluxStore<
  S extends State,
  M extends ActionTypes
>({
  state,
  actions,
  options,
}: {
  state: StateCreator<
    S,
    SetFluxState<S>,
    GetState<S>,
    // @ts-expect-error
    StoreApiWithDispatch<S, M>
  >;
  actions: ActionsMap<S, M>;
  options: PersistOptions<S>;
}) {
  return create<
    S,
    SetFluxState<S>,
    GetState<S>,
    // @ts-expect-error
    StoreApiWithDispatch<S, M>
  >((set, get, api) => {
    return persistFlux(state, actions, {
      ...options,
      initialState: state(set, get, api),
    })(set, get, api);
  });
}

function immer<S extends State, M extends ActionTypes>(
  config: StateCreator<
    S,
    SetFluxState<S>,
    GetState<S>,
    // @ts-expect-error
    StoreApiWithDispatch<S, M>
  >,
  actions: ActionsMap<S, M>
): StateCreatorWithDispatch<S, M> {
  return (set, get, api) => {
    const savedSetState = api.setState;
    // @ts-expect-error
    api.setState = (fn) => savedSetState(produce(get(), fn));
    api.dispatch = <
      ActionType extends keyof typeof actions,
      ActionPayload extends M[ActionType]
    >(
      type: ActionType,
      ...payload: ActionPayload extends undefined ? [] : [ActionPayload]
    ) => {
      api.setState((state) => {
        actions[type](state, payload[0] as any, omit(api, "dispatch"));
      });
    };
    // @ts-expect-error
    return config((fn) => set(produce(get(), fn)), get, api);
  };
}

export function persistFlux<S extends State, M extends ActionTypes>(
  config: StateCreator<
    S,
    SetFluxState<S>,
    GetState<S>,
    // @ts-expect-error
    StoreApiWithDispatch<S, M>
  >,
  actions: ActionsMap<S, M>,
  {
    name,
    storage = localStorage,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    exclude,
    include,
    version = 1,
    initialState,
  }: PersistOptions<S> & { initialState: S }
): StateCreatorWithDispatch<S, M> {
  return (set, get, api) => {
    function setItem() {
      let state = {} as S;

      if (include) {
        keys(get())
          .filter((key) => include.includes(key))
          .forEach((key) => {
            state[key] = get()[key];
          });
      } else if (exclude) {
        keys(get())
          .filter((key) => !exclude.includes(key))
          .forEach((key) => {
            state[key] = get()[key];
          });
      } else {
        state = get();
      }

      storage.setItem(name, serialize({ state, version }));
    }

    const savedSetState = api.setState;

    api.setState = (fn) => {
      // @ts-expect-error
      savedSetState(produce(get(), fn));
      setItem();
    };

    const storageValue = storage.getItem(name);
    let deserializedStorageValue: StorageValue<S> | Record<string, never> = {};

    if (storageValue) {
      deserializedStorageValue = deserialize(storageValue);

      // if versions mismatch, clear storage by storing the new initial state
      if (deserializedStorageValue.version !== version) {
        set(initialState as any);
        deserializedStorageValue = initialState as any;
        setItem();
      }
    }

    function persistSet(fn: ProduceState<S>) {
      // @ts-expect-error
      set(produce(get(), fn));
      setItem();
    }

    api.dispatch = <
      ActionType extends keyof typeof actions,
      ActionPayload extends M[ActionType]
    >(
      type: ActionType,
      ...payload: ActionPayload extends undefined ? [] : [ActionPayload]
    ) => {
      persistSet((state) => {
        actions[type](state, payload[0] as any, omit(api, "dispatch"));
      });
    };

    return {
      ...config(persistSet, get, api),
      ...deserializedStorageValue.state,
    };
  };
}

export interface UseFluxStore<
  S extends State,
  M extends ActionTypes
> extends UseBoundStore<
    S,
    // @ts-expect-error
    StoreApiWithDispatch<S, M>
  > {}

export type StoreApiWithDispatch<S extends State, M extends ActionTypes> = Omit<
  StoreApi<S>,
  "setState"
> & {
  setState(fn: ProduceState<S>): void;
  dispatch<ActionType extends keyof M = keyof M>(
    type: ActionType,
    ...payload: M[ActionType] extends undefined ? [] : [M[ActionType]]
  ): void;
};

export type StoreApiWithoutDispatch<S extends State> = Omit<
  StoreApi<S>,
  "setState"
> & {
  setState(fn: ProduceState<S>): void;
};

export type StateCreatorWithDispatch<S extends State, M extends ActionTypes> = (
  set: SetFluxState<S>,
  get: GetState<S>,
  api: StoreApiWithDispatch<S, M>
) => S;

export type SetFluxState<S extends State> = (fn: ProduceState<S>) => void;
export type ProduceState<S extends State> = {
  (draft: Draft<S>): void | S;
};

export type PersistOptions<S extends State> = {
  /**
   * Name of the storage (must be unique)
   */
  name: string;
  /**
   * A function returning a storage.
   * The storage must fit `window.localStorage`'s api (or an async version of it).
   * For example the storage could be `AsyncStorage` from React Native.
   *
   * @default  localStorage
   */
  storage?: StateStorage;
  /**
   * Use a custom serializer.
   * The returned string will be stored in the storage.
   *
   * @default JSON.stringify
   */
  serialize?: (state: StorageValue<S>) => string;
  /**
   * Use a custom deserializer.
   *
   * @param str - The storage's current value.
   * @default JSON.parse
   */
  deserialize?: (str: string) => StorageValue<S>;
  /**
   * Only store the listed properties. This takes precedence over `exclude` when
   * both are included.
   */
  include?: (keyof S)[];
  /**
   * Prevent some items from being stored.
   */
  exclude?: (keyof S)[];
  /**
   * If the stored state's version mismatch the one specified here, the storage will not be used.
   * This is useful when adding a breaking change to your store.
   */
  version?: number;
};

export type StateStorage = {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
};
export type StorageValue<S> = { state: S; version: number };

type ActionTypes = Record<string, unknown>;
export type ActionsMap<S extends State, M extends ActionTypes> =
  | {
      [Type in keyof M]: Action<S, M, Type>;
    }
  | ((
      set: ProduceState<S>,
      get: GetState<S>
    ) => {
      [Type in keyof M]: Action<S, M, Type>;
    });

type Action<S extends State, M extends ActionTypes, T extends keyof M> = {
  (state: Draft<S>, payload: M[T], api: StoreApiWithoutDispatch<S>): S | void;
};
