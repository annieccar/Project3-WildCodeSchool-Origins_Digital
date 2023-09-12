import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddFavoritesPopUp from "../components/AddFavoritesPopUp";
import SharePopUp from "../components/SharePopUp";

export default function Video() {
  const { id } = useParams();
  const [videoInfos, setVideoInfos] = useState(null);
  const [details, setDetails] = useState(false);
  const [addPlaylist, setAddPlaylist] = useState(false);
  const [shareVideo, setShareVideo] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/videos/${id}`)
      .then((res) => setVideoInfos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddPlaylist = () => {
    setAddPlaylist(!addPlaylist);
    setShareVideo(false);
  };

  const handleShare = () => {
    setShareVideo(!shareVideo);
    setAddPlaylist(false);
  };

  const handleBlur = () => {
    setAddPlaylist(false);
    setShareVideo(false);
  };

  return (
    <div>
      {videoInfos && (
        <div className="mt-8 flex flex-col items-center">
          <h1 className="mb-5 text-white font-primary">{videoInfos.name}</h1>
          <video className="w-10/12 lg:w-1/2" controls>
            <track default kind="captions" />
            <source
              src={`${import.meta.env.VITE_BACKEND_URL}/public/videos/${
                videoInfos.file_name
              }.mp4`}
              type="video/mp4"
            />
          </video>
          <div className="w-10/12 lg:w-1/2 mt-5 flex justify-between">
            <button
              className="flex items-center gap-2"
              type="button"
              onClick={() => setDetails(!details)}
            >
              <p className="text-orange font-primary">Details</p>
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
            <div className="flex gap-3">
              <button type="button" onClick={handleAddPlaylist}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="28"
                  viewBox="0 0 39 28"
                  fill="none"
                >
                  <path
                    d="M30.6 23.9316H34.3M34.3 23.9316H38M34.3 23.9316V20.4037M34.3 23.9316V27.4596M1 11.5838H34.3M1 22.1677H23.2M1 1H34.3"
                    stroke="url(#paint0_linear_10_338)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_10_338"
                      x1="1"
                      y1="14.6078"
                      x2="38"
                      y2="14.6078"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8200" />
                      <stop offset="1" stopColor="#FF2415" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
              <button type="button" onClick={handleShare}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="28"
                  viewBox="0 0 26 28"
                  fill="none"
                >
                  <path
                    d="M24.3333 15.1205V23.5928C24.3333 24.3418 24.026 25.0602 23.4791 25.5898C22.9321 26.1194 22.1902 26.4169 21.4167 26.4169H3.91667C3.14312 26.4169 2.40125 26.1194 1.85427 25.5898C1.30729 25.0602 1 24.3418 1 23.5928V15.1205M12.6667 17.9446V1M12.6667 1L7.5625 5.94218M12.6667 1L17.7708 5.94218"
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
              </button>
            </div>
          </div>
          {details && (
            <div className="w-10/12 lg:w-1/2">
              <p>{videoInfos.details}</p>
            </div>
          )}
          {(addPlaylist || shareVideo) && (
            <button type="button" onClick={handleBlur}>
              <div className="fixed z-10 top-0 bottom-0 left-0 right-0 backdrop-blur-lg" />
            </button>
          )}
          {addPlaylist && (
            <AddFavoritesPopUp
              videoInfos={videoInfos}
              setAddPlaylist={setAddPlaylist}
            />
          )}
          {shareVideo && <SharePopUp videoInfos={videoInfos} />}
        </div>
      )}
    </div>
  );
}
