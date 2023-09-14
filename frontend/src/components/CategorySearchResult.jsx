import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
import formatStringFromDb from "../services/formatStringFromDb";

export default function CategorySearchResults({ categoryName, searchResults }) {
  return (
    <div>
      {searchResults?.length !== 0 && (
        <div className="mx-2 lg:mx-5">
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
                      <div className="absolute px-0.5 rounded-xl top-1 right-1 z-10 drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,1)]  ">
                        <p className="text-xs text- font-medium drop-shadow-[0_0.8px_1.8px_rgba(240,100,10,1)] box-decoration-slice ">
                          {video.duration}
                        </p>
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
