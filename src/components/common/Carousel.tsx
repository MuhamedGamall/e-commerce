import Slider, { Settings } from "react-slick";
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Box, Button, IconButton } from "@mui/material";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface ResponsiveCarouselProps {
  settings?: Settings;
  children: ReactNode[];
  onSlideChange?: (current: number) => void;

  showArrows?: boolean;
  showBars?: boolean;

  disablePrevArrow?: boolean;
  disableNextArrow?: boolean;
  disableBars?: boolean;

  arrowRenderer?: (opts: {
    direction: "prev" | "next";
    disabled: boolean;
    onClick: () => void;
  }) => ReactNode;
  barRenderer?: (opts: {
    index: number;
    isActive: boolean;
    disabled: boolean;
    onClick: () => void;
  }) => ReactNode;

  className?: string;
}

export interface ResponsiveCarouselRef {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getCurrent?: () => number;
}

const defaultSettings: Settings = {
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  autoplay: false,
  draggable: true,
  swipe: true,
  arrows: false,
  infinite: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 2 } },
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const ResponsiveCarousel = forwardRef<
  ResponsiveCarouselRef,
  ResponsiveCarouselProps
>(
  (
    {
      settings = defaultSettings,
      children,
      onSlideChange,
      showArrows = true,
      showBars = true,
      disablePrevArrow = false,
      disableNextArrow = false,
      disableBars = false,
      arrowRenderer,
      barRenderer,
      className,
    },
    ref
  ) => {
    const [current, setCurrent] = useState<number>(0);
    const sliderRef = useRef<Slider | null>(null);

    const mergedSettings: Settings = useMemo(
      () => ({
        ...defaultSettings,
        ...settings,
        beforeChange: (prev: number, next: number) => {
          onSlideChange?.(next);
          setCurrent(next);
          settings?.beforeChange?.(prev, next);
        },
      }),
      [settings, onSlideChange]
    );

    const getEffectiveSlidesToShow = useCallback(
      (width: number) => {
        const base = (mergedSettings.slidesToShow as number) || 1;
        const resp = mergedSettings.responsive;
        if (!Array.isArray(resp) || resp.length === 0)
          return Math.max(1, Math.floor(base));
        const sorted = [...resp].sort(
          (a: any, b: any) => (a.breakpoint || 0) - (b.breakpoint || 0)
        );
        for (const r of sorted) {
          const bp = r.breakpoint ?? Infinity;
          if (width <= bp) {
            const s = (r.settings as any)?.slidesToShow;
            if (typeof s === "number") return Math.max(1, Math.floor(s));
          }
        }
        return Math.max(1, Math.floor(base));
      },
      [mergedSettings]
    );

    const [slidesVisible, setSlidesVisible] = useState<number>(() => {
      if (typeof window === "undefined") {
        return Math.max(
          1,
          Math.floor((mergedSettings.slidesToShow as number) || 1)
        );
      }
      return getEffectiveSlidesToShow(window.innerWidth);
    });

    useEffect(() => {
      const update = () => {
        if (typeof window === "undefined") return;
        const v = getEffectiveSlidesToShow(window.innerWidth);
        setSlidesVisible((prev) => (prev !== v ? v : prev));
      };
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, [getEffectiveSlidesToShow]);

    const totalSlides = children.length;
    const { itemsPerBar, barsCount, barIndexActive } = useMemo(() => {
      const perBar = Math.max(1, Math.floor(slidesVisible || 1));
      const bars = Math.max(1, Math.ceil(totalSlides / perBar));
      const visibleEnd = Math.min(
        current + perBar - 1,
        Math.max(totalSlides - 1, 0)
      );
      const active = Math.floor(visibleEnd / perBar);
      return {
        itemsPerBar: perBar,
        barsCount: bars,
        barIndexActive: Math.min(Math.max(active, 0), bars - 1),
      };
    }, [slidesVisible, totalSlides, current]);

    useImperativeHandle(ref, () => ({
      next: () => sliderRef.current?.slickNext(),
      prev: () => sliderRef.current?.slickPrev(),
      goTo: (index: number) => sliderRef.current?.slickGoTo(index),
      getCurrent: () => current,
    }));

    const goToIndex = useCallback((index: number) => {
      sliderRef.current?.slickGoTo(index);
    }, []);

    const defaultArrow = useCallback(
      (
        direction: "prev" | "next",
        disabled: boolean,
        onClick: () => void
      ) => (
        <IconButton
          onClick={onClick}
          disabled={disabled}
          aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
          className={`arrow-btn arrow-btn--${direction}`}
        >
          {direction === "prev" ? <GoArrowLeft height={17} width={24} /> : <GoArrowRight height={17} width={24} />}
        </IconButton>
      ),
      []
    );

    const defaultBar = useCallback(
      (
        index: number,
        isActive: boolean,
        disabled: boolean,
        onClick: () => void
      ) => (
        <Button
          key={index}
          onClick={onClick}
          disabled={disabled}
          aria-label={`Go to group ${index + 1}`}
          className={`bar-btn ${isActive ? "active" : ""}`}
        />
      ),
      []
    );

    const renderedBars = useMemo(() => {
      if (!showBars || barsCount <= 1) return null;

      return (
        <Box className="slider-bars" sx={{ display: "inline-flex", gap: 1 }}>
          {Array.from({ length: barsCount }).map((_, barIndex) => {
            const startIndex = barIndex * itemsPerBar;
            const maxGoTo = Math.max(0, totalSlides - slidesVisible);
            const goTo = Math.min(startIndex, maxGoTo);
            const isActive = barIndex === barIndexActive;
            const onClick = () => !disableBars && goToIndex(goTo);

            return barRenderer
              ? barRenderer({ index: barIndex, isActive, disabled: disableBars, onClick })
              : defaultBar(barIndex, isActive, disableBars, onClick);
          })}
        </Box>
      );
    }, [barsCount, itemsPerBar, totalSlides, slidesVisible, barIndexActive, disableBars, goToIndex, barRenderer, defaultBar, showBars]);

    const renderedArrows = useMemo(() => {
      if (!showArrows) return null;

      return (
        <Box className="slider-arrows" sx={{ display: "inline-flex", alignItems: "center", mr: 2 }}>
          {arrowRenderer
            ? arrowRenderer({
                direction: "prev",
                disabled: disablePrevArrow,
                onClick: () => !disablePrevArrow && sliderRef.current?.slickPrev(),
              })
            : defaultArrow("prev", disablePrevArrow, () => !disablePrevArrow && sliderRef.current?.slickPrev())}

          {arrowRenderer
            ? arrowRenderer({
                direction: "next",
                disabled: disableNextArrow,
                onClick: () => !disableNextArrow && sliderRef.current?.slickNext(),
              })
            : defaultArrow("next", disableNextArrow, () => !disableNextArrow && sliderRef.current?.slickNext())}
        </Box>
      );
    }, [showArrows, disablePrevArrow, disableNextArrow, arrowRenderer, defaultArrow]);

    return (
      <div className={`slider-container ${className || ""}`} style={{ overflow: "hidden", width: "100%" }}>
        <Slider ref={sliderRef} {...mergedSettings}>
          {children}
        </Slider>

        <Box
          className="slider-pagination"
          sx={{
            justifyContent: showArrows && showBars ? "space-between" : "center",
          }}
        >
          {renderedArrows}
          {renderedBars}
        </Box>
      </div>
    );
  }
);

ResponsiveCarousel.displayName = "ResponsiveCarousel";

export default ResponsiveCarousel;
