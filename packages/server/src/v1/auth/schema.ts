import { z as zapi } from "@hono/zod-openapi";

export const AuthSchema = zapi.object({
  email: zapi.string().openapi({
    description: "User email",
  }),
  password: zapi.string().openapi({
    description: "User password",
  }),
});

export const AuthTokenSchema = zapi.object({
  token: zapi.string().openapi({
    description: "Authentication token",
  }),
});
