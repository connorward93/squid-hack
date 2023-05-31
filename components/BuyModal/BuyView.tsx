"use client";
import { useContext } from "react";
import BuyContext from "@/context/Buy";
import { erc721ABI } from "@wagmi/core";
import { useAccount, useContractWrite } from "wagmi";
import { useFeeData } from "wagmi";

export default function BuyView({ data }: any) {
  const {
    state: { item: token },
  } = useContext(BuyContext);
  const { data: feeData, isError } = useFeeData();
  const currency = data.market.floorAsk.price.currency.symbol;

  const {
    data: contractData,
    isSuccess,
    write,
  } = useContractWrite({
    address: token.token.contract,
    abi: erc721ABI,
    functionName: "safeTransferFrom",
  });

  // const Fee = () => {
  //   // if (isLoading) return <div>Fetching fee data…</div>;
  //   // if (isError) return <div>Error fetching fee data</div>;
  //   return (
  //     <div>
  //       Fee: {feeData?.formatted.gasPrice} {currency}
  //     </div>
  //   );
  // };

  // const buy = () => write({ args: [owner, address, token.token.tokenId] });

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
      <div></div>
    </>
  );
}
