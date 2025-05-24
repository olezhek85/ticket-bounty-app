import { searchParamsCache } from "@/features/search-params";
import { getTickets } from "@/features/ticket/queries/get-tickets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const untypedSearchParams = Object.fromEntries(searchParams.entries());
  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);

  const { list, metadata } = await getTickets(undefined, typedSearchParams);

  return Response.json({ list, metadata });
}
