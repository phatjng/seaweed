import { OpenAPIHono } from "@hono/zod-openapi";
import { Variables } from "../index";
import { registerCreateSecretRoute } from "./create";

export const secretApi = new OpenAPIHono<{ Variables: Variables }>();

registerCreateSecretRoute(secretApi);
