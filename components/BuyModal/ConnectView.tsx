import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import classes from "./buy-modal.module.css";
import { useContext } from "react";
import BuyContext from "@/context/Buy";

export default function ConnectView() {
  const { dispatch } = useContext(BuyContext);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (isConnected) return null;

  return (
    <>
      <div>ConnectView</div>
      <p>You are not connected. Please connect your wallet to continue.</p>
      <button
        className={classes.button}
        onClick={() => {
          connect();
          dispatch({ type: "set-view-currency" });
        }}
      >
        Connect Wallet
      </button>
    </>
  );
}
