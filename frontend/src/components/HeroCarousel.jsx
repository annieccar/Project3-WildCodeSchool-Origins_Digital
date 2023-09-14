import { useEffect, useState } from "react";
import axios from "axios";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function HeroCarousel() {
  const [videoNames, setVideoNames] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/carousels/1/videos`)
      .then((response) => {
        const names = [];
        response.data.map((elem) => names.push(elem.file_name));
        setVideoNames(names);
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
    }, 3000);

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
        <div className="w-80 lg:w-[900px] overflow-hidden relative">
          <div
            className="flex w-80 lg:w-[900px] transition ease-out duration-1000"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
            }}
          >
            {videoNames.map((elem) => (
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/Public/thumbnails/${elem}.png`}
                key={elem}
                alt={elem}
                className="w-80 lg:w-[900px] object-cover"
              />
            ))}
          </div>
          <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-1.5">
            <button type="button" onClick={previousImage}>
              <BsFillArrowLeftCircleFill />
            </button>
            <button type="button" onClick={nextImage}>
              <BsFillArrowRightCircleFill />
            </button>
          </div>

          <div className="absolute bottom-0 py-1 flex justify-center w-full">
            {videoNames.map((video, index) => {
              return (
                <div
                  key={video}
                  className={`rounded-full w-2 h-2 m-0.5 lg:mx-1 lg:w-3 lg:h-3  ${
                    index === currentImageIndex ? "bg-gray" : "bg-white"
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
