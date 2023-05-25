import { createContext, Dispatch, useReducer } from "react";

type TState = {};

type TAction = { type: string; payload: any };

const initialState: TState = {};

const BuyContext = createContext<{
  state: TState;
  dispatch: Dispatch<TAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
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
