import { Box } from "@mui/material";

import { RegistrationForm } from "@/features/authentification/registration";
import { useStyles } from "@/pages/registration/ui/registrationPage.styles";

export const RegistrationPage = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.rootWrapper}>
      <RegistrationForm/>
    </Box>
  );
};