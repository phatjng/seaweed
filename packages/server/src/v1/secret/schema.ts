import { z as zapi } from "@hono/zod-openapi";

export const SecretSchema = zapi.object({
  id: zapi.string().openapi({
    description: "The ID of the secret",
    example: "sec_01J9DD8PXH4G151DV3Y8DDQ4F8",
  }),
  name: zapi.string().openapi({
    description: "The name of the secret",
    example: "MySecret",
  }),
  description: zapi
    .string()
    .openapi({
      description: "The description of the secret",
      example: "Description of the secret",
    })
    .optional(),
});
