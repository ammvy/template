import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";
import "dotenv/config";

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL || "postgresql://postgres:password@127.0.0.1:5432/tasks_db",
});

export const db = drizzle(pool, { schema });
