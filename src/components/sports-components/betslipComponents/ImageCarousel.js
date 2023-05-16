import React, { useState } from "react";
import styled from "styled-components";

const carouselGap = 20;
const imageWidth = 315;

const ImageCarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 2%;
  max-width: 100%;
`;

const ImageCarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${(props) => props.translateValue}px);
  gap: ${carouselGap}px;
`;

const Image = styled.img`
  width: ${imageWidth}px;
  height: 132px;

  /* margin-right: 20px; */
  object-fit: fill;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: white;
  z-index: 1;
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 0;")}
`;

const ImageCarousel = () => {
  const images = ["/promo2.webp", "/promo4.png", "/promo5.webp"];

  const carouselSlideWidth = () => {
    return imageWidth + carouselGap;
  };

  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(images.length / 2)
  );
  const [translateValue, setTranslateValue] = useState(
    images.length % 2 === 0 ? 0 - carouselSlideWidth() / 2 : 0
  );

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
      setTranslateValue(
        images.length % 2 === 0
          ? 0 -
              (carouselSlideWidth() * Math.floor(images.length / 2) -
                carouselSlideWidth() / 2)
          : 0 - carouselSlideWidth() * Math.floor(images.length / 2)
      );
      return;
    }

    setCurrentIndex(currentIndex - 1);
    setTranslateValue(translateValue + carouselSlideWidth());
  };

  const goToNextSlide = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
      setTranslateValue(
        images.length % 2 === 0
          ? carouselSlideWidth() * Math.floor(images.length / 2) -
              carouselSlideWidth() / 2
          : carouselSlideWidth() * Math.floor(images.length / 2)
      );
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setTranslateValue(translateValue - carouselSlideWidth());
  };

  return (
    <ImageCarouselContainer>
      <ArrowButton direction="left" onClick={goToPrevSlide}>
        {"<"}
      </ArrowButton>
      <ImageCarouselWrapper translateValue={translateValue}>
        {images.map((image, index) => (
          <div className="image-carousel__slide" key={index}>
            <Image src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </ImageCarouselWrapper>
      <ArrowButton direction="right" onClick={goToNextSlide}>
        {">"}
      </ArrowButton>
    </ImageCarouselContainer>
  );
};

export default ImageCarousel;
