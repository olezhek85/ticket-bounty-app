import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TicketsPage = () => {
  return (
    <div>
      <ul>
        {initialTickets.map((ticket) => (
          <li key={ticket.id}>
            <h3 className="text-lg">{ticket.title}</h3>

            <Link href={ticketPath(ticket.id.toString())} className="underline">
              View Ticket
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsPage;
