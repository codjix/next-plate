import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

export type $DB = typeof db;
export type $DBTrx = Parameters<Parameters<$DB["transaction"]>[0]>[0];
const url = process.env.DATABASE_URL ?? "./data/db.sqlite";

const db = drizzle(url, { schema });

export { db, schema };
