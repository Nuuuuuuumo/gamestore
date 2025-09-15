import {useEffect, useState} from "react";
import {debounce} from "lodash";

import {FilterState} from "@/entities/game/model/types";
import {useLazyGetFilteredGamesQuery} from "@/entities/game";

export const useGameSearchFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    title: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  
  const [trigger, queryResult] = useLazyGetFilteredGamesQuery();
  
  const handleApplyFiltersDebounced = debounce(
    (newFilters: FilterState) => {
      const queryParams = new URLSearchParams({
        title: newFilters.title,
        rating: newFilters.rating,
        genres: newFilters.genres.join(","),
        platforms: newFilters.platforms.join(","),
      });
      trigger(queryParams);
    },
    350,
  );
  
  useEffect(() => {
    handleApplyFiltersDebounced(filters);
    
    return () => handleApplyFiltersDebounced.cancel();
  }, [filters]);
  
  return {
    filters,
    setFilters,
    queryResult, // contains data, isFetching, etc.
  };
};
