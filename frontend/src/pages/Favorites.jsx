import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import FavoritesCarousel from "../components/FavoritesCarousel";
import interceptor from "../hooks/useInstanceWithInterceptor";
import deleteIcon from "../assets/images/delete.svg";

export default function Favorites() {
  const [playlists, setPlaylists] = useState(null);
  const { user } = useCurrentUserContext();
  const navigate = useNavigate();
  const expressAPI = interceptor();

  const fetchUserPlaylists = () => {
    expressAPI
      .get(`/api/playlists/user/${user.id}/videos`)
      .then((res) => {
        setPlaylists(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUserPlaylists();
  }, []);

  const handleDelete = (id) => {
    expressAPI.delete(`/api/playlists/${id}`).then((res) => {
      if (res.status === 204) {
        fetchUserPlaylists();
      }
    });
  };

  return (
    <div className="bg-almostWhite dark:bg-dark flex flex-col items-center py-5">
      <h1 className="text-orange lg:text-3xl font-semibold mb-5">
        My Playlists
      </h1>
      <div className="flex flex-col mb-10 w-11/12 items-center">
        {playlists &&
          playlists.map((playlist) => (
            <div key={playlist.id}>
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  className="w-fit flex gap-2 ml-5 items-center"
                  onClick={() => navigate(`/playlists/${playlist.id}`)}
                >
                  <h1 className="text-orange lg:text-2xl font-semibold">
                    {playlist.name}
                  </h1>
                  <p className="lg:text-lg font-semibold">{`(${
                    playlist.count
                  } ${playlist.count > 1 ? "videos" : "video"})`}</p>
                </button>
                <div className="flex mr-5 gap-2">
                  <button
                    type="button"
                    className="text-white bg-orange-gradient text-sm lg:text-md font-semibold rounded-2xl w-auto px-2 lg:px-4"
                    onClick={() => navigate(`/playlists/${playlist.id}`)}
                  >
                    Show
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-blue-gradient font-semibold rounded-full px-2 py-0.5"
                    onClick={() => handleDelete(playlist.id)}
                  >
                    <p className="text-sm text-white lg:text-md">Delete</p>
                    <img src={deleteIcon} alt="Delete" />
                  </button>
                </div>
              </div>
              {playlist.count > 0 && (
                <div className="mb-5 lg:mb-10">
                  <FavoritesCarousel playlist={playlist} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
