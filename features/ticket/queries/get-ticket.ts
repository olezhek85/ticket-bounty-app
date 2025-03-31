import { initialTickets } from "@/data";
import { Ticket } from "@/features/ticket/types";

export const getTicket = async (id: string): Promise<Ticket | null> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Promise((resolve) => {
    const ticket = initialTickets.find((ticket) => ticket.id === id);
    resolve(ticket || null);
  });
};
