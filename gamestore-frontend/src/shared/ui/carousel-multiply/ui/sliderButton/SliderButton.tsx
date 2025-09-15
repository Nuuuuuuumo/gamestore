import {clsx} from "clsx";

import {forwardRef} from "react";

import useStyles from "./slider-button.styles";

import type {ButtonHTMLAttributes} from "react";

interface SliderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(({children, className, ...props}, ref) => {
  const {classes} = useStyles();
  return (
    <button className={clsx("btn-reset", classes.btn, className)} ref={ref} {...props}>
      {children}
    </button>
  );
});  