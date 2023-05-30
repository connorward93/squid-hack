import Buy from "./Buy";

export default function BuyView({ data }: any) {
  return (
    <>
      <div>Buy {data.token.name || data.token.tokenId}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={data.token.image} alt={data.token.name} />
      <div>
        Price: {data.market.floorAsk.price.amount.native}{" "}
        {data.market.floorAsk.price.currency.symbol}
      </div>
      <div>
        <Buy token={data} />
      </div>
    </>
  );
}
