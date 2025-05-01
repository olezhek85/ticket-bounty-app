import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { searchParamsCache } from "@/features/search-params";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { auth } from "@/lib/auth/auth";

type TicketsPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const session = await auth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <ErrorBoundary fallback={<Placeholder label="Something went wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList
            userId={session?.user?.id}
            searchParams={await searchParamsCache.parse(searchParams)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
