import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../util/sql";
import { workspace } from "../workspace/workspace.sql";

export const secret = sqliteTable("secrets", {
  ...timestamps,

  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  encryptedValue: text("encrypted_value").notNull(),

  workspaceID: text("workspace_id")
    .references(() => workspace.id)
    .notNull(),
});
