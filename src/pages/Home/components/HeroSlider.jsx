import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";

const HeroSlider = () => {
  const { t } = useTranslation();

  const slide1 = "assets/imgs/home/slide1.webp";
  const slide2 = "assets/imgs/home/slide2.webp";
  const slide3 = "assets/imgs/home/slide3.webp";
  const heroSlides = [
    {
      img: slide1,
      alt: t("home_cleaning"),
      title: t("hero_title"),
      sutitle: t("hero_subtitle"),
      category: t("home_cleaning"),
    },

    {
      img: slide2,
      alt: t("pest_control"),
      title: t("hero_title"),
      sutitle: t("hero_subtitle"),
      category: t("pest_control"),
    },

    {
      img: slide3,
      alt: t("office_cleaning"),
      title: t("hero_title"),
      sutitle: t("hero_subtitle"),
      category: t("office_cleaning"),
    },
  ];

  // New: slide state + helpers
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = heroSlides.length;
  const goToNext = () =>
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  const goToPrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  // autoplay + pause on hover + keyboard nav
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const AUTOPLAY_MS = 5000;

  // New: responsive min-height (max-sm -> 600px)
  const [minHeightStyle, setMinHeightStyle] = useState("calc(100vh - 110px)");

  useEffect(() => {
    const updateMinHeight = () => {
      const isSmall = window.matchMedia("(max-width: 640px)").matches; // Tailwind 'sm' breakpoint
      if (isSmall) {
        // Use "600px" on small screens. Change to "fit-content" if you prefer content-driven height.
        setMinHeightStyle("600px");
      } else {
        setMinHeightStyle("calc(100vh - 110px)");
      }
    };

    updateMinHeight();
    window.addEventListener("resize", updateMinHeight);
    return () => window.removeEventListener("resize", updateMinHeight);
  }, []);

  useEffect(() => {
    const startAutoplay = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, AUTOPLAY_MS);
    };

    const stopAutoplay = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    // start autoplay
    if (totalSlides > 1) startAutoplay();

    // keyboard navigation
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      stopAutoplay();
      window.removeEventListener("keydown", onKey);
    };
  }, [totalSlides]);

  // pause/resume on hover (attach to container)
  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  const handleMouseLeave = () => {
    if (!intervalRef.current && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, AUTOPLAY_MS);
    }
  };

  return (
    <>
      <div
        id="image"
        /* data-carousel removed to prevent FlyonUI auto-init conflict */
        className="relative w-full pt-5 z-0"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="carousel">
          {/* Use responsive min-height from state */}
          <div
            className="carousel-body relative h-auto"
            style={{ minHeight: minHeightStyle }}
          >
            {/* Slides (now absolute so they overlap) */}
            {Array.isArray(heroSlides) && heroSlides.map((slide, index) => (
              <div
                className={`carousel-slide absolute inset-0 ${
                  index === currentSlide
                    ? "z-20 pointer-events-auto"
                    : "z-0 pointer-events-none"
                }`}
                key={index}
                aria-hidden={index === currentSlide ? "false" : "true"}
              >
                <div className="flex h-full justify-center relative">
                  {/* image fades in/out per-slide (only image + overlay are animated) */}
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {/* per-slide overlay (fades with image) placed above image but below content */}
                  <div
                    className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-700 ease-in-out pointer-events-none ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {/* content always positioned above overlay (z-30). It fades separately to avoid flash */}
                  <div
                    className={`absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-6 w-[68%] max-md:w-full max-sm:w-[90%] max-sm:top-[48%] transition-opacity duration-300 ${
                      index === currentSlide
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-base font-normal text-white mb-4 max-sm:text-[13px] max-sm:mb-2">
                      {slide.category}
                    </p>

                    <h1 className="text-white font-bold text-[48px] mb-6 leading-tight max-md:text-36px max-sm:text-[26px] max-sm:leading-snug max-lg:text-25px max-[425px]:text-18px drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      {slide.title}
                    </h1>
                    <div className="center_flex md:gap-6 gap-2 md:flex-wrap flex-nowrap lg:mb-8 max-sm:flex-col max-sm:gap-3">
                      <Link
                        to="/services"
                        className="btn btn-wide btn-primary md:min-w-[20rem] rounded-[55px] text-white font-semibold text-base md:px-8 md:py-6 hover:bg-primary-light_hover hover:border-none transition max-sm:w-full max-sm:px-6 max-sm:py-3 max-sm:text-sm"
                        target="_blank"
                      >
                        {t("book_now")}
                      </Link>
                      <Link
                        to="/services"
                        className="btn btn-wide btn-secondary md:min-w-[20rem] rounded-[55px] text-primary-dark font-semibold text-base md:px-8 md:py-6 hover:text-white hover:border-none hover:bg-primary-light_hover transition max-sm:w-full max-sm:px-6 max-sm:py-3 max-sm:text-sm"
                       >
                         {t("our_services")}
                       </Link>
                     </div>
                    <h3 className="text-lg font-bold text-white lg:mb-4 max-sm:text-sm max-sm:mt-3">
                      -{" "}
                      <span className="px-4 font-bold text-14px md:text-20px">
                        {slide.sutitle}
                      </span>{" "}
                      -
                    </h3>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Prev/Next: wired to React handlers */}
        <button
          type="button"
          onClick={goToPrev}
          className="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-50 size-9.5 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm z-30"
          aria-label="Previous slide"
        >
          <span className="icon-[cil--arrow-left]  size-9.5 text-white font-normal rtl-flip"></span>
          <span className="sr-only">{t("previous")}</span>
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-50 size-9.5  flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm z-30"
          aria-label="Next slide"
        >
          <span className="icon-[cil--arrow-right] size-9.5 text-white font-normal rtl-flip"></span>
          <span className="sr-only">{t("next")}</span>
        </button>

        {/* ...existing rest of markup (scroll link, etc.) ... */}
        <div className="absolute bottom-10 start-44  flex items-center gap-2 max-lg:bottom-0 max-lg:start-0 max-lg:gap-1 flex-col max-lg:items-start max-lg:ps-4 z-30">
          <ScrollLink
            className="w-[92px] h-[88px] btn cursor-pointer animate-bounce transition-all duration-1000 center_flex glass bg-white/10 rounded-full overflow-hidden max-md:size-[40px] "
            to="services"
            smooth={true}
            duration={600}
            offset={-100}
          >
            <span className="icon-[fluent--arrow-down-28-regular] text-white text-5xl"></span>
          </ScrollLink>
          <p className="text-white  font-normal text-base max-sm:text-10px">
            {t("see_all_services")}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroSlider;
