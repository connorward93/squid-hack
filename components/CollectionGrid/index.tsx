import classes from "./collection-grid.module.css";

export default function CollectionGrid({ items }: any) {
  return (
    <div className={classes.container}>
      {items.map(({ token, market }: any) => (
        <div key={token?.tokenId} className={classes.item}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={token?.image} alt={token?.name} />
          <div className={classes.caption}>
            <div>{token?.name}</div>
            <div>
              {Math.round(market?.floorAsk?.price?.amount?.native * 100) / 100}{" "}
              {market?.floorAsk?.price?.currency?.symbol}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
