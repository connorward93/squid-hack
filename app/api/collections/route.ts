import { NextResponse } from "next/server";
import { fetchCollections } from "@/lib/fetchCollections";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");
  const collections = await fetchCollections({ filter });
  return NextResponse.json({ collections });
}
