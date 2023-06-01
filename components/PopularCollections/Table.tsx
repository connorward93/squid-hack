"use client";
import {
  ChangeEvent,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import InputRadio from "../InputRadio";
import chains from "@/constants/chains";
import classes from "./popular-collections.module.css";
import ETH from "../Icons/ETH";
import Polygon from "../Icons/Polygon";
import Arbitrum from "../Icons/Arbitrum";
import Optimism from "../Icons/Optimism";
import Goerli from "../Icons/Goerli";
import Button from "../Button";
import { Spinner } from "../Loading";

const renderIcon = (network: string) => {
  switch (network) {
    case "homestead":
      return <ETH />;
    case "matic":
      return <Polygon />;
    case "arbitrum":
      return <Arbitrum />;
    case "optimism":
      return <Optimism />;
    case "goerli":
      return <Goerli />;
    default:
      return network;
  }
};

const TableCell = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <td>
      <Link href={href}>{children}</Link>
    </td>
  );
};

export default function Table({
  defaultCollections,
}: {
  defaultCollections: any;
}) {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [chain, setChain] = useState("ethereum");
  const [continuation, setContinuation] = useState(
    defaultCollections.continuation
  );
  const [collections, setCollections] = useState(
    defaultCollections.collections
  );
  const [filter, setFilter] = useState<"1Day" | "7Day" | "30Day" | "allTime">(
    "1Day"
  );

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFilter(e.target.value);
    setLoading(true);
  };

  const handleChain = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setChain(e.target.value);
    setLoading(true);
  };

  const renderVolume = (collection: any) => {
    switch (filter) {
      case "1Day":
        return Math.round(collection.volume["1day"]);
      case "7Day":
        return Math.round(collection.volume["7day"]);
      case "30Day":
        return Math.round(collection.volume["30day"]);
      case "allTime":
        return Math.round(collection.volume.allTime);
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchCollections = async () => {
      const request = await fetch(
        `api/collections?filter=${filter}&chain=${chain}`,
        {
          method: "GET",
        }
      );
      const { collections } = await request.json();
      setLoading(false);
      setCollections(collections.collections);
      setContinuation(collections.continuation);
    };
    fetchCollections();
  }, [filter, chain]);

  const handleViewMore = useCallback(async () => {
    setLoadingMore(true);
    const request = await fetch(
      `api/collections?limit=20&filter=${filter}&chain=${chain}&continuation=${continuation}`,
      {
        method: "GET",
      }
    );
    const { collections: newCollections } = await request.json();
    setLoadingMore(false);
    setCollections([...collections, ...newCollections.collections]);
    setContinuation(newCollections.continuation);
  }, [chain, collections, continuation, filter]);

  return (
    <>
      <div className={classes.header}>
        <div>Popular Collections</div>
        <div className={classes.actions}>
          <InputRadio
            items={[
              { value: "1Day", label: "1d" },
              { value: "7Day", label: "7d" },
              { value: "30Day", label: "30d" },
              { value: "allTime", label: "All" },
            ]}
            isChecked={(value: string) => filter === value}
            onChange={handleFilter}
          />
          <InputRadio
            items={chains.map((chain) => ({
              value: chain.routePrefix,
              label: renderIcon(chain.network),
            }))}
            isChecked={(value: string) => chain === value}
            onChange={handleChain}
          />
        </div>
      </div>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Floor Price</th>
            <th>Volume</th>
          </tr>
        </thead>
        {loading ? (
          <div className={classes.spinner}>
            <Spinner />
          </div>
        ) : (
          <tbody>
            {/* @ts-ignore */}
            {collections?.map((collection, i) => {
              const currency = collection?.floorAsk?.price?.currency?.symbol;
              return (
                <tr key={collection.id}>
                  <TableCell href={`/collection/${chain}/${collection.id}`}>
                    {i + 1}
                  </TableCell>
                  <TableCell href={`/collection/${chain}/${collection.id}`}>
                    <div className={classes.collection}>
                      <div className={classes.image}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={collection.image || "/default.png"}
                          alt={collection.name}
                        />
                      </div>
                      <span>{collection.name}</span>
                    </div>
                  </TableCell>
                  <TableCell href={`/collection/${chain}/${collection.id}`}>
                    {collection.floorAsk?.price?.amount?.native} {currency}
                  </TableCell>
                  <TableCell href={`/collection/${chain}/${collection.id}`}>
                    {renderVolume(collection)} {currency}
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {loading ? null : (
        <Button
          label={loadingMore ? <Spinner size="small" /> : "View more"}
          onClick={handleViewMore}
        />
      )}
    </>
  );
}
