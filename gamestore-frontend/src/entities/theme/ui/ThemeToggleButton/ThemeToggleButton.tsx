import {IconButton} from "@mui/material";
import {Brightness4, Brightness7} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";

import useStyles from "./ThemeToggleButton.styles";

import {toggleTheme} from "@/entities/theme/model/slice";

export const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const {classes} = useStyles();
  const mode = useSelector((state: RootState) => state.theme.mode);
  
  return (
    <IconButton onClick={() => dispatch(toggleTheme())} className={classes.root}>
      {mode === "dark" ? <Brightness7/> : <Brightness4/>}
    </IconButton>
  );
};
