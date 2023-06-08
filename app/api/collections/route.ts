import { NextResponse } from "next/server";
import { fetchCollections } from "@/lib/fetchCollections";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");
  const chain = searchParams.get("chain");
  const continuation = searchParams.get("continuation");
  const collections = await fetchCollections({ filter, chain, continuation });
  return NextResponse.json({ collections });
}
