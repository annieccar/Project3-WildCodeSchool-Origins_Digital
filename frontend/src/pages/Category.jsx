import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
import interceptor from "../hooks/useInstanceWithInterceptor";

import magnifier from "../assets/images/Vector.png";
import formatTimeFromDb from "../services/formatTimeFromDb";

export default function Category() {
  const { id } = useParams();

  const [categoryDetails, setCategoryDetails] = useState("");
  const [categoryVideos, setCategoryVideos] = useState([]);
  const expressAPI = interceptor();

  const navigate = useNavigate();

  useEffect(() => {
    expressAPI
      .get(`/api/categories/${id}`)
      .then((response) => {
        setCategoryDetails(response.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    expressAPI
      .get(`/api/categories/${id}/videos`)
      .then((response) => {
        setCategoryVideos(response.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const [orderBy, setOrderBy] = useState("");
  const [keyword, setKeyword] = useState("");

  const capitalizeFirstLetter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  };

  const handleFilter = (e) => {
    setOrderBy(e.target.value);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleClick = (elem) => {
    navigate(`/videos/${elem.id}`);
  };

  return (
    <div className="flex flex-col items-center bg-dark">
      {categoryDetails && (
        <h1 className="text-orange font-primary font-bold text-2xl lg:text-3xl m-6 w-[340px] lg:w-[700px]">
          {capitalizeFirstLetter(categoryDetails.name)}
        </h1>
      )}
      <div className="w-[340px] flex justify-between mb-4 relative h-8 lg:w-[700px] lg:justify-start">
        <select
          className="bg-dark w-36 font-primary text-lg lg:mr-20 lg:w-32 lg:text-xl"
          onChange={handleFilter}
        >
          <option value="">Order by </option>
          <option value="name">Name</option>
          <option value="duration">Duration</option>
        </select>
        <input
          className="bg-dark w-36 lg:w-48 h-8 lg:h-8 font-primary text-lg lg:text-xl p-2 border-2 lg:border-2 border-orange rounded-full text-gray "
          placeholder="Search..."
          onChange={handleSearch}
        />
        <img
          src={magnifier}
          className="absolute right-1.5 top-1.5 h-5 w-5 lg:right-[310px]"
          alt="search"
        />
      </div>

      {categoryVideos && (
        <div className="w-[380px] lg:w-[800px] flex flex-wrap justify-center mb-16">
          {categoryVideos
            .filter((elem) =>
              elem.name.toLowerCase().includes(keyword.toLowerCase())
            )
            .sort(() => orderBy === "" && 0)
            .sort((a, b) => orderBy === "name" && a.name.localeCompare(b.name))
            .sort((a, b) => orderBy === "duration" && a.duration - b.duration)
            .map((elem) => (
              <div key={elem.name} className="flex flex-col items-center">
                <button
                  type="button"
                  className="relative"
                  onClick={() => handleClick(elem)}
                >
                  <HoverVideoPlayer
                    videoSrc={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/Public/videos/${elem.file_name}.mp4`}
                    pausedOverlay={
                      <>
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/Public/thumbnails/${elem.file_name}.png`}
                          alt={elem.name}
                          className="rounded-md"
                        />
                        <div className="bg-white text-black font-bold absolute rounded-lg right-1 bottom-1 text-sm px-1 font-primary z-10">
                          {formatTimeFromDb(elem.duration)}
                        </div>
                      </>
                    }
                    playbackRangeEnd={5}
                    loadingStateTimeout={1000}
                    controls
                    controlsList="nodownload nofullscreen"
                    className="w-40 lg:w-80 mx-3.5 my-1 lg:mx-10 lg:mt-6 rounded-md"
                  />
                </button>
                <p className="mb-3 font-primary text-orange text-md lg:text-xl font-bold">
                  {elem.name}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
