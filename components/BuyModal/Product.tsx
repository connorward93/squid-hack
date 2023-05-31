import classes from "./buy-modal.module.css";

export default function Product({ data }: any) {
  return (
    <div className={classes.product}>
      <div className={classes.image}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.token.image} alt={data.token.name} />
      </div>
      <div className={classes.details}>
        <div>
          <div>#{data.token.tokenId}</div>
          <div className={classes.collection}>{data.token.collection.name}</div>
        </div>
        <div className={classes.price}>
          <div>
            {data.market.floorAsk.price.amount.native}{" "}
            {data.market.floorAsk.price.currency.symbol}
          </div>
          <div className={classes.fiat}>
            US${Math.round(data.market.floorAsk.price.amount.usd * 100) / 100}
          </div>
        </div>
      </div>
    </div>
  );
}
