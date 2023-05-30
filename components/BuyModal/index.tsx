"use client";
import { useCallback, useContext } from "react";
import BuyContext from "@/context/Buy";
import { useAccount } from "wagmi";
import ConnectView from "./ConnectView";
import BuyView from "./BuyView";
import classes from "./buy-modal.module.css";

export default function BuyModal() {
  const {
    state: { show, item },
    dispatch,
  } = useContext(BuyContext);
  const { isConnected } = useAccount();

  const renderModal = useCallback(() => {
    if (!isConnected) return <ConnectView />;
    else return <BuyView data={item} />;
  }, [isConnected, item]);

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
