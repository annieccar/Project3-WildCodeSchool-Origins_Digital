import { useState } from "react";
import PropTypes from "prop-types";
import useInstanceWithInterceptor from "../hooks/useInstanceWithInterceptor";

export default function PlaylistCheckbox({ playlist, videoInfos }) {
  const [checked, setChecked] = useState(
    playlist.videos.some((video) => video.name === videoInfos.name)
  );

  const expressAPI = useInstanceWithInterceptor();

  const handleCheckbox = () => {
    if (!checked) {
      expressAPI.post(`/api/playlists/video`, {
        video_id: videoInfos.id,
        playlist_id: playlist.id,
      });
    } else {
      expressAPI.delete(`/api/playlists/video`, {
        data: {
          videoId: videoInfos.id,
          playlistId: playlist.id,
        },
      });
    }
    setChecked(!checked);
  };
  return (
    <div className="flex justify-between">
      <p className="text-lg">{playlist.name}</p>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckbox}
        className="w-5 accent-orange"
      />
    </div>
  );
}

PlaylistCheckbox.propTypes = {
  playlist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        file_name: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        details: PropTypes.string,
        category_id: PropTypes.number,
      })
    ),
  }).isRequired,
  videoInfos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    file_name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    details: PropTypes.string,
    category_id: PropTypes.number,
  }).isRequired,
};
