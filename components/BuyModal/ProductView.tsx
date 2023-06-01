"use client";
import BuyContext from "@/context/Buy";
import { useContext } from "react";
import { useFeeData } from "wagmi";
import Modal from "./Modal";
import Button from "../Button";
import classes from "./buy-modal.module.css";
import Product from "./Product";

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

  return (
    <Modal heading={"Complete checkout"}>
      <Product data={data} />

      <br />
      <div className={classes.actions}>
        <Button
          disabled
          label="Buy now"
          onClick={() => dispatch({ type: "set-view-connect" })}
        />
        <Button
          variant="squid"
          onClick={() => {
            dispatch({ type: "set-view-squid" });
          }}
        />
      </div>
    </Modal>
  );
}
