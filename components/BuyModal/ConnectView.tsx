import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useContext, useEffect } from "react";
import BuyContext from "@/context/Buy";
import Modal from "./Modal";
import Button from "../Button";
import classes from "./buy-modal.module.css";

export default function ConnectView() {
  const { dispatch } = useContext(BuyContext);
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (isConnected) dispatch({ type: "set-view-product" });
  }, [dispatch, isConnected]);

  return (
    <Modal heading="Connect wallet">
      <p>Please connect your wallet to continue.</p>
      <Button
        label="Connect wallet"
        onClick={() => {
          connect();
        }}
      />
    </Modal>
  );
}
