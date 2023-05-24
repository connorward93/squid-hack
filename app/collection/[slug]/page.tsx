import { fetchTokens } from "@/lib/fetchTokens";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const tokens = await fetchTokens({ collection: params.slug });
  if (!tokens) notFound();

  console.log(tokens[0].market);
  return (
    <div>
      <div>Collection</div>
      <ul>
        {tokens.map(({ token, market }) => (
          <li key={token?.tokenId}>
            <img src={token?.image} width="100" />
            {token?.name} - {market?.floorAsk?.price?.amount?.native}{" "}
            {market?.floorAsk?.price?.currency?.symbol}
          </li>
        ))}
      </ul>
    </div>
  );
}
