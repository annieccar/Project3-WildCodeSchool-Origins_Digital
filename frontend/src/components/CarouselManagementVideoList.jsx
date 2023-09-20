import { useState } from "react";
import PropTypes, { shape } from "prop-types";

import formatStringFromDb from "../services/formatStringFromDb";
import magnifier from "../assets/images/Vector.png";

function CarouselManagementVideoList({
  videosList,
  currentCarousel,
  setCurrentCarousel,
  categoriesList,
}) {
  const [videoListFilters, setVideoListFilters] = useState({
    videoName: "",
    category: null,
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
    setVideoListFilters({ videoName: "", category: null });
  };

  return (
    videosList.length > 0 && (
      <div>
        <div>
          <label htmlFor="categories">Filter by category</label>
          <select
            name="categories"
            id="categories"
            onChange={(e) =>
              setVideoListFilters({
                ...videoListFilters,
                category: parseInt(e.target.value, 10),
              })
            }
          >
            <option value={0}>-- Choose a category -- </option>
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>
                {formatStringFromDb(category.name)}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="bg-dark w-36 lg:w-48 h-8 lg:h-8 font-primary text-lg lg:text-xl p-2 border-2 lg:border-2 border-orange rounded-md text-gray "
            placeholder="search"
            value={videoListFilters.videoName}
            onChange={(e) =>
              setVideoListFilters({
                ...videoListFilters,
                videoName: e.target.value,
              })
            }
          />
          <img src={magnifier} className="  h-5 w-5 " alt="search" />
          <button type="button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
        <ul className=" border-solid border-2 border-orange w-48 px-5 py-3 rounded-md">
          {applyFiltersToVideosList().map((video) => (
            <li key={video.name} className="flex ">
              <label htmlFor={`${video.name}`}>
                {formatStringFromDb(video.name)}
              </label>
              <input
                type="checkbox"
                checked={isChecked(video.id)}
                onChange={() => handleCheckbox(video.id)}
                name={`${video.name}`}
                id={`${video.name}`}
              />
            </li>
          ))}
        </ul>
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
