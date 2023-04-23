import React, { useState } from "react";
import styled from "styled-components";

const ImageCarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 2%;
`;

const ImageCarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${(props) => props.translateValue}px);
`;

const Image = styled.img`
  width: 315px;
  margin-right: 20px;
  object-fit: contain;
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex(currentIndex - 1);
    setTranslateValue(translateValue + carouselSlideWidth());
  };

  const goToNextSlide = () => {
    if (currentIndex === images.length - 3) {
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setTranslateValue(translateValue - carouselSlideWidth());
  };

  const carouselSlideWidth = () => {
    const slideWidth = document.querySelector(
      ".image-carousel__slide"
    ).clientWidth;
    const slideMarginRight = parseInt(
      window.getComputedStyle(document.querySelector(".image-carousel__slide"))
        .marginRight
    );
    return slideWidth + slideMarginRight;
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
