"use client";
import { useContext } from "react";
import classes from "./collection-grid.module.css";
import BuyContext from "@/context/Buy";
import { useAccount } from "wagmi";

export default function CollectionGrid({ items }: any) {
  const { isConnected } = useAccount();
  const { dispatch } = useContext(BuyContext);

  return (
    <div className={classes.container}>
      {items.map(({ token, market }: any) => (
        <div
          key={token?.tokenId}
          className={classes.item}
          onClick={() => {
            if (isConnected)
              dispatch({
                type: "set-view-product",
                payload: { token, market },
              });
            else
              dispatch({
                type: "set-view-connect",
                payload: { token, market },
              });
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={token?.image} alt={token?.name} />
          <div className={classes.caption}>
            <div>{token?.name}</div>
            <div>
              {Math.round(market?.floorAsk?.price?.amount?.native * 100) / 100}{" "}
              {market?.floorAsk?.price?.currency?.symbol}
            </div>
          </div>
          <div className={classes.actions}>Buy now</div>
        </div>
      ))}
    </div>
  );
}
