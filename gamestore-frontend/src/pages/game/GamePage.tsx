import React from "react";
import {Link, useParams} from "react-router-dom";

import {useGetGameQuery} from "@/entities/game/api/gameAPi";
import {GameDetails} from "@/widgets/GameDetails";

export const GamePage = () => {
  
  const {id} = useParams();
  const {data: game, isError} = useGetGameQuery(id as string);
  
  if (isError || !game) {
    return <>Something went wrong. Visit <Link to="/">main</Link> page</>;
  }
  return (
    <>
      <GameDetails game={game}/>
    </>
  );
};