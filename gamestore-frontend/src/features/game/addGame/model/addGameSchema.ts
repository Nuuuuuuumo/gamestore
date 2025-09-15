import * as yup from "yup";

export const addGameSchema = yup.object().shape({
  title: yup.string().trim().required(),
  genres: yup.array(
    yup.string().uuid().required(),
  ).required(),
  price: yup.number().required(),
  description: yup.string().required(),
  platforms: yup.array(
    yup.string().uuid().required(),
  ).required(),
  publisher: yup.string().trim().required(),
  developer: yup.string().trim().required(),
  image: yup.mixed().test("file", "Image is required", (value: any) => {
    const fileList = value as FileList;
    return fileList && fileList.length > 0;
  }).required(),
  multiplayerSupport: yup.boolean().required(),
});

export type AddGameSchema = yup.InferType<typeof addGameSchema>;