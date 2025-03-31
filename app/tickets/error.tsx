"use client";

import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { homePath } from "@/paths";

type TicketErrorProps = {
  error: Error;
};

export default function TicketError({ error }: TicketErrorProps) {
  return (
    <Placeholder
      label={error.message || "Something went wrong"}
      button={
        <Button asChild variant="outline">
          <Link href={homePath()}>Go to Home</Link>
        </Button>
      }
    />
  );
}
