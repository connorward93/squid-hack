import { paths } from "@reservoir0x/reservoir-sdk";
import chains from "@/constants/chains";

type CollectionSchema =
  paths["/collections/v5"]["get"]["responses"]["200"]["schema"];

export const fetchCollections = async (options?: {
  chain?: any | null;
  filter?: string | null;
  continuation?: string | null;
}) => {
  let chain = options?.chain
    ? chains.find((chain) => chain.routePrefix == options.chain) || chains[0]
    : chains[0];

  const response = await fetch(
    `${chain.reservoirBaseUrl}/collections/v5?sortBy=${
      options?.filter || "1Day"
    }Volume&limit=20${
      options?.continuation ? `&continuation=${options?.continuation}` : ""
    }`,
    {
      headers: {
        "x-api-key": chain.apiKey || "",
      },
    }
  );
  const json = (await response.json()) as { collections: CollectionSchema };

  return json;
};
