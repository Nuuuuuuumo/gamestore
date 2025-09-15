import {yupResolver} from "@hookform/resolvers/yup";
import {Button, FormControl, TextField, Typography} from "@mui/material";
import {enqueueSnackbar} from "notistack";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";

import {useStyles} from "./registrationForm.styles";

import type {RequestRegisterBody} from "@/entities/authentification/model/types";
import type {RegistrationFormSchema} from "@/features/authentification/registration/model/registrationFormSchema";

import {registrationFormSchema} from "@/features/authentification/registration/model/registrationFormSchema";

import {useRegistrationMutation} from "@/entities/authentification/api/authApi";
import {Loader} from "@/shared/ui/loader/Loader";

export const RegistrationForm = () => {
  const {classes} = useStyles();
  const [registrationMutation, {error, isLoading}] = useRegistrationMutation();
  const navigate = useNavigate();
  
  const mode = useSelector((state: RootState) => state.theme.mode);
  const bgColor = mode === "dark" ? "#8B5CF6" : "#141414";
  
  const {
    formState: {errors}, handleSubmit, register,
  } = useForm<RegistrationFormSchema>({
    resolver: yupResolver(registrationFormSchema),
  });
  const onSubmitHandler = async (registrationDto: RequestRegisterBody) => {
    const {avatarURL, ...rest} = registrationDto;
    const formData = new FormData();
    formData.append("data", JSON.stringify(rest));
    formData.append("avatarURL", avatarURL[0]);
    await registrationMutation(formData)
      .unwrap()
      .then((payload) => {
        enqueueSnackbar(`Welcome ${payload.firstName}`, {variant: "success"});
        navigate("/");
      })
      .catch((e) => enqueueSnackbar(e.data.message, {variant: "error"}));
  };
  return (<>
    <form className={classes.registrationForm} onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl fullWidth sx={{m: 2}}>
        <input {...register("avatarURL")} type="file"/>
        {errors.avatarURL && (<Typography style={{color: "red"}}>{errors?.avatarURL?.message}</Typography>)}
      </FormControl>
      <FormControl>
        <TextField
          {...register("email")}
          label="Email*"
          variant="outlined"
          fullWidth
          error={!!errors.email || !!error}
          helperText={errors.email?.message}
        />
      </FormControl>
      <FormControl>
        <TextField
          {...register("firstName")}
          label="First name*"
          variant="outlined"
          fullWidth
          error={!!errors.firstName || !!error}
          helperText={errors.firstName?.message}
        />
      </FormControl>
      <FormControl>
        <TextField
          {...register("lastName")}
          label="Last Name*"
          variant="outlined"
          fullWidth
          error={!!errors.lastName || !!error}
          helperText={errors.lastName?.message}
        />
      </FormControl>
      <FormControl>
        <TextField
          {...register("password")}
          label="Password*"
          type="password"
          variant="outlined"
          fullWidth
          error={!!errors.password || !!error}
          helperText={errors.password?.message}
        />
      </FormControl>
      <Button sx={{
        color: "#fff",
        "&:hover": {
          backgroundColor: "#8375A2FF",
        },
        backgroundColor: bgColor,
        px: 3,
        py: 1.2,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
        minWidth: {xs: 100, sm: 140},
      }} type="submit" variant="contained">
        <Typography>{isLoading ? <Loader/> : "Sign Up"}</Typography>
      </Button>
    </form>
  </>);
};