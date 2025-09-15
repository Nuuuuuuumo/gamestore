import * as yup from "yup";

export const loginFormSchema = yup.object({
  email: yup.string().min(1, "Email is required").email("Must be a valid email").required(),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
});

export type LoginFormSchema = yup.InferType<typeof loginFormSchema>;
