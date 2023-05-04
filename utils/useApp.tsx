import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type RefObject
} from "react";

// https://react.dev/reference/react/useContext
// https://react.dev/learn/scaling-up-with-reducer-and-context
// https://www.fabiobiondi.dev/blog/2023-01/how-to-safely-type-usereducer-in-react-and-typescript
// https://www.robinwieruch.de/react-usereducer-vs-usestate
// https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext

// State
type AppState = {
  skipLinkTargetRef: RefObject<HTMLHeadingElement> | null;
  bodyScrollLocked: boolean;
  bodyContentHidden: boolean;
};

const initialState: AppState = {
  skipLinkTargetRef: null,
  bodyScrollLocked: false,
  bodyContentHidden: false
};

// Context
// Defining `Dispatch` type: https://stackoverflow.com/a/72281820/1243086
const AppContext = createContext(initialState);
const AppDispatchContext = createContext((() => undefined) as Dispatch<AppActions>);

// Actions
export const SET_SKIP_LINK_TARGET = "setSkipLinkTarget";
export const LOCK_BODY_SCROLL = "lockBodyScroll";
export const HIDE_BODY_CONTENT = "hideBodyContent";

type SetSkipLinkTarget = {
  type: typeof SET_SKIP_LINK_TARGET;
  payload: RefObject<HTMLHeadingElement>;
};
type LockBodyScroll = {
  type: typeof LOCK_BODY_SCROLL;
  payload: boolean;
};
type HideBodyContent = {
  type: typeof HIDE_BODY_CONTENT;
  payload: boolean;
};
type AppActions = SetSkipLinkTarget | LockBodyScroll | HideBodyContent;

// Reducer
function appReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case SET_SKIP_LINK_TARGET:
      return {
        ...state,
        skipLinkTargetRef: action.payload
      };
    case LOCK_BODY_SCROLL:
      return {
        ...state,
        bodyScrollLocked: action.payload
      };
    case HIDE_BODY_CONTENT:
      return {
        ...state,
        bodyContentHidden: action.payload
      };
    default:
      throw Error("Unknown action");
  }
}

// Provider
// Defining `children` types: https://blog.logrocket.com/using-react-children-prop-with-typescript/
export function AppProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [app, dispatchApp] = useReducer(appReducer, initialState);

  useEffect(() => {
    document.body.classList[app.bodyScrollLocked ? "add" : "remove"]("u-no-scroll--not-fixed");
    return () => {
      document.body.classList.remove("u-no-scroll--not-fixed");
    };
  }, [app.bodyScrollLocked]);

  useEffect(() => {
    document.body.classList[app.bodyContentHidden ? "add" : "remove"]("u-content-hidden");
    return () => {
      document.body.classList.remove("u-content-hidden");
    };
  }, [app.bodyContentHidden]);

  return (
    <AppContext.Provider value={app}>
      <AppDispatchContext.Provider value={dispatchApp}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

// Convenience wrapper
export function useApp() {
  return { app: useContext(AppContext), dispatchApp: useContext(AppDispatchContext) };
}
