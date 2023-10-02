import PropTypes from "prop-types";
import useInstanceWithInterceptor from "../hooks/useInstanceWithInterceptor";

export default function PlaylistMenuModal({
  video,
  close,
  playlist,
  fetchPlaylistVideos,
}) {
  const expressAPI = useInstanceWithInterceptor();

  const handleDelete = async () => {
    await expressAPI.delete("/api/playlists/video", {
      data: {
        videoId: video.id,
        playlistId: playlist.id,
      },
    });
    close();
    fetchPlaylistVideos();
  };
  return (
    <>
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="fixed inset-0"
      />
      <div className="absolute z-10 flex flex-col right-0 translate-y-[2rem] border-2 border-orange backdrop-blur-lg rounded-lg whitespace-nowrap py-1 px-2">
        <button
          type="button"
          className="text-sm font-bold"
          onClick={handleDelete}
        >
          Delete from playlist
        </button>
      </div>
    </>
  );
}

PlaylistMenuModal.propTypes = {
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
  }).isRequired,
  close: PropTypes.func.isRequired,
  fetchPlaylistVideos: PropTypes.func.isRequired,
};
