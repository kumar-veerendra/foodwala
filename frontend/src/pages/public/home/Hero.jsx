import React, { useState, useEffect } from "react";

const Hero = ({ slides }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const sliderStyles = {
    height: "100%",
    width: "100%",
    position: "relative",
    overflow: "hidden", // important for sliding
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIdx]})`,
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const slidesContainerStyles = {
    display: "flex",
    height: "100%",
    width: `${slides.length * 100}%`,
    transform: `translateX(-${currentIdx * 100}%)`,
    transition: "transform 0.6s ease-in-out", // smooth sliding
  };

  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: "10px",
    width: "100%",
  };

  const dotStyle = (isActive) => ({
    margin: "0 5px",
    cursor: "pointer",
    fontSize: "20px",
    color: isActive ? "black" : "#c4c4c4",
  });

  const goToPrev = () => {
    const isFirstSlide = currentIdx === 0;
    const newIdx = isFirstSlide ? slides.length - 1 : currentIdx - 1;
    setCurrentIdx(newIdx);
  };

  const goToNext = () => {
    const isLastSlide = currentIdx === slides.length - 1;
    const newIdx = isLastSlide ? 0 : currentIdx + 1;
    setCurrentIdx(newIdx);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIdx(slideIndex);
  }

   // 🔥 Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // change every 3 sec

    return () => clearInterval(interval); // cleanup on unmount
  }, [currentIdx]);

  return (
    <div style={sliderStyles}>

      <div style={leftArrowStyles} onClick={goToPrev}>
        ❮
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        ❯
      </div>

      <div style={slideStyles}></div>

      {/* SLIDE CONTAINER */}
      <div style={slidesContainerStyles}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...slideStyles,
              backgroundImage: `url(${slide})`,
            }}
          ></div>
        ))}
      </div>

      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            style={dotStyle(slideIndex === currentIdx)}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
