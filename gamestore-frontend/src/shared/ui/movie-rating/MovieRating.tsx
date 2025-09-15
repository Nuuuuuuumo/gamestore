import clsx from "clsx";

import {useStyles} from "./movie-rating.styles";

import type {PropsWithChildren} from "react";


interface RatingProps extends PropsWithChildren {
  className?: string;
  size?: "small" | "medium";
}

export const MovieRating = ({children, size = "medium", className}: RatingProps) => {
  const {classes} = useStyles();
  const rating = Number(children);
  const isHighRating = rating >= 6;
  
  return (<span className={clsx(classes.rating, isHighRating && classes.isHighRating, classes[size], className)}>
    {children}
  </span>);
};