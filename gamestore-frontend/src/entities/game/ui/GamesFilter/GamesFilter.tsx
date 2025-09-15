import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

import {useStyles} from "./filter.styles";


import {useGetGenresAndPlatformsQuery} from "@/entities/game/api/gameAPi";
import {FilterState} from "@/entities/game/model/types";

type GamesFilterProps = {
  filters: FilterState;
  onChangeFilters: (args: FilterState) => void
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const GamesFilter = ({filters, onChangeFilters}: GamesFilterProps) => {
  const {classes} = useStyles();
  const {data, isFetching, isLoading} = useGetGenresAndPlatformsQuery();
  const handleFilterChange = (filterName: string, value: unknown) => {
    onChangeFilters({...filters, [filterName]: value});
  };
  
  if (isFetching || isLoading) return <CircularProgress/>;
  if (!data && (!isFetching || !isLoading)) return <>Error</>;
  return (
    <Box className={classes.root}>
      <FormControl fullWidth>
        <TextField
          id="title"
          fullWidth
          name="title"
          label="Title"
          value={filters.title}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="genres-label">Genres</InputLabel>
        <Select
          labelId="genres-label"
          id="genres"
          fullWidth
          multiple
          name="genres"
          input={<OutlinedInput id="select-multiple-genres" label="Genres"/>}
          value={filters.genres}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          renderValue={(selected) => (
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
              {selected.map((value) => (
                <Chip key={value} label={value}/>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data?.genres?.map((genre) => (
            <MenuItem
              key={genre.name}
              value={genre.name}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="platforms-label">Platforms</InputLabel>
        <Select
          id="platforms"
          labelId="platforms-label"
          fullWidth
          multiple
          name="platforms"
          value={filters.platforms}
          input={<OutlinedInput id="select-multiple-platforms" label="Platforms"/>}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          renderValue={(selected) => (
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
              {selected.map((value) => (
                <Chip key={value} label={value}/>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data?.platforms?.map((platform) => (
            <MenuItem
              key={platform.name}
              value={platform.name}
            >
              {platform.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    
    </Box>
  );
};

