import { CircularProgress, List, ListItem } from "@mui/material";
import React from "react";

import { useStyles } from "./GameList.styles";

import type { Game } from "@/shared/api";

import { GameCard } from "@/entities/game";

type GameListProps = {
  games: Game[]
  isFetching: boolean
}
export const GameList = ({ games, isFetching }: Partial<GameListProps>) => {
  const { classes } = useStyles();
  if (isFetching) return <CircularProgress/>;
  if (!games) return <>Error</>;
  if (!games.length) return <>No matches games</>;
  return (
    <List className={classes.list}>
      {games?.map((game) => (
        <ListItem key={game.id} className={classes.item}>
          <GameCard key={game.id} game={game}/>
        </ListItem>
      ))}
    </List>
  );
}
;
