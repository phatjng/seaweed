import { Hono } from "hono";
import { api } from "./v1";

const app = new Hono();

// Health check
app.get("/health", (c) => c.text("OK"));

// API routes
app.route("/v1", api);

const server = { port: 8080, fetch: app.fetch };

export default server;
