"use client";
import { createContext, useEffect, useState } from "react";
import { squid } from "@/lib/squid";
import { Squid } from "@0xsquid/sdk";

type TState = {
  loading: boolean;
  squid?: Squid;
};

const initialState: TState = {
  loading: true,
};

const SquidContext = createContext<{
  state: TState;
  setState: Function;
}>({
  state: initialState,
  setState: () => {},
});

export const SquidProvider = ({ children }: { children: JSX.Element }) => {
  const [state, setState] = useState(initialState);
  const value = { state, setState };

  useEffect(() => {
    (async () => {
      await squid.init();
      setState({ loading: false, squid });
    })();
  }, []);

  return (
    <SquidContext.Provider value={value}>{children}</SquidContext.Provider>
  );
};

export const SquidConsumer = SquidContext.Consumer;
export default SquidContext;
