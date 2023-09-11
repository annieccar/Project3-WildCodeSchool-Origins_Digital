import { useEffect, useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import PropTypes from "prop-types";

export default function DynamicCarousel({ playlist }) {
  const [videoNames, setVideoNames] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const names = [];
    playlist.videos.map((elem) => names.push(elem));
    setVideoNames(names);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextImage = () => {
    if (isMobile && currentImageIndex === videoNames.length - 2) {
      setCurrentImageIndex(videoNames.length - 2);
    } else if (!isMobile && currentImageIndex === videoNames.length - 5) {
      setCurrentImageIndex(videoNames.length - 5);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="flex flex-col ml-5">
      {videoNames.length > 0 && (
        <div className="w-80 lg:w-[980px] overflow-x-hidden relative">
          <div
            className="flex w-40 lg:w-[200px] transition ease-out duration-1000"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
            }}
          >
            {videoNames.map((elem) => (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/public/thumbnails/${
                  elem.name
                }.png`}
                className="mx-2 w-36 lg:w-[180px]"
                key={elem.id}
                alt={elem.name}
              />
            ))}
          </div>
          {isMobile && videoNames.length > 2 && (
            <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-1.5">
              <button type="button" onClick={previousImage}>
                <BsFillArrowLeftCircleFill />
              </button>
              <button type="button" onClick={nextImage}>
                <BsFillArrowRightCircleFill />
              </button>
            </div>
          )}
          {!isMobile && videoNames.length > 5 && (
            <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-1.5">
              <button type="button" onClick={previousImage}>
                <BsFillArrowLeftCircleFill />
              </button>
              <button type="button" onClick={nextImage}>
                <BsFillArrowRightCircleFill />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

DynamicCarousel.propTypes = {
  playlist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        details: PropTypes.string,
        category_id: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
};
