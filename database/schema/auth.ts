import { relations } from "drizzle-orm";
import * as dz from "drizzle-orm/sqlite-core";
import { SharedColumns } from "./shared";

export type $UserSelect = typeof user.$inferSelect;
export type $UserInsert = typeof user.$inferInsert;
export const user = dz.sqliteTable("user", {
  ...SharedColumns,
  name: dz.text("name").notNull(),
  email: dz.text("email").notNull().unique(),
  emailVerified: dz.integer("email_verified", { mode: "boolean" }).default(false).notNull(),
  username: dz.text("username").notNull().unique(),
  displayUsername: dz.text("display_username"),
  image: dz.text("image"),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export type $SessionSelect = typeof session.$inferSelect;
export type $SessionInsert = typeof session.$inferInsert;
export const session = dz.sqliteTable(
  "session",
  {
    ...SharedColumns,
    expiresAt: dz.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    token: dz.text("token").notNull().unique(),
    ipAddress: dz.text("ip_address"),
    userAgent: dz.text("user_agent"),
    userId: dz
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [dz.index("session_userId_idx").on(table.userId)],
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export type $VerificationSelect = typeof verification.$inferSelect;
export type $VerificationInsert = typeof verification.$inferInsert;
export const verification = dz.sqliteTable(
  "verification",
  {
    ...SharedColumns,
    identifier: dz.text("identifier").notNull(),
    expiresAt: dz.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    value: dz.text("value").notNull(),
  },
  (table) => [dz.index("verification_identifier_idx").on(table.identifier)],
);

export type $AccountSelect = typeof account.$inferSelect;
export type $AccountInsert = typeof account.$inferInsert;
export const account = dz.sqliteTable(
  "account",
  {
    ...SharedColumns,
    accountId: dz.text("account_id").notNull(),
    providerId: dz.text("provider_id").notNull(),
    accessToken: dz.text("access_token"),
    refreshToken: dz.text("refresh_token"),
    accessTokenExpiresAt: dz.integer("access_token_expires_at", { mode: "timestamp_ms" }),
    refreshTokenExpiresAt: dz.integer("refresh_token_expires_at", { mode: "timestamp_ms" }),
    password: dz.text("password"),
    idToken: dz.text("id_token"),
    scope: dz.text("scope"),
    userId: dz
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [dz.index("account_userId_idx").on(table.userId)],
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
