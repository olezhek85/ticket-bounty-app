import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  OPEN: "O",
  IN_PROGRESS: "I",
  DONE: "X",
};

const TicketsPage = () => {
  return (
    <div>
      <ul>
        {initialTickets.map((ticket) => (
          <li key={ticket.id}>
            <div className="flex items-center gap-2">
              <h2 className="text-lg">{ticket.title}</h2>
              <div className="text-xs">{TICKET_ICONS[ticket.status]}</div>
            </div>

            <Link href={ticketPath(ticket.id)} className="underline">
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsPage;
