import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function TestAnnie() {
  const [videos, setVideos] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carousselLength, setCarousselLength] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

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
    if (currentImageIndex === videos.length - carousselLength) {
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
    <div className="flex flex-col items-center py-5">
      <h1 className="text-orange font-primary font-bold text-xl my-2">
        Trending Now
      </h1>
      {videos.length > 0 && (
        <div className="flex">
          <button type="button" onClick={previousImage}>
            <BsFillArrowLeftCircleFill />
          </button>
          <div className="w-80 lg:w-[980px] overflow-hidden relative">
            <div
              className="flex w-40 lg:w-[200px] transition ease-out duration-1000"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {videos.map((elem) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <img
                  onClick={() => {
                    navigate(`/videos/${elem.id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(`/videos/${elem.id}`);
                    }
                  }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/Public/thumbnails/${
                    elem.name
                  }.png`}
                  key={elem.id}
                  alt={elem.name}
                  className="mx-2 w-36 lg:w-[180px]"
                />
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
