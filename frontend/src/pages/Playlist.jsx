import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import interceptor from "../hooks/useInstanceWithInterceptor";

import VideoCardPlaylist from "../components/VideoCardPlaylist";

export default function Playlist() {
  const [playlistVideos, setPlaylistVideos] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const expressAPI = interceptor();

  const fetchPlaylistVideos = () => {
    expressAPI
      .get(`/api/playlists/${id}/videos`)
      .then((res) => setPlaylistVideos(res.data));
  };

  const fetchCategories = () => {
    expressAPI
      .get(`/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  };

  const fetchPlaylistName = () => {
    expressAPI
      .get(`/api/playlists/${id}`)
      .then((res) => setPlaylist(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    expressAPI.delete(`/api/playlists/${playlist.id}`).then((res) => {
      if (res.status === 204) {
        navigate("/playlists");
      }
    });
  };

  useEffect(() => {
    fetchPlaylistVideos();
    fetchCategories();
    fetchPlaylistName();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-almostWhite dark:bg-dark flex flex-col gap-3 pb-20 lg:py-5 lg: max-w-[1144px]">
        {playlist && (
          <h1 className="text-center text-2xl text-orange font-semibold lg:text-3xl">
            {playlist.name}
          </h1>
        )}
        {playlistVideos && categories && (
          <>
            <div className="flex justify-center items-center gap-3 mb-5 mx-3 lg:mt-5 lg:justify-end">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="lg:w-[170px] w-32 h-10 rounded-full bg-almostWhite dark:bg-dark border-2 border-orange focus:outline-none px-2"
              />
              <select
                className="h-10 w-32 lg:w-[170px] bg-almostWhite dark:bg-dark object-fit rounded-full focus:outline-none border-2 px-3"
                name="filters"
                id="filters"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="bg-blue-gradient font-semibold rounded-full px-2 py-0.5 h-10"
                onClick={() => handleDelete(playlist.id)}
              >
                <p className="text-sm text-white lg:text-md">
                  Delete this playlist
                </p>
              </button>
            </div>
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-4 mx-auto">
              {playlistVideos
                .filter(
                  (video) =>
                    !selectedCategory.length ||
                    video.category_id === parseInt(selectedCategory, 10)
                )
                .filter(
                  (video) =>
                    !search.length ||
                    video.name
                      .toLocaleLowerCase()
                      .trim()
                      .includes(search.toLocaleLowerCase().trim())
                )
                .map((video) => (
                  <VideoCardPlaylist
                    key={video.id}
                    video={video}
                    categories={categories}
                    playlist={playlist}
                    fetchPlaylistVideos={fetchPlaylistVideos}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
