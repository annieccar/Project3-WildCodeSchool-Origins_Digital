import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
import PropTypes from "prop-types";
import formatTimeFromDb from "../services/formatTimeFromDb";
import PlaylistMenuModal from "./PlaylistMenuModal";
import dots from "../assets/images/dots.svg";

export default function VideoCardPlaylist({
  video,
  categories,
  playlist,
  fetchPlaylistVideos,
}) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const getCategory = (categoryId) => {
    const { name } = categories.find((elem) => elem.id === categoryId);
    return name;
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className="relative hover:scale-[110%] duration-300 ease-in-out
"
        onClick={() => navigate(`/videos/${video.id}`)}
      >
        <HoverVideoPlayer
          videoSrc={`${import.meta.env.VITE_BACKEND_URL}/Public/videos/${
            video.file_name
          }.mp4`}
          pausedOverlay={
            <>
              <img
                className="w-64 rounded-lg"
                src={`${import.meta.env.VITE_BACKEND_URL}/public/thumbnails/${
                  video.file_name
                }.png`}
                alt=""
              />
              <div className="w-12 bg-lightBlue dark:bg-white text-almostWhite dark:text-dark lg:text-sm font-bold rounded-lg absolute z-10 right-1 bottom-1">
                {formatTimeFromDb(video.duration)}
              </div>
            </>
          }
          playbackRangeEnd={5}
          loadingStateTimeout={1000}
          controls
          controlsList="nodownload nofullscreen"
          className="w-64 rounded-lg relative"
        />
      </button>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="text-orange font-semibold text-xl">{video.name}</h3>
          <div className="relative flex gap-2 items-center">
            {video.category_id && (
              <button
                type="button"
                className="px-2 py-0.5 rounded-lg font-semibold text-white text-sm bg-orange-gradient"
                onClick={() => navigate(`/category/${video.category_id}`)}
              >
                {getCategory(video.category_id)}
              </button>
            )}
            <button type="button" onClick={() => setModal(true)}>
              <img src={dots} alt="menu" />
            </button>
            {modal && (
              <PlaylistMenuModal
                video={video}
                playlist={playlist}
                fetchPlaylistVideos={fetchPlaylistVideos}
                close={() => setModal(false)}
              />
            )}
          </div>
        </div>
        <p>{video.details}</p>
      </div>
    </div>
  );
}

VideoCardPlaylist.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    file_name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
  playlist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  fetchPlaylistVideos: PropTypes.func.isRequired,
};

VideoCardPlaylist.defaultProps = {
  playlist: null,
};
