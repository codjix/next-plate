import * as dz from "drizzle-orm/sqlite-core";

export const SharedColumns = {
  id: dz
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: dz
    .integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: dz
    .integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
};
