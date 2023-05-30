"use client";
import { useCallback, useContext } from "react";
import BuyContext from "@/context/Buy";
import { useAccount } from "wagmi";
import ConnectView from "./ConnectView";
import CurrencyView from "./CurrencyView";
import BuyView from "./ProductView";
import classes from "./buy-modal.module.css";

export default function BuyModal() {
  const {
    state: { view, show, item },
    dispatch,
  } = useContext(BuyContext);
  const { isConnected } = useAccount();

  const renderModal = useCallback(() => {
    switch (view) {
      case "connect":
        return <ConnectView />;
      case "product":
        return <BuyView data={item} />;
      case "currency":
        return <CurrencyView />;
    }
  }, [item, view]);

  if (!show) return null;

  return (
    <>
      <div
        className={classes.shim}
        onClick={() => dispatch({ type: "reset" })}
      />
      <div className={classes.modal}>{renderModal()}</div>
    </>
  );
}
