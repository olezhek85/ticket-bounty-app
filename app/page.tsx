import Link from "next/link";
import { initialTickets } from "@/data";

const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg">HomePage</h2>

      <ul>
        {initialTickets.map((ticket) => (
          <li key={ticket.id}>
            <Link href={`/tickets/${ticket.id}`} className="underline">
              {ticket.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
