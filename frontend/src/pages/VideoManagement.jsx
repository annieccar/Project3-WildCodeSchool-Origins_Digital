import React, { useState } from "react";

export default function VideoManagement() {
  const [videoNames] = useState([
    "fog",

    "hydrangea",

    "lotus_flowers",

    "roundabout",

    "sea",

    "snail",

    "sunflowers",

    "sunset",
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedAccess, setSelectedAccess] = useState("Guest");
  const [videoLocation, setVideoLocation] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  const handleEditClick = (videoName) => {
    setSelectedVideo(videoName);

    setVideoLocation(`/backend/public/videos/${videoName}.mp4`);
  };

  const stripExtension = (filename) => {
    return filename.replace(/\.[^/.]+$/, ""); // Supprime l'extension du nom de fichier
  };
  const handleAccessChange = (event) => {
    setSelectedAccess(event.target.value);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center ">
      <h3 className="flex text-orange p-10 text-3xl">Videos Management</h3>
      <div className="flex justify-center">
        <div className="flex flex-col items-start min-w-[50%] ">
          <h3 className="ml-10">Video List:</h3>

          <div className="flex flex-col border-solid rounded-2xl border-4 border-orange w-full h-full mr-10">
            {videoNames.map((videoName) => (
              <div
                key={videoName}
                className="p-2 w-full flex items-center justify-between"
              >
                <span>{stripExtension(videoName)}</span>

                <div
                  className="h-4 w-4 cursor-pointer"
                  role="button"
                  onClick={() => handleEditClick(videoName)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditClick(videoName);
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
            className="border-solid rounded-2xl border-4 border-orange text-xl w-full h-12 mt-5 text-orange"
            type="button"
          >
            Add video
          </button>
        </div>
        <div className="flex flex-col items-center justify-center max-w-2xl ml-10">
          <h3 className="text-orange font-bold">Selected video details</h3>
          {selectedVideo && (
            <div>
              <img
                className="p-10 max-w-xl "
                src={`/thumbnails/${selectedVideo}.png`}
                alt={`${selectedVideo}-thumbnail`}
              />

              <div className="flex justify-around">
                <div className="flex flex-col ">
                  <h4>Video title:</h4>
                  <input
                    className="border-solid border-2 border-orange rounded-md bg-blue w-52 pl-1"
                    type="text"
                    placeholder="Titre"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <h4>Category:</h4>
                  <input
                    className="border-solid border-2 border-orange rounded-md bg-blue w-52 pl-1"
                    type="text"
                    placeholder="Catégorie"
                  />
                </div>
              </div>
              <div className="flex mt-4 justify-around">
                <div className="flex flex-col">
                  <h4>User access:</h4>
                  <select
                    className="border-solid border-2 border-orange rounded-md bg-blue w-52 h-7"
                    value={selectedAccess}
                    onChange={handleAccessChange}
                  >
                    <option value="Guest">Guest</option>
                    <option value="Free User">Free User</option>
                    <option value="Premium User">Premium User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="flex flex-col ml-4">
                  <h4>Video Location:</h4>
                  <p className="bg-blue text-white  border-solid border-2 border-orange rounded-md w-52 h-7 overflow-hidden">
                    {videoLocation}
                  </p>
                </div>
              </div>
              <div className="w-full mt-4 pl-3 pr-3 ">
                <h4 className=" pl-4 pb-2">Video description:</h4>
                <textarea
                  className="resize-none border-solid border-2 border-orange rounded-md w-full h-32 bg-blue pl-1"
                  placeholder="Description"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-around pb-4">
                <button
                  className="bg-orange  text-white font-bold px-4 py-2 border-solid rounded-full mt-2 w-52"
                  type="button"
                >
                  Save Changes
                </button>
                <button
                  className=" text-orange px-4 py-2 border-2 border-orange  rounded-full mt-2 w-52"
                  type="button"
                >
                  Delete Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
