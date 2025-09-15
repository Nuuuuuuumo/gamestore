import * as yup from "yup";

export const registrationFormSchema = yup.object({
  email: yup.string().min(1, "Email is required").email("Must be a valid email").required(),
  firstName: yup.string().min(1, "First name is required").required(),
  lastName: yup.string().min(1, "Last name is required").required(),
  avatarURL: yup.mixed().test("file", "Image is required", (value: any) => {
    const fileList = value as FileList;
    return fileList && fileList.length > 0;
  }).required(),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
});

export type RegistrationFormSchema = yup.InferType<typeof registrationFormSchema>;
