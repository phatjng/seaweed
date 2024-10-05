import { createRoute } from "@hono/zod-openapi";
import { secretApi } from "./index";
import { SecretSchema } from "./schema";

const createSecretRoute = createRoute({
  method: "post",
  tags: ["secret"],
  description: "Create a new secret",
  path: "/",
  request: {
    body: {
      description: "The secret to create",
      content: {
        "application/json": {
          schema: SecretSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SecretSchema,
        },
      },
      description: "The created secret",
    },
  },
});

export function registerCreateSecretRoute(api: typeof secretApi) {
  return api.openapi(createSecretRoute, async (c) => {
    return c.json({
      id: "sec_01J9DD8PXH4G151DV3Y8DDQ4F8",
      name: "MySecret",
      description: "A secret that is used for authentication",
    });
  });
}
