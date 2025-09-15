import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import { useStyles } from "./gameCard.styles";

import type { Game } from "@/shared/api";

import { RedirectLink } from "@/shared/ui";

type Props = {
  game: Game
}

export const GameCard = (props: Props) => {
  const { classes } = useStyles();
  const { game } = props;
  
  return (
    <RedirectLink redirectTo={`/games/${game.id}`}>
      <Card key={game.id} className={classes.root}>
        <CardMedia
          component="img"
          className={classes.image}
          image={game.imageUrl}
        />
        <CardContent style={{ padding: 0 }}>
          <Typography>{game.publisher}</Typography>
          <Typography className={classes.title}>{game.title}</Typography>
          <Typography className={classes.price}>${game.price}</Typography>
        </CardContent>
      </Card>
    </RedirectLink>
  );
};