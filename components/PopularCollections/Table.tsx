"use client";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import InputRadio from "../InputRadio";
import Link from "next/link";
import Image from "next/image";
import classes from "./popular-collections.module.css";

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
  const [collections, setCollections] = useState(defaultCollections);
  const [filter, setFilter] = useState<"1Day" | "7Day" | "30Day" | "allTime">(
    "1Day"
  );

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFilter(e.target.value);
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
      const request = await fetch(`api/collections?filter=${filter}`, {
        method: "GET",
      });
      const { collections } = await request.json();
      setCollections(collections);
    };
    fetchCollections();
  }, [filter]);

  console.log(collections);

  return (
    <>
      <div className={classes.header}>
        <div>Popular Collections</div>
        <div>
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
        <tbody>
          {/* @ts-ignore */}
          {collections?.map((collection, i) => {
            const currency = collection?.floorAsk?.price?.currency?.symbol;
            return (
              <tr key={collection.id}>
                <TableCell href={`/collection/${collection.id}`}>
                  {i + 1}
                </TableCell>
                <TableCell href={`/collection/${collection.id}`}>
                  <div className={classes.collection}>
                    <div className={classes.image}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={collection.image} alt={collection.name} />
                    </div>
                    <span>{collection.name}</span>
                  </div>
                </TableCell>
                <TableCell href={`/collection/${collection.id}`}>
                  {collection.floorAsk?.price?.amount?.native} {currency}
                </TableCell>
                <TableCell href={`/collection/${collection.id}`}>
                  {renderVolume(collection)} {currency}
                </TableCell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
