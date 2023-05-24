import { paths } from "@reservoir0x/reservoir-sdk";
import chains from "@/constants/chains";
import classes from "./popular-collections.module.css";

type CollectionSchema =
  paths["/collections/v5"]["get"]["responses"]["200"]["schema"];

const fetchCollections = async () => {
  //   Default to ethereum
  const chain = chains[0];
  const response = await fetch(
    `${chain.reservoirBaseUrl}/collections/v5?sortBy=1DayVolume`,
    {
      headers: {
        "x-api-key": chain.apiKey || "",
      },
    }
  );
  const json = (await response.json()) as CollectionSchema;

  const { collections } = json;
  return collections;
};

export default async function PopularCollections() {
  const collections = await fetchCollections();
  console.log(collections);

  return (
    <div>
      <div>PopularCollections</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Volume - 1 day</th>
            <th>Volume - 7 day</th>
            <th>Volume - 30 day</th>
            <th>Volume - all time</th>
          </tr>
        </thead>
        <tbody>
          {collections?.map((collection) => (
            <tr key={collection.slug}>
              <td>{collection.name}</td>
              <td>{collection.volume?.["1day"]}</td>
              <td>{collection.volume?.["7day"]}</td>
              <td>{collection.volume?.["30day"]}</td>
              <td>{collection.volume?.["allTime"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
