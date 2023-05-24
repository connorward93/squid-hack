"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import classes from "./header.module.css";

export default function Profile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        Connected to {address?.slice(0, 8)}
        {/* <button onClick={() => disconnect()}>Disconnect</button> */}
      </div>
    );
  return (
    <button className={classes.button} onClick={() => connect()}>
      Connect Wallet
    </button>
  );
}
