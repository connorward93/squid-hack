"use client";
import { useContext } from "react";
import BuyContext from "@/context/Buy";
import classes from "./buy-modal.module.css";

export default function BuyModal() {
  const { state, dispatch } = useContext(BuyContext);

  if (!state.show) return null;

  return (
    <>
      <div
        className={classes.shim}
        onClick={() => dispatch({ type: "reset" })}
      />
      <div className={classes.modal}>BuyModal</div>
    </>
  );
}
