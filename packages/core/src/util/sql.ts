import { integer } from "drizzle-orm/sqlite-core";
import { DateTime } from "luxon";

export const timestamps = {
  createdAt: integer("created_at")
    .$default(() => DateTime.now().toUnixInteger())
    .notNull(),
  updatedAt: integer("updated_at")
    .$default(() => DateTime.now().toUnixInteger())
    .$onUpdate(() => DateTime.now().toUnixInteger())
    .notNull(),
  deletedAt: integer("deleted_at"),
};
