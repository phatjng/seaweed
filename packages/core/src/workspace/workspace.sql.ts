import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../util/sql";

export const workspace = sqliteTable("workspaces", {
  ...timestamps,

  id: text("id").primaryKey(),
});
