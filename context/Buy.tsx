"use client";
import { createContext, Dispatch, useReducer } from "react";

type TState = {
  show: boolean;
  item?: any;
};

type TAction = { type: "set-token-buy"; payload: any };

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
    case "set-token-buy":
      return { ...state, show: true, item: action.payload };
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
