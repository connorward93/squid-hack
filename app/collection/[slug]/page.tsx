import { fetchTokens } from "@/lib/fetchTokens";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const tokens = await fetchTokens({ collection: params.slug });
  if (!tokens) notFound();
  return <div>Collection</div>;
}
