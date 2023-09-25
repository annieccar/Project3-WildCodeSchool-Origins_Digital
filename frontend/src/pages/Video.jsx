import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import AddFavoritesPopUp from "../components/AddFavoritesPopUp";
import SharePopUp from "../components/SharePopUp";
import expressApi from "../services/expressAPI";
import StaticCarousel from "../components/StaticCarousel";
import add from "../assets/images/addPlaylist.svg";
import share from "../assets/images/share.svg";

export default function Video() {
  const { id } = useParams();
  const [videoInfos, setVideoInfos] = useState(null);
  const [details, setDetails] = useState(false);
  const [addPlaylist, setAddPlaylist] = useState(false);
  const [shareVideo, setShareVideo] = useState(false);
  const [categoryVideos, setCategoryVideos] = useState([]);

  useEffect(() => {
    expressApi
      .get(`/api/videos/${id}`)
      .then((res) => {
        setVideoInfos(res.data);
        expressApi
          .get(`/api/categories/${res.data.category_id}/videos`)
          .then((response) => {
            setCategoryVideos(response.data.filter((video) => video.id !== id));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddPlaylist = () => {
    setAddPlaylist(!addPlaylist);
  };

  const handleShare = () => {
    setShareVideo(!shareVideo);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-almostWhite dark:bg-dark lg:pb-16">
      {videoInfos && (
        <div className="mt-8 flex flex-col items-center">
          <h1 className="mb-5 text-orange text-center font-primary text-2xl lg:text-3xl font-bold">
            {videoInfos.name}
          </h1>
          <video
            className="w-10/12 lg:w-[1000px]"
            controls
            controlsList="nodownload"
            key={videoInfos.file_name}
          >
            <track default kind="captions" />
            <source
              src={`${import.meta.env.VITE_BACKEND_URL}/public/videos/${
                videoInfos.file_name
              }.mp4`}
              type="video/mp4"
            />
          </video>
          <div className="w-10/12 lg:w-[1000px] mt-5 flex justify-between mb-5 lg:mb-3">
            <button
              className="flex items-center gap-2"
              type="button"
              onClick={() => setDetails(!details)}
            >
              <p className="text-orange font-primary font-semibold text-lg">
                Details
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="9"
                viewBox="0 0 19 9"
                fill="none"
              >
                <path
                  d="M2.2325 0L9.5 5.45141L16.7675 0L19 1.67827L9.5 8.81986L0 1.67827L2.2325 0Z"
                  fill="#FF680A"
                />
              </svg>
            </button>
            <div className="flex gap-3 items-center">
              <button
                type="button"
                onClick={handleAddPlaylist}
                className="flex gap-2 items-center border-2 border-orange rounded-full px-3 py-1"
              >
                <p className="text-orange text-sm font-semibold">Add</p>
                <img src={add} alt="add-playlist" className="w-6" />
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex gap-2 items-center border-2 border-orange rounded-full px-3 py-1"
              >
                <p className="text-orange text-sm font-semibold">Share</p>
                <img src={share} alt="share" className="w-5" />
              </button>
            </div>
          </div>
          {details && (
            <div className="w-10/12 lg:w-full">
              <p>{videoInfos.details}</p>
            </div>
          )}
          {addPlaylist &&
            createPortal(
              <AddFavoritesPopUp
                close={() => setAddPlaylist(false)}
                videoInfos={videoInfos}
              />,
              document.body
            )}
          {shareVideo &&
            createPortal(<SharePopUp videoInfos={videoInfos} />, document.body)}
        </div>
      )}
      {categoryVideos && (
        <div className="relative mt-10">
          <div className="flex justify-between items-center">
            <h1 className="text-lightBlue dark:text-orange font-primary font-bold text-xl my-3 ml-5">
              More videos like this
            </h1>
            <button
              type="button"
              onClick={() => {
                navigate(`/category/${videoInfos.category_id}`);
              }}
              className="text-white bg-orange-gradient font-semibold rounded-full h-8 px-4 py-0.5 mr-5"
            >
              See all
            </button>
          </div>
          <StaticCarousel videosArray={categoryVideos} />
        </div>
      )}
    </div>
  );
}
