"use client";
import { ChangeEvent, useEffect, useState } from "react";
import InputRadio from "../InputRadio";

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

  return (
    <>
      <div>
        <div>PopularCollections</div>
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
      <table>
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
          {collections?.map((collection, i) => (
            <tr key={collection.slug}>
              <td>{i + 1}</td>
              <td>{collection.name}</td>
              <td>{collection.floorAsk?.price?.amount?.native}</td>
              <td>{collection.volume?.["1Day"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
