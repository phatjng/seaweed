import { createRoute } from "@hono/zod-openapi";
import { authApi } from "./index";
import { AuthSchema, AuthTokenSchema } from "./schema";

const createLoginRoute = createRoute({
  method: "post",
  tags: ["auth"],
  description: "Authenticate a user",
  path: "/",
  request: {
    body: {
      description: "User credentials",
      content: {
        "application/json": {
          schema: AuthSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: AuthTokenSchema,
        },
      },
      description: "Authentication token",
    },
  },
});

export function registerLoginRoute(api: typeof authApi) {
  return api.openapi(createLoginRoute, async (c) => {
    return c.json({
      token: "",
    });
  });
}
