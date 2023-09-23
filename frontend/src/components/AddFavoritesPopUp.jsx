import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import create from "../assets/images/create.svg";
import expressAPI from "../services/expressAPI";
import PlaylistCheckbox from "./PlaylistCheckbox";

export default function AddFavoritesPopUp({ videoInfos, close }) {
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const { user } = useCurrentUserContext();

  const getPlaylistsByUser = () => {
    expressAPI
      .get(`/api/playlists/user/${user.id}/videos`)
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

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 backdrop-blur-lg"
        aria-label="close"
        onClick={close}
      />
      <div className="bg-dark w-11/12 lg:min-w-[30rem] lg:w-fit flex flex-col gap-1 font-primary  text-white fixed z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 rounded-lg border-2 border-orange">
        <p className="text-orange text-center text-xl lg:text-3xl font-bold mb-3">
          {videoInfos.name}
        </p>
        <div className="flex flex-col">
          <p className="lg:text-xl font-semibold">
            Add this video to a playlist :
          </p>
          <div className="flex flex-col gap-1 p-2 my-5 max-h-[15rem] overflow-y-auto">
            {userPlaylists &&
              userPlaylists.map((playlist) => (
                <PlaylistCheckbox
                  playlist={playlist}
                  videoInfos={videoInfos}
                  key={playlist.id}
                />
              ))}
          </div>
        </div>
        <button
          type="button"
          className="flex gap-3 items-center"
          onClick={handlePlaylistCreationToggle}
        >
          <img src={create} alt="create-playlist" className="w-5 lg:w-7" />

          <p className="lg:text-lg font-semibold">Create a playlist</p>
        </button>
        {createPlaylist && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Choose a name"
              value={playlistName}
              className="text-white bg-dark focus:outline-none"
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="button"
                className="w-32 bg-orange-gradient rounded-full py-1 px-3 mt-2"
                onClick={handlePlaylistCreation}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

AddFavoritesPopUp.propTypes = {
  videoInfos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    file_name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    details: PropTypes.string,
    category_id: PropTypes.number,
  }).isRequired,
  close: PropTypes.func.isRequired,
};
