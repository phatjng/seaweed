import { OpenAPIHono } from "@hono/zod-openapi";
import { Variables } from "../index";
import { registerLoginRoute } from "./login";

export const authApi = new OpenAPIHono<{ Variables: Variables }>();

registerLoginRoute(authApi);
