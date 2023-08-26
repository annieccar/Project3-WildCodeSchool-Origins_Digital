import { useEffect, useState } from "react";
import axios from "axios";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function HeroCarousel() {
  const [videoNames, setVideoNames] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Retrieve thumbnails names from database
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/carousels/1/videos`)
      .then((response) => {
        const names = [];
        response.data.map((elem) => names.push(elem.name));
        setVideoNames(names);
      })
      .catch((err) => console.error(err));
  }, []);

  // Set the image index dynamically
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

  // Function to change manually to the next image
  const nextImage = () => {
    if (currentImageIndex === videoNames.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Function to change manually to the previous image
  const previousImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(videoNames.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center py-5">
      <h1 className="text-orange font-primary font-bold text-xl my-2">
        Trending Now
      </h1>
      {videoNames.length > 0 && (
        <div className="w-80 lg:w-2/5 overflow-hidden relative">
          <div
            className="flex w-full transition ease-out duration-1000"
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
                className="mx-auto"
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
                  className={`rounded-full w-2 h-2 m-0.5 ${
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
