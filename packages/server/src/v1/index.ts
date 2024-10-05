import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authApi } from "./auth";
import { secretApi } from "./secret";

export type Variables = {};

export const api = new OpenAPIHono<{ Variables: Variables }>();

api.use("/openapi", cors());

api.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Seaweed API",
  },
});

api.get(
  "/",
  apiReference({
    spec: {
      url: "/v1/openapi",
    },
  }),
);

api.use("/*", logger());

// Routes
api.route("/auth", authApi);
api.route("/secret", secretApi);
