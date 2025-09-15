import {Box} from "@mui/material";

import {useStyles} from "./browse.styles";

import {GameList} from "@/entities/game";
import {GamesFilter} from "@/entities/game/ui/GamesFilter";
import {useGameSearchFilters} from "@/shared/hooks/useGameSearchFilteres";

export const Browse = () => {
  const {classes} = useStyles();
  const {filters, setFilters, queryResult} = useGameSearchFilters();
  
  return (
    <Box className={classes.root}>
      <GameList isFetching={queryResult.isFetching} games={queryResult.data}/>
      <GamesFilter filters={filters} onChangeFilters={setFilters}/>
    </Box>
  );
};
