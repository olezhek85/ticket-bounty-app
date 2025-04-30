import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { SearchParams } from "@/features/search-params";
import { TicketList } from "@/features/ticket/components/ticket-list";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All tickets"
        description="Tickets by everyone at one place"
      />

      <ErrorBoundary fallback={<Placeholder label="Something went wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList searchParams={await searchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
