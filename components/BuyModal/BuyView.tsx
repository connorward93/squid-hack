"use client";
import Buy from "./Buy";
import { useFeeData } from "wagmi";

export default function BuyView({ data }: any) {
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
    <>
      <div>Buy {data.token.name || data.token.tokenId}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={data.token.image} alt={data.token.name} />
      <div>
        Price: {data.market.floorAsk.price.amount.native} {currency}
      </div>
      {/* <div>
        <Fee />
      </div>
      <div>
        Total:{" "}
        {feeData?.formatted.gasPrice
          ? parseInt(data.market.floorAsk.price.amount.native) +
            parseInt(feeData?.formatted.gasPrice)
          : null}{" "}
        {currency}
      </div> */}

      <br />
      <div>
        <Buy token={data} />
      </div>
    </>
  );
}
