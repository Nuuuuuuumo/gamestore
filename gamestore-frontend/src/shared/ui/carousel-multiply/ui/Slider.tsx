import "swiper/css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import clsx from "clsx";
import {type ReactNode, useCallback} from "react";
import {Navigation} from "swiper";

import {Swiper, SwiperSlide} from "swiper/react";

import useStyles from "./slider.styles";

import type {SwiperProps} from "swiper/react";
import type {SwiperOptions} from "swiper/types/swiper-options";


import {useDomRefWithSetter} from "@/shared/ui/carousel-multiply/lib";
import {SliderButton} from "@/shared/ui/carousel-multiply/ui/sliderButton/SliderButton";

export interface CarouselMultiplyProps<T> extends SwiperProps {
  items: T[] | undefined;
  prevBtnClass?: string;
  nextBtnClass?: string;
  renderItem: (item: T, idx: number) => ReactNode;
  className?: string;
  slideClassName?: string;
  containerOffsets?: boolean;
  options?: SwiperOptions;
}

export function CarouselMultiply<T>({
  items,
  renderItem,
  className,
  slideClassName,
  navigation = true,
  options,
  modules,
  prevBtnClass,
  nextBtnClass,
  ...props
}: CarouselMultiplyProps<T>) {
  const {classes} = useStyles();
  const [nextEl, nextElRef] = useDomRefWithSetter<HTMLButtonElement>();
  const [prevEl, prevElRef] = useDomRefWithSetter<HTMLButtonElement>();
  
  const renderItems = useCallback(
    (_items: typeof items) =>
      _items?.map((item, idx) => (
        <SwiperSlide style={{marginRight: "var(--column-gap)"}} className={slideClassName} key={idx}>
          {renderItem(item, idx)}
        </SwiperSlide>
      )),
    [slideClassName, renderItem],
  );
  
  const swiperOptions: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 8,
    breakpoints: {
      769: {
        spaceBetween: 15,
      },
      1401: {
        spaceBetween: 18,
      },
    },
    ...options,
  };
  
  const DEFAULT_MODULES = [Navigation];
  
  return (
    <Swiper
      className={clsx(classes.slider, className)}
      modules={[...(modules ?? DEFAULT_MODULES)]}
      loop={true}
      navigation={{
        prevEl,
        nextEl,
      }}
      {...swiperOptions}
      {...props}
    >
      {navigation && (
        <>
          <SliderButton className={clsx(classes.prev, prevBtnClass)} ref={prevElRef}>
            <ArrowBackIosIcon/>
          </SliderButton>
          <SliderButton className={clsx(classes.next, nextBtnClass)} ref={nextElRef}>
            <ArrowForwardIosIcon/>
          </SliderButton>
        </>
      )}
      {renderItems(items)}
    </Swiper>
  );
}