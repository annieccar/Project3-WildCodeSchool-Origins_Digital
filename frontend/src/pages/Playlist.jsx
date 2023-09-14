import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import expressAPI from "../services/expressAPI";
import formatTimeFromDb from "../services/formatTimeFromDb";

export default function Playlist() {
  const [playlistVideos, setPlaylistVideos] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

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

  const getCategory = (categoryId) => {
    const { name } = categories.find((elem) => elem.id === categoryId);
    return name;
  };

  return (
    <div className="bg-dark flex flex-col gap-3 mt-5 pb-20">
      {playlist && (
        <h1 className="text-center text-orange font-semibold lg:text-3xl">
          {playlist.name}
        </h1>
      )}
      {playlistVideos && categories && (
        <>
          <div className="flex gap-2 mb-5 mx-auto lg:justify-end lg:mr-5">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg bg-dark border-2 border-orange focus:outline-none pl-1"
            />
            <select
              className="bg-dark object-fit rounded-lg border-2"
              name="filters"
              id="filters"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- Select a filter --</option>
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
              .filter((video) => !search.length || video.name.includes(search))
              .map((video) => (
                <div
                  className="flex flex-col items-center gap-2"
                  key={video.id}
                >
                  <button
                    type="button"
                    className="relative"
                    onClick={() => navigate(`/videos/${video.id}`)}
                  >
                    <img
                      className="w-64 rounded-lg"
                      src={`${
                        import.meta.env.VITE_BACKEND_URL
                      }/public/thumbnails/${video.file_name}.png`}
                      alt=""
                    />
                    <div className="w-16 mr-1 mb-1 bg-white text-dark lg:text-md font-bold rounded-lg absolute z-10 right-0 bottom-0">
                      {formatTimeFromDb(video.duration)}
                    </div>
                  </button>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between">
                      <h3 className="text-orange font-semibold text-xl">
                        {video.name}
                      </h3>
                      {video.category_id && (
                        <div>
                          <button
                            type="button"
                            className="px-2 pb-1 rounded-lg font-semibold text-sm bg-orange-gradient"
                            onClick={() =>
                              navigate(`/category/${video.category_id}`)
                            }
                          >
                            {getCategory(video.category_id)}
                          </button>
                        </div>
                      )}
                    </div>
                    <p>{video.details}</p>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
