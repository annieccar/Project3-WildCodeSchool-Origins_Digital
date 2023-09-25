import { useState } from "react";
import PropTypes, { shape } from "prop-types";

import formatStringFromDb from "../services/formatStringFromDb";
import magnifier from "../assets/images/Vector.png";
import refresh from "../assets/images/refresh.svg";

function CarouselManagementVideoList({
  videosList,
  currentCarousel,
  setCurrentCarousel,
  categoriesList,
}) {
  const [videoListFilters, setVideoListFilters] = useState({
    videoName: "",
    category: "",
  });

  const isChecked = (videoId) => {
    return currentCarousel.base.some((element) => element.video_id === videoId);
  };

  const handleCheckbox = (videoId) => {
    if (currentCarousel.base.some((element) => element.video_id === videoId)) {
      if (
        currentCarousel.modified.some((element) => element.video_id === videoId)
      ) {
        return setCurrentCarousel({
          ...currentCarousel,
          base: currentCarousel.base.filter((el) => el.video_id !== videoId),
          modified: currentCarousel.modified.filter(
            (el) => el.video_id !== videoId
          ),
        });
      }
      return setCurrentCarousel({
        ...currentCarousel,
        base: currentCarousel.base.filter((el) => el.video_id !== videoId),
        modified: [
          ...currentCarousel.modified.filter((el) => el.video_id !== videoId),
          { mod: "removed", video_id: videoId },
        ],
      });
    }
    if (currentCarousel.modified.some((el) => el.video_id === videoId)) {
      return setCurrentCarousel({
        ...currentCarousel,
        base: [...currentCarousel.base, { video_id: videoId }],
        modified: currentCarousel.modified.filter(
          (el) => el.video_id !== videoId
        ),
      });
    }
    return setCurrentCarousel({
      ...currentCarousel,
      base: [...currentCarousel.base, { video_id: videoId }],
      modified: [
        ...currentCarousel.modified.filter((el) => el.video_id !== videoId),
        { mod: "added", video_id: videoId },
      ],
    });
  };

  const applyFiltersToVideosList = () => {
    return videosList
      .filter((video) => video.name.includes(videoListFilters.videoName))
      .filter((video) =>
        videoListFilters.category
          ? video.category_id === videoListFilters.category
          : true
      );
  };
  const resetFilters = () => {
    setVideoListFilters({ videoName: "", category: "" });
  };

  return (
    videosList.length > 0 && (
      <div className="bg-almostWhite dark:bg-dark">
        <h3 className="mx-8 my-4 font-semibold  text-orange">Assign videos</h3>
        <div className="flex flex-col w-full max-w-[1200px] border-solid border-2 border-orange px-5 py-3 rounded-md">
          <div className="flex self-end flex-grow max-w-[530px] m-2 rounded-md color:[#010D18] bg-[linear-gradient(90deg,#181001_0%,_#FF680A_50%,#181001_100%)]">
            <div className=" bg-almostWhite dark:bg-dark m-0.5 rounded-md w-full">
              <label htmlFor="categories" className="m-2">
                Video list filters:
              </label>
              <div className="flex flex-wrap items-center">
                <select
                  name="categories"
                  id="categories"
                  value={videoListFilters.category}
                  onChange={(e) =>
                    setVideoListFilters({
                      ...videoListFilters,
                      category: parseInt(e.target.value, 10),
                    })
                  }
                  className="bg-almostWhite dark:bg-dark xs:w-[136px] w-full font-primary text-sm lg:text-md  m-2 my-1 p-1 border-2 border-orange rounded-md text-gray "
                >
                  <option value={0}>--By category-- </option>
                  {categoriesList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {formatStringFromDb(category.name)}
                    </option>
                  ))}
                </select>
                <div className="flex justify-between items-center m-2 my-1 p-1 xs:w-[136px] w-full border-2 border-orange rounded-md placeholder:text-gray ">
                  <input
                    type="text"
                    className="w-24 mx-1  bg-almostWhite dark:bg-dark font-primary text-sm lg:text-md "
                    placeholder="By video name"
                    value={videoListFilters.videoName}
                    onChange={(e) =>
                      setVideoListFilters({
                        ...videoListFilters,
                        videoName: e.target.value,
                      })
                    }
                  />
                  <img src={magnifier} className="h-5 w-5" alt="search" />
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center border-solid border-2 p-1 border-orange rounded-3xl m-2  text-sm"
                >
                  <img
                    src={refresh}
                    alt="refresh icon"
                    className="h-5 w-5 mx-2"
                  />
                  <span className="mx-2">Reset filters</span>
                </button>
              </div>
            </div>
          </div>
          <ul
            className=" grid auto-rows-fr grid-flow-row xs:grid-cols-2 gap-x-14 gap-y sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full border-solid border-2 border-orange  
          px-5 py-3 rounded-md "
          >
            {applyFiltersToVideosList().map((video) => (
              <li key={video.name} className="">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor={`${video.name}`}>
                    {formatStringFromDb(video.name)}
                  </label>
                  <input
                    type="checkbox"
                    checked={isChecked(video.id)}
                    onChange={() => handleCheckbox(video.id)}
                    name={`${video.name}`}
                    id={`${video.name}`}
                    className="accent-orange rounded-md focus:ring-orange  focus:ring-2 "
                  />
                </div>
                <hr className="my-3 w-full h-px border-t-0  bg-[linear-gradient(90deg,#010D18_0%,_#FF680A_50%,#010D18_100%)]  " />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}

export default CarouselManagementVideoList;

CarouselManagementVideoList.propTypes = {
  videosList: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      file_name: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      category_id: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentCarousel: PropTypes.shape({
    carouselId: PropTypes.number,
    title: PropTypes.string.isRequired,
    base: PropTypes.arrayOf(
      shape({
        title: PropTypes.string,
        id: PropTypes.number,
        video_id: PropTypes.number.isRequired,
      })
    ).isRequired,
    modified: PropTypes.arrayOf(
      shape({
        mod: PropTypes.string.isRequired,
        video_id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setCurrentCarousel: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
