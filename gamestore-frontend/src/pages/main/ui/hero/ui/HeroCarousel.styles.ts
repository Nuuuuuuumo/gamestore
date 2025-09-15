import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  const maxWidthCaclsSmValue = theme.spacing(3).split("px")[0];
  const maxWidthCaclsXsValue = theme.spacing(2).split("px")[0];
  const maxWidthCaclMdValue = theme.spacing(3).split("px")[0];
  const maxWidthCalcSm = `calc(100% - ${+maxWidthCaclsSmValue * 2}px)`;
  const maxWidthCalcXs = `calc(100% - ${+maxWidthCaclsXsValue * 2}px)`;
  const maxWidthCalcMd = `calc(100% - ${+maxWidthCaclMdValue * 2}px)`;
  return {
    section: {
      position: "relative",
      overflow: "hidden",
      margin: "15px 0 20px",

      [theme.breakpoints.down("sm")]: {
        margin: "0 0 10px",
      },
    },
    container: {
      maxWidth: "57%",
      margin: "0 auto",
      [theme.breakpoints.down("md")]: {
        maxWidth: maxWidthCalcMd,
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: maxWidthCalcSm,
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: maxWidthCalcXs,
      },
    },
    slider: {
      width: "100%",
      overflow: "visible",
    },
    slide: {
      width: "100%",
    },
  };
});

