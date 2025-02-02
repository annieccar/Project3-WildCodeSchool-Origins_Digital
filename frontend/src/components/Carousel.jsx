import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

function SampleArrow(props) {
  const { style, onClick, label } = props;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <div
      style={{
        ...style,
        display: "block",
        background: "#FF680A",
        cursor: "pointer",
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={label}
    />
  );
}

SampleArrow.propTypes = {
  style: PropTypes.shape({
    display: PropTypes.string,
    background: PropTypes.string,
    cursor: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function MultipleItems() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleArrow label="Next Slide" />,
    prevArrow: <SampleArrow label="Previous Slide" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="m-7">
      <h2 className="text-orange"> Categorie</h2>
      <Slider
        dots={settings.dots}
        infinite={settings.infinite}
        speed={settings.speed}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
        nextArrow={settings.nextArrow}
        prevArrow={settings.prevArrow}
        responsive={settings.responsive}
      >
        <div className="p-2">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${
              import.meta.env.VITE_THUMBNAILS_PATH
            }/fog.png`}
            alt="fog"
          />
          <h3 className="flex justify-center">Fog</h3>
        </div>
        <div className="p-2">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${
              import.meta.env.VITE_THUMBNAILS_PATH
            }/lotus_flowers.png`}
            alt="lotus_flower"
          />
          <h3 className="flex justify-center">Lotus Flowers</h3>
        </div>
        <div className="p-2">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${
              import.meta.env.VITE_THUMBNAILS_PATH
            }/sea.png`}
            alt="sea"
          />
          <h3 className="flex justify-center">Sea</h3>
        </div>
        <div className="p-2">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${
              import.meta.env.VITE_THUMBNAILS_PATH
            }/roundabout.png`}
            alt="roundabout"
          />
          <h3 className="flex justify-center">Roundabout</h3>
        </div>
        <div className="p-2">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${
              import.meta.env.VITE_THUMBNAILS_PATH
            }/sunset.png`}
            alt="sunset"
          />
          <h3 className="flex justify-center">Sunset</h3>
        </div>
        <div className="p-2">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${
              import.meta.env.VITE_THUMBNAILS_PATH
            }/sunflowers.png`}
            alt="sunflowers"
          />
          <h3 className="flex justify-center">Sunflowers</h3>
        </div>
      </Slider>
    </div>
  );
}

export default MultipleItems;
