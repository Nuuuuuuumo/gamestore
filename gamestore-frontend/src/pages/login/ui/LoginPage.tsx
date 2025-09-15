import {Box} from "@mui/material";

import {LoginForm} from "@/features/authentification/login/ui";
import {useStyles} from "@/pages/login/ui/loginPage.styles";

export const LoginPage = () => {
  const {classes} = useStyles();
  
  
  return (
    <Box className={classes.rootWrapper}>
      <LoginForm/>
    </Box>
  );
};