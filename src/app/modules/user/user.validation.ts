import { z } from "zod";

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
    pushToken: z.string().optional(),
  }),
});

const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(["active", "inactive", "blocked"]).optional(),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

const addPointsValidationSchema = z.object({
  body: z.object({
    amount: z
      .number({ required_error: "Amount is required", invalid_type_error: "Amount must be a number" })
      .int("Amount must be a whole number")
      .positive("Amount must be positive")
      .max(100, "Maximum 100 points allowed per request"),
  }),
});

export const UserValidation = {
  updateProfileValidationSchema,
  updateUserStatusValidationSchema,
  addPointsValidationSchema,
};
