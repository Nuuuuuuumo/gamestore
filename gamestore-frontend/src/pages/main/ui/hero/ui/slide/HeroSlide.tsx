import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";

import {useStyles} from "./HeroSlide.styles";

import type {Game} from "@/shared/api";

import {MovieRating} from "@/shared/ui/movie-rating";

interface SlideProps {
  item: Game;
}

export const HeroSlide = ({item}: SlideProps) => {
  const {classes} = useStyles();
  const {id, title, rating, imageUrl} = item;
  
  return (
    <Box className={classes.item}>
      <Link to={`/games/${id}`} className={classes.link}/>
      <Box className={classes.content}>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
        <Box className={classes.bottom}>
          <MovieRating className={classes.rating}>{rating}</MovieRating>
        </Box>
      </Box>
      <img className={classes.image} src={imageUrl} alt={title}/>
    </Box>
  );
};
