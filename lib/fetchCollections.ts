import { paths } from "@reservoir0x/reservoir-sdk";
import chains from "@/constants/chains";

type CollectionSchema =
  paths["/collections/v5"]["get"]["responses"]["200"]["schema"];

export const fetchCollections = async (options?: {
  filter?: string | null;
}) => {
  //   Default to ethereum
  const chain = chains[0];
  const response = await fetch(
    `${chain.reservoirBaseUrl}/collections/v5?sortBy=${
      options?.filter || "1Day"
    }Volume&limit=10`,
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
