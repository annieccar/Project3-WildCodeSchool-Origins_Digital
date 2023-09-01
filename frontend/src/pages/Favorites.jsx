import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import DynamicCarousel from "../components/DynamicCarousel";

export default function Favorites() {
  const [playlists, setPlaylists] = useState(null);
  const { user } = useCurrentUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists/user/${
          user.id
        }/videos`
      )
      .then((res) => {
        setPlaylists(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-dark flex flex-col items-center gap-7 py-5">
      <h1 className="text-orange lg:text-3xl font-semibold">My Playlists</h1>
      {playlists &&
        playlists.map((playlist) => (
          <div className="flex flex-col gap-5" key={playlist.id}>
            <button
              type="button"
              className="flex gap-2 ml-5 items-center"
              onClick={() => navigate(`/playlists/${playlist.id}`)}
            >
              <h1 className="text-orange lg:text-2xl font-semibold">
                {playlist.name}
              </h1>
              <p className="lg:text-lg font-semibold">{`(${playlist.count} ${
                playlist.count > 1 ? "videos" : "video"
              })`}</p>
            </button>
            <div>
              <DynamicCarousel playlist={playlist} />
            </div>
            {/* <div className="grid grid-cols-5 gap-2 ml-5">
              {playlist.videos.map((video) => (
                <button
                  type="button"
                  key={video.id}
                  onClick={() => navigate(`/videos/${video.id}`)}
                >
                  <img
                    className="rounded-lg"
                    src={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/public/thumbnails/${video.name}.png`}
                    alt={video.name}
                  />
                </button>
              ))}
            </div> */}
          </div>
        ))}
    </div>
  );
}
