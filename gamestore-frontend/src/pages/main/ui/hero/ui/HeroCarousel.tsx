import { CircularProgress } from "@mui/material";

import { useStyles } from "./HeroCarousel.styles";

import { useGetGamesQuery } from "@/entities/game";
import { HeroSlide } from "@/pages/main/ui/hero/ui/slide/HeroSlide";
import { CarouselMultiply } from "@/shared/ui/carousel-multiply/ui/Slider";

export const HeroCarousel = () => {
  const { data, isLoading } = useGetGamesQuery();

  const { classes } = useStyles();
  if (isLoading) return <CircularProgress/>;
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <CarouselMultiply
          className={classes.slider}
          slideClassName={classes.slide}
          items={data}
          renderItem={(item) => <HeroSlide item={item}/>}
        />
      </div>
    </section>
  );
};