import styles from "./HeroCarousel.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "../Slider";

function HeroCarousel({ movies, windowWidth }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef();

  const { currentHeroImageWidth, totalIndex } = useMemo(() => {
    const currentHeroImageWidth = windowWidth * 0.84 + 30;
    const totalIndex = movies.length;
    return {
      currentHeroImageWidth: currentHeroImageWidth,
      totalIndex: totalIndex,
    };
  }, [windowWidth, movies.length]);

  // for dots -- checking which one is active
  function toggleActive() {
    setCurrentIndex(
      heroRef.current !== undefined ? Math.round(heroRef.current.scrollLeft / windowWidth) : null
    );
  }

  // for dots --clicking trigger this function changing to another image
  function handeleToggleActive(index) {
    setCurrentIndex(index);
    if (index > currentIndex) {
      heroRef.current.scrollLeft += currentHeroImageWidth * (index - currentIndex);
    } else if (index <= currentIndex) {
      heroRef.current.scrollLeft -= currentHeroImageWidth * (currentIndex - index);
    }
  }

  useEffect(() => {
    function changeSlide() {
      if (currentIndex < totalIndex - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        heroRef.current.scrollLeft += currentHeroImageWidth;
      } else if (currentIndex === totalIndex - 1) {
        heroRef.current.scrollLeft -= currentHeroImageWidth * totalIndex;
        setCurrentIndex(0);
      }
    }

    const interval = setInterval(changeSlide, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, currentHeroImageWidth, totalIndex]);

  return (
    <>
      <div className={styles.carousel_outer}>
        <Slider currentImageWidth={currentHeroImageWidth} heroRef={heroRef} onchange={toggleActive}>
          {movies.map((movie) => (
            <>
              <li className={styles.hero_image_wrapper}>
                <div
                  key={movie.id}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  }}
                  className={styles.hero_image}
                >
                  <div className={styles.inner_image_box}>
                    <h2>{movie.title ? movie.title : movie.name}</h2>
                    <p>{`${movie.overview.split(" ").slice(0, 30).join(" ")} ...`}</p>
                  </div>
                  <div className={styles.pagination_box}>
                    {Array.from({ length: totalIndex }, (_, i) => (
                      <div
                        onClick={() => handeleToggleActive(i)}
                        key={i}
                        className={styles.pagination}
                        style={{
                          backgroundColor: currentIndex === i ? "#fff" : "",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </li>
            </>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default HeroCarousel;
