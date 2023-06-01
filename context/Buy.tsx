"use client";
import { createContext, Dispatch, useReducer } from "react";

type TState = {
  show: boolean;
  item?: any;
  view?: "connect" | "product" | "currency";
};

type TAction =
  | { type: "set-view-connect"; payload?: any }
  | { type: "set-view-squid" }
  | { type: "reset" }
  | { type: "set-view-product"; payload?: any };

const initialState: TState = {
  show: false,
};

const BuyContext = createContext<{
  state: TState;
  dispatch: Dispatch<TAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "set-view-connect":
      return { ...state, show: true, item: action.payload, view: "connect" };
    case "set-view-squid":
      return { ...state, view: "currency" };
    case "reset":
      return { show: false };
    case "set-view-product":
      if (action.payload)
        return { ...state, show: true, item: action.payload, view: "product" };
      else return { ...state, view: "product" };
    default:
      return state;
  }
};

export const BuyProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <BuyContext.Provider value={value}>{children}</BuyContext.Provider>;
};

export const BuyConsumer = BuyContext.Consumer;
export default BuyContext;
