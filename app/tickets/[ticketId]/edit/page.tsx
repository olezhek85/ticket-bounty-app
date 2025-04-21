import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { auth } from "@/lib/auth/auth";

type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const session = await auth();

  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(session, ticket);

  if (!isTicketFound || !isTicketOwner) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        content={<TicketUpsertForm ticket={ticket} />}
        className="w-full max-w-[420px] self-center animate-[var(--animation-fade-from-top)]"
      />
    </div>
  );
};
export default TicketEditPage;
