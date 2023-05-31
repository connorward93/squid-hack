import CollectionGrid from "@/components/CollectionGrid";
import { fetchTokens } from "@/lib/fetchTokens";
import { notFound } from "next/navigation";
import classes from "./page.module.css";

export default async function Page({
  params,
}: {
  params: { chainId: string; slug: string };
}) {
  const tokens = await fetchTokens({
    chain: params.chainId,
    collection: params.slug,
  });
  if (!tokens) notFound();

  return (
    <div className={classes.container}>
      <div>Collection</div>
      <CollectionGrid items={tokens} />
    </div>
  );
}
