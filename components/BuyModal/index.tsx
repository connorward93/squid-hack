"use client";
import { useContext } from "react";
import BuyContext from "@/context/Buy";
import Buy from "./Buy";
import classes from "./buy-modal.module.css";

export default function BuyModal() {
  const {
    state: { show, item },
    dispatch,
  } = useContext(BuyContext);

  if (!show) return null;

  return (
    <>
      <div
        className={classes.shim}
        onClick={() => dispatch({ type: "reset" })}
      />
      <div className={classes.modal}>
        <div>Buy {item.token.name}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.token.image} alt={item.token.name} />
        <div>
          Price: {item.market.floorAsk.price.amount.native}{" "}
          {item.market.floorAsk.price.currency.symbol}
        </div>
        <div>
          <Buy />
        </div>
      </div>
    </>
  );
}
