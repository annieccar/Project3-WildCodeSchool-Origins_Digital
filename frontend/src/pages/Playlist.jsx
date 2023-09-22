import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import expressAPI from "../services/expressAPI";
import VideoCardPlaylist from "../components/VideoCardPlaylist";

export default function Playlist() {
  const [playlistVideos, setPlaylistVideos] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const { id } = useParams();

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

  useEffect(() => {
    fetchPlaylistVideos();
    fetchCategories();
    fetchPlaylistName();
  }, []);

  return (
    <div className="bg-dark flex flex-col gap-3 pb-20 lg:py-5">
      {playlist && (
        <h1 className="text-center text-2xl text-orange font-semibold lg:text-3xl">
          {playlist.name}
        </h1>
      )}
      {playlistVideos && categories && (
        <>
          <div className="flex justify-center gap-3 mb-5 mx-3 lg:justify-end lg:mr-5">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[140px] rounded-full bg-dark border-2 border-orange focus:outline-none px-2"
            />
            <select
              className="bg-dark object-fit rounded-full focus:outline-none border-2 px-3"
              name="filters"
              id="filters"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a filter</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
  );
}
