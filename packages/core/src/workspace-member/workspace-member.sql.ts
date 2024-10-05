import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "../user/user.sql";
import { timestamps } from "../util/sql";
import { workspace } from "../workspace/workspace.sql";

export const workspaceMember = sqliteTable("workspace_members", {
  ...timestamps,

  id: text("id").primaryKey(),
  role: text("role", { enum: ["owner", "member"] }).notNull(),

  userID: text("user_id")
    .references(() => user.id)
    .notNull(),
  workspaceID: text("workspace_id")
    .references(() => workspace.id)
    .notNull(),
});
