import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
import formatStringFromDb from "../services/formatStringFromDb";
import formatTimeFromDb from "../services/formatTimeFromDb";

export default function CategorySearchResults({ categoryName, searchResults }) {
  return (
    <div>
      {searchResults?.length !== 0 && (
        <div className="mx-2 lg:mx-10">
          <div>
            <h2 className=" text-orange text-xl drop-shadow-md font-semibold font-primary m-3 ml-12 mt-16">
              {formatStringFromDb(categoryName)}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {searchResults.map(
              (video) =>
                video.category === categoryName && (
                  <Link
                    className="relative drop-shadow-3xl"
                    to={`/videos/${video.id}`}
                  >
                    <div
                      className="m-4 relative  hover:scale-[110%] duration-300 ease-in-out"
                      key={video.id}
                    >
                      <HoverVideoPlayer
                        videoSrc={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/Public/videos/${video.name}.mp4`}
                        pausedOverlay={
                          <img
                            className="rounded-md relative "
                            src={`${import.meta.env.VITE_BACKEND_URL}${
                              import.meta.env.VITE_THUMBNAILS_PATH
                            }/${video.name}.png`}
                            alt={`${video.name}`}
                          />
                        }
                        playbackRangeEnd={5}
                        loadingStateTimeout={1000}
                        controls
                        controlsList="nodownload nofullscreen"
                        className="rounded-md"
                      />

                      <p className="ml-1 mt-1 font-primary font-bold text-lg">
                        {formatStringFromDb(video.name)}
                      </p>
                      <div className="bg-white text-black font-bold absolute rounded-lg right-2 lg:right-3 bottom-11 lg:bottom-11 text-sm px-1 font-primary z-10">
                        {formatTimeFromDb(video.duration)}
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

CategorySearchResults.propTypes = {
  categoryName: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      category_id: PropTypes.number,
      category: PropTypes.string,
    })
  ).isRequired,
};
