import * as yup from "yup";

export const config = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
} as const;

const yupConfigSchema = yup.object({
  BASE_URL: yup.string().required(),
});
//TODO: USE VALIDATION
/* eslint-disable */
const validatedConfig = yupConfigSchema.validateSync(config);
