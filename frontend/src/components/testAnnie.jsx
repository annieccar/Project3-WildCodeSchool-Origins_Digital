import { useEffect, useState } from "react";
import axios from "axios";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function TestAnnie() {
  const [videoNames, setVideoNames] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(true);

  // Retrieve thumbnails names from database
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/videos`)
      .then((response) => {
        const names = [];
        response.data.map((elem) => names.push(elem.name));
        setVideoNames(names);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // Detect screen size and set the state
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Add a listener for window resize events
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to change manually to the next image(mobile view)
  const nextImageMobile = () => {
    if (currentImageIndex === videoNames.length - 2) {
      setCurrentImageIndex(videoNames.length - 2);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Function to change manually to the next image(large screens)
  const nextImageDesktop = () => {
    if (currentImageIndex === videoNames.length - 5) {
      setCurrentImageIndex(videoNames.length - 5);
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
    <div className="flex flex-col items-center py-5">
      <h1 className="text-orange font-primary font-bold text-xl my-2">
        Trending Now
      </h1>
      {videoNames.length > 0 && (
        <div className="w-80 lg:w-[980px] overflow-hidden relative">
          <div
            className="flex w-40 lg:w-[200px] transition ease-out duration-1000"
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
                className="mx-2 w-36 lg:w-[180px]"
              />
            ))}
          </div>
          <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-1.5">
            <button type="button" onClick={previousImage}>
              <BsFillArrowLeftCircleFill />
            </button>
            {isMobile ? (
              <button type="button" onClick={nextImageMobile}>
                <BsFillArrowRightCircleFill />
              </button>
            ) : (
              <button type="button" onClick={nextImageDesktop}>
                <BsFillArrowRightCircleFill />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
