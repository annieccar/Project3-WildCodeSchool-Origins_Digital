import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HoverVideoPlayer from "react-hover-video-player";

import { useNavigate } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function StaticCarousel({ videosArray }) {
  const videos = videosArray;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carousselLength, setCarousselLength] = useState(null);

  const navigate = useNavigate();

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setCarousselLength(2);
    } else {
      setCarousselLength(5);
    }
  };

  useEffect(() => {
    // Initial check on component mount
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup the listener on component unmount
  }, [carousselLength]);

  // Function to change manually to the next image
  const nextImage = () => {
    if (videos.length <= carousselLength) {
      setCurrentImageIndex(currentImageIndex);
    } else if (currentImageIndex === videos.length - carousselLength) {
      setCurrentImageIndex(videos.length - carousselLength);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Function to change manually to the previous image
  const previousImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-start w-100 lg:w-1000px">
      {videos.length > 0 && (
        <div className="flex ">
          <button type="button" onClick={previousImage}>
            <BsFillArrowLeftCircleFill />
          </button>

          <div className="flex w-80 h-32 lg:w-[980px] overflow-x-hidden overflow-y-hidden relative">
            <div
              className="flex w-40 lg:w-[200px] transition ease-out duration-1000"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {videos.map((elem) => (
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/videos/${elem.id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(`/videos/${elem.id}`);
                    }
                  }}
                  key={elem.id}
                  className="hover:scale-[115%] duration-300 ease-in-out
"
                >
                  <HoverVideoPlayer
                    videoSrc={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/Public/videos/${elem.file_name}.mp4`}
                    pausedOverlay={
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/Public/thumbnails/${elem.file_name}.png`}
                        alt={elem.id}
                        className="min-w-[144px] lg:min-w-[180px]"
                      />
                    }
                    className=" mx-2 min-w-[144px] lg:min-w-[180px]"
                  />
                </button>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => nextImage(carousselLength)}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      )}
    </div>
  );
}

StaticCarousel.propTypes = {
  videosArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
