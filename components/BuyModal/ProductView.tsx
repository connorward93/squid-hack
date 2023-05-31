"use client";
import BuyContext from "@/context/Buy";
import { useContext } from "react";
import { useFeeData } from "wagmi";
import Modal from "./Modal";
import Button from "../Button";
import classes from "./buy-modal.module.css";

export default function BuyView({ data }: any) {
  const { dispatch } = useContext(BuyContext);
  const { data: feeData, isError, isLoading } = useFeeData();
  const currency = data.market.floorAsk.price.currency.symbol;

  const Fee = () => {
    if (isLoading) return <div>Fetching fee data…</div>;
    if (isError) return <div>Error fetching fee data</div>;
    return (
      <div>
        Fee: {feeData?.formatted.gasPrice} {currency}
      </div>
    );
  };

  console.log(data);

  return (
    <Modal heading={"Complete checkout"}>
      <div className={classes.product}>
        <div className={classes.image}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.token.image} alt={data.token.name} />
        </div>
        <div className={classes.details}>
          <div>
            <div>{data.token.name || data.token.tokenId}</div>
            <div>{data.token.collection.name}</div>
          </div>
          <div className={classes.price}>
            {data.market.floorAsk.price.amount.native} {currency}
          </div>
        </div>
      </div>

      <br />
      <div className={classes.actions}>
        <Button
          label="Buy now"
          onClick={() => dispatch({ type: "set-view-connect" })}
        />
        <Button variant="squid" onClick={() => {}} />
      </div>
    </Modal>
  );
}
