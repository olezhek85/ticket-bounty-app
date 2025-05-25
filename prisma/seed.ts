import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    name: "1@gmail.com",
    email: "1@gmail.com",
  },
  {
    name: "JohnDoe",
    email: "john.doe@example.com",
  },
  {
    name: "JaneDoe",
    email: "jane.doe@example.com",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "First ticket from the DB.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "Second ticket from the DB.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "Third ticket from the DB.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const comments = [
  { content: "First comment from the DB." },
  { content: "Second comment from the DB." },
  { content: "Third comment from the DB." },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started...");

  await prisma.comment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.email, 10),
    })),
  });

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[Math.floor(Math.random() * dbUsers.length)].id,
    })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      userId: dbUsers[0].id,
      ticketId: dbTickets[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
