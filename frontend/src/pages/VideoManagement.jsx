import React, { useState, useEffect } from "react";
import expressAPI from "../services/expressAPI";

export default function VideoManagement() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedAccess, setSelectedAccess] = useState("Guest");
  const [videoLocation, setVideoLocation] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  const handleEditClick = (videoName) => {
    setSelectedVideo(videoName);
    setVideoLocation(`/backend/public/videos/${videoName}.mp4`);
  };

  const stripExtension = (filename) => {
    return filename.replace(/\.[^/.]+$/, ""); // Remove file extension
  };

  const handleAccessChange = (event) => {
    setSelectedAccess(event.target.value);
  };

  useEffect(() => {
    expressAPI
      .get(`/api/video`)
      .then((response) => setVideos(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des vidéos:", error)
      );
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center p-2 md:p-0">
      <h3 className="flex text-orange p-3 md:p-5 text-2xl md:text-3xl">
        Videos Management
      </h3>
      <div className="flex flex-col md:flex-row">
        <div className="w-full max-w-screen-md mb-5 md:w-1/2 md:pr-5">
          <h3 className="ml-5">Video List:</h3>
          <div className="border-solid rounded-2xl border-4 border-orange mb-3 p-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="p-2 flex items-center justify-between"
              >
                <span>{stripExtension(video.name)}</span>
                <div
                  className="h-4 w-4 cursor-pointer"
                  role="button"
                  onClick={() => handleEditClick(video.name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditClick(video.name);
                    }
                  }}
                  tabIndex="0"
                >
                  <img
                    src="/src/assets/images/edit.svg"
                    alt="edit-logo"
                    className="h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="border-solid rounded-2xl border-4 border-orange
             text-lg md:text-xl w-full h-10 text-orange"
            type="button"
          >
            Add video
          </button>
        </div>
        <div className="w-full max-w-screen-md md:w-1/2 ">
          <h3 className="text-orange font-bold ">Selected video details</h3>
          {selectedVideo && (
            <div>
              <img
                className="p-5 max-w-full"
                src={`/thumbnails/${selectedVideo}.png`}
                alt={`${selectedVideo}-thumbnail`}
              />
              <div className="flex flex-col p-3">
                <div className="mb-3">
                  <h4>Video title:</h4>
                  <input
                    className="border-solid border-2 border-orange rounded-md bg-blue w-full h-10 pl-1 mb-2"
                    type="text"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-3">
                  <h4>Category:</h4>
                  <input
                    className="border-solid border-2 border-orange rounded-md bg-blue w-full h-10 pl-1 mb-2"
                    type="text"
                    placeholder="Category"
                  />
                </div>
                <div className="mb-3">
                  <h4>User access:</h4>
                  <select
                    className="border-solid border-2 border-orange rounded-md bg-blue w-full h-10"
                    value={selectedAccess}
                    onChange={handleAccessChange}
                  >
                    <option value="Guest">Guest</option>
                    <option value="Free User">Free User</option>
                    <option value="Premium User">Premium User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="mb-3">
                  <h4>Video Location:</h4>
                  <p className="bg-blue text-white border-solid border-2 border-orange rounded-md w-full h-10 overflow-hidden">
                    {videoLocation}
                  </p>
                </div>
                <div className="mb-3">
                  <h4>Video description:</h4>
                  <textarea
                    className="resize-none border-solid border-2 border-orange rounded-md bg-blue w-full h-32 pl-1 mb-2"
                    placeholder="Description"
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col md:flex-row">
                  <button
                    className="bg-[linear-gradient(90deg,#FF8200_0%,#FF2415_100%)] text-white font-bold px-4 py-2 border-solid rounded-full mt-2 w-full md:w-52 md:ml-4"
                    type="button"
                  >
                    Save Changes
                  </button>
                  <button
                    className="text-orange px-4 py-2 border-2 border-orange rounded-full mt-2 w-full md:w-52 md:ml-4"
                    type="button"
                  >
                    Delete Video
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
