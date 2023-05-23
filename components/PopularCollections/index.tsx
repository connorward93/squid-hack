import { paths } from "@reservoir0x/reservoir-sdk";
import chains from "@/constants/chains";
import classes from "./popular-collections.module.css";

type CollectionSchema =
  paths["/collections/v5"]["get"]["responses"]["200"]["schema"];
type ChainCollections = Record<string, CollectionSchema>;

const fetchCollections = async () => {
  //   Default to ethereum
  const chain = chains[0];
  const response = await fetch(`${chain.reservoirBaseUrl}/collections/v5`, {
    headers: {
      "x-api-key": chain.apiKey || "",
    },
  });
  const json = await response.json();

  const { collections } = json;
  return collections;
  //   return {
  //     props: { ssr: { collections } },
  //     revalidate: 5,
  //   };
};

export default async function PopularCollections() {
  const collections = await fetchCollections();
  console.log(collections);

  return (
    <div>
      <div>PopularCollections</div>
      <ul>
        {collections.map((collection) => (
          <li key={collection.slug}>
            Name: {collection.name}. Volume(1day): {collection.volume["1day"]}
          </li>
        ))}
      </ul>
    </div>
  );
}
