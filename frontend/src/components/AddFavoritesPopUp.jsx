import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import interceptor from "../hooks/useInstanceWithInterceptor";

export default function AddFavoritesPopUp({ videoInfos, setAddPlaylist }) {
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(
    "--Select a playlist--"
  );
  const expressAPI = interceptor();
  const { user } = useCurrentUserContext();

  const getPlaylistsByUser = () => {
    expressAPI
      .get(`/api/playlists/user/${user.id}`)
      .then((res) => setUserPlaylists(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPlaylistsByUser();
  }, []);

  const handlePlaylistCreationToggle = () => {
    setCreatePlaylist(!createPlaylist);
  };

  const handlePlaylistCreation = async () => {
    if (playlistName.trim().length) {
      try {
        await expressAPI.post(`/api/playlists`, {
          name: playlistName,
          user_id: user.id,
        });
        getPlaylistsByUser();
        setPlaylistName("");
        setCreatePlaylist(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddPlaylist = () => {
    if (selectedPlaylist !== "--Select a playlist--") {
      expressAPI.post(`/api/playlists/${selectedPlaylist}/video`, {
        video_id: videoInfos.id,
        playlist_id: selectedPlaylist,
      });
      setAddPlaylist(false);
    }
  };

  return (
    <div className="bg-dark p-3 rounded-md flex flex-col gap-2 absolute z-50 top-1/3 ">
      <p className="text-orange text-center">{videoInfos.name}</p>
      <div className="flex flex-col gap-1">
        <label htmlFor="playlist-selector">
          Add this video to a playlist :
        </label>
        <select
          name="playlist-selector"
          id="playlist-selector"
          className="rounded-md bg-dark "
          onChange={(e) => setSelectedPlaylist(e.target.value)}
        >
          <option defaultValue="">--Select a playlist--</option>
          {userPlaylists &&
            userPlaylists.map((playlist) => (
              <option value={playlist.id} key={playlist.id}>
                {playlist.name}
              </option>
            ))}
        </select>
      </div>
      <button
        type="button"
        className="flex gap-2"
        onClick={handlePlaylistCreationToggle}
      >
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
        >
          <path
            d="M9 12h3m3 0h-3m0 0V9m0 3v3M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z"
            stroke="url(#paint0_linear_10_334)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_10_334"
              x1="1"
              y1="14.0716"
              x2="24.3333"
              y2="14.0716"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8200" />
              <stop offset="1" stopColor="#FF2415" />
            </linearGradient>
          </defs>
        </svg>
        <p>Create a playlist</p>
      </button>
      {createPlaylist ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Choose a name"
            value={playlistName}
            className="text-white bg-dark"
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-orange rounded-full py-1 px-3 mt-2"
              onClick={handlePlaylistCreation}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-orange rounded-full py-1 px-3 mt-2"
            onClick={handleAddPlaylist}
          >
            Add video
          </button>
        </div>
      )}
    </div>
  );
}

AddFavoritesPopUp.propTypes = {
  videoInfos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    details: PropTypes.string,
    category_id: PropTypes.number,
  }).isRequired,
  setAddPlaylist: PropTypes.func.isRequired,
};
