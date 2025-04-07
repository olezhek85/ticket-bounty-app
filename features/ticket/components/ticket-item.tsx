import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ticketEditPath, ticketPath } from "@/paths";
import Link from "next/link";
import { TICKET_ICONS } from "@/features/ticket/constants";
import {
  LucideEllipsisVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Prisma } from "@prisma/client";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "@/features/ticket/components/ticket-more-menu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: true;
    };
  }>;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail = false }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="ghost">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button asChild variant="ghost">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="ghost" size="icon">
          <LucideEllipsisVertical className="w-4 h-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center truncate">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {ticket.deadline} by {ticket.user?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};

export { TicketItem };
