import { paths } from "@reservoir0x/reservoir-sdk";
import chains from "@/constants/chains";

type TokenSchema = paths["/tokens/v5"]["get"]["responses"]["200"]["schema"];

export const fetchTokens = async (options: {
  chain: string;
  collection: string | null;
  continuation?: string | null;
}) => {
  let chain = options?.chain
    ? chains.find((chain) => chain.routePrefix == options.chain) || chains[0]
    : chains[0];

  const response = await fetch(
    `${chain.reservoirBaseUrl}/tokens/v6?collection=${options.collection}&sortBy=floorAskPrice`,
    {
      headers: {
        "x-api-key": chain.apiKey || "",
      },
    }
  );
  const json = (await response.json()) as TokenSchema;
  return json;
};
