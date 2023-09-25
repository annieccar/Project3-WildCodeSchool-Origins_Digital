import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import HoverVideoPlayer from "react-hover-video-player";

import interceptor from "../hooks/useInstanceWithInterceptor";
import useMediaQuery from "../hooks/useMediaQuery";

export default function HeroCarousel() {
  const [videoNames, setVideoNames] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const navigate = useNavigate();

  const expressAPI = interceptor();

  useEffect(() => {
    expressAPI
      .get(`/api/carousels/1/videos`)
      .then((response) => {
        setVideoNames(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImageIndex === videoNames.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [videoNames, currentImageIndex]);

  const nextImage = () => {
    if (currentImageIndex === videoNames.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(videoNames.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center py-5">
      <h1 className="text-orange font-primary font-bold text-xl lg:text-2xl my-2 mb-4">
        Trending Now
      </h1>
      {videoNames.length > 0 && (
        <div className="flex relative">
          <button
            type="button"
            onClick={previousImage}
            className="absolute -left-7 lg:-left-16 top-[4.5rem] lg:top-1/2 z-10 text-lightBlue dark:text-white lg:mr-5"
          >
            <BsFillArrowLeftCircleFill size={isDesktop ? 35 : 20} />
          </button>
          <div className="w-80 lg:w-[900px] overflow-hidden relative">
            <div
              className="flex w-80 lg:w-[900px] transition ease-out duration-1000"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {videoNames.map((elem) => (
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
                        key={elem.id}
                        alt={elem.id}
                        className="min-w-[320px] lg:min-w-[900px]"
                      />
                    }
                    className="min-w-[320px] lg:min-w-[900px]"
                  />
                </button>
              ))}
            </div>

            <div className="absolute bottom-0 py-1 flex justify-center w-full">
              {videoNames.map((video, index) => {
                return (
                  <div
                    key={video}
                    className={`rounded-full w-2 h-2 m-0.5 mb-5 lg:mx-1 lg:w-3 lg:h-3  ${
                      index === currentImageIndex ? "bg-gray" : "bg-white"
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={nextImage}
            className="absolute -right-7 lg:-right-16 top-[4.5rem] lg:top-1/2 z-10 text-lightBlue dark:text-white lg:ml-5"
          >
            <BsFillArrowRightCircleFill size={isDesktop ? 35 : 20} />
          </button>
        </div>
      )}
    </div>
  );
}
