import {yupResolver} from "@hookform/resolvers/yup";
import {Button, FormControl, TextField} from "@mui/material";
import {enqueueSnackbar} from "notistack";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";

import {useStyles} from "./loginForm.styles";

import type {RequestLoginBody} from "@/entities/authentification/model/types";
import type {LoginFormSchema} from "@/features/authentification/login/model/loginFormSchema";

import {loginFormSchema} from "@/features/authentification/login/model/loginFormSchema";

import {useLoginMutation} from "@/entities/authentification/api/authApi";

export const LoginForm = () => {
  const {classes} = useStyles();
  const navigate = useNavigate();
  const [loginMutation, {error, isLoading}] = useLoginMutation();
  
  const mode = useSelector((state: RootState) => state.theme.mode);
  const bgColor = mode === "dark" ? "#8B5CF6" : "#141414";
  
  
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(loginFormSchema),
  });
  
  const onSubmitHandler = async (loginDto: RequestLoginBody) => {
    await loginMutation(loginDto)
      .unwrap()
      .then((payload) => {
        enqueueSnackbar(`Welcome ${payload.firstName}`, {variant: "success"});
        navigate("/");
      })
      .catch((e) => enqueueSnackbar(e.data.message, {variant: "error"}));
  };
  return (
    <>
      <form className={classes.loginForm} onSubmit={handleSubmit(onSubmitHandler)}>
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
        }} type="submit"
        variant="contained">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </>
  );
};