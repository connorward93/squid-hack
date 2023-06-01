"use client";
import { useContext, useState } from "react";
import classes from "./collection-grid.module.css";
import BuyContext from "@/context/Buy";
import { useAccount } from "wagmi";
import { useParams } from "next/navigation";
import { fetchTokens } from "@/lib/fetchTokens";
import Button from "../Button";
import { Spinner } from "../Loading";

export default function CollectionGrid({ items: defaultItems }: any) {
  const params = useParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [continuation, setContinuation] = useState(defaultItems.continuation);
  const [items, setItems] = useState(defaultItems.tokens);
  const { isConnected } = useAccount();
  const { dispatch } = useContext(BuyContext);

  const handleViewMore = async () => {
    setLoadingMore(true);
    const tokens = await fetchTokens({
      chain: params.chainId,
      collection: params.slug,
      continuation: continuation,
    });

    if (tokens?.tokens?.length) setItems([...items, ...tokens.tokens]);
    setContinuation(tokens.continuation);
    setLoadingMore(false);
  };

  return (
    <>
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
            <img src={token?.image || "/default.png"} alt={token?.name} />
            <div className={classes.caption}>
              <div>{token?.name}</div>
              <div>
                {Math.round(market?.floorAsk?.price?.amount?.native * 100) /
                  100}{" "}
                {market?.floorAsk?.price?.currency?.symbol}
              </div>
            </div>
            <div className={classes.actions}>Buy now</div>
          </div>
        ))}
      </div>
      <Button
        label={loadingMore ? <Spinner size="small" /> : "View More"}
        onClick={handleViewMore}
      />
    </>
  );
}
