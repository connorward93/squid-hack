import { paths } from "@reservoir0x/reservoir-sdk";
import chains from "@/constants/chains";

type TokenSchema = paths["/tokens/v5"]["get"]["responses"]["200"]["schema"];

export const fetchTokens = async (options: { collection: string | null }) => {
  //   Default to ethereum
  const chain = chains[0];
  const response = await fetch(
    `${chain.reservoirBaseUrl}/tokens/v6?collection=${options.collection}`,
    {
      headers: {
        "x-api-key": chain.apiKey || "",
      },
    }
  );
  const json = (await response.json()) as TokenSchema;

  const { tokens } = json;
  return tokens;
};
