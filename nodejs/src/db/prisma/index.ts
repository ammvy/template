import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.HOST || "127.0.0.1",
  port: Number(process.env.PORT) || 3307,
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "password",
  database: process.env.DATABASE || "tasks_db",
  connectionLimit: Number(process.env.CONNECTIONLIMIT) || 5,
});

export const prisma = new PrismaClient({ adapter });
