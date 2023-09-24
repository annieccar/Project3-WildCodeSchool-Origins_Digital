import React, { useState, useEffect } from "react";
import expressAPI from "../services/expressAPI";
import UpdateVideo from "../components/UpdateVideo";
import UploadVideo from "../components/UploadVideo";
import magnifier from "../assets/images/Vector.png";
import editPencil from "../assets/images/edit.svg";
import CustomModal from "../components/CustomModal";

export default function VideoManagement() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formActive, setFormActive] = useState(false);
  const [addVideo, setAddVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleEditClick = (video) => {
    setFormActive(true);
    setSelectedVideo(video);
    setAddVideo(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await expressAPI.get("/api/categories");
        const videoResponse = await expressAPI.get("/api/videos");
        setCategories(categoriesResponse.data);
        setVideos(videoResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [formActive]);

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  window.addEventListener("resize", handleResize);

  return (
    videos.length && (
      <>
        <div className="w-screen bg-dark flex flex-col items-center">
          {(!isMobile || (isMobile && !formActive)) && (
            <h3 className="text-orange font-primary font-bold text-2xl lg:text-3xl mt-7">
              Videos Management
            </h3>
          )}
          <div
            className={`lg:flex ${
              formActive ? "lg:justify-around" : "lg:justify-center"
            } lg:items-start lg:w-[1200px] mt-5 lg:mt-10`}
          >
            <div
              className={`flex flex-col items-center ${
                formActive && isMobile && "hidden"
              }`}
            >
              <button
                className="mb-5 mt-5 text-white h-11 w-[330px] focus:outline-none font-primary font-semibold rounded-full px-4 py-0.5 bg-orange-gradient"
                type="button"
                onClick={() => {
                  setFormActive(true);
                  setAddVideo(true);
                  setSelectedVideo(false);
                }}
              >
                Upload New Video
              </button>
              <div className="flex justify-start w-full ml-5">
                <h3 className="font-primary font-bold text-orange text-xl mb-5">
                  Video List:
                </h3>
              </div>
              <div className="flex justify-between p-2 relative mb-4 w-full">
                <select
                  className="bg-dark w-28 font-primary text-sm lg:mr-20 lg:w-32 lg:text-xl"
                  onChange={handleCategory}
                >
                  <option className="font-primary text-md" value="">
                    Select
                  </option>
                  {categories.length > 0 &&
                    categories.map((elem) => (
                      <option key={elem.name} value={elem.id}>
                        {elem.name}
                      </option>
                    ))}
                </select>
                <input
                  className="bg-dark w-40 lg:w-48 h-8 lg:h-8 font-primary text-lg lg:text-xl p-2 border-2 lg:border-2 border-orange rounded-md text-gray "
                  placeholder="search"
                  onChange={handleSearch}
                />
                <img
                  src={magnifier}
                  className="absolute right-4 top-3.5 h-5 w-5"
                  alt="search"
                />
              </div>
              <div className="border-solid rounded-2xl border-2 border-orange flex flex-col mb-16 w-[330px] lg:w-[500px] lg:grid lg:grid-cols-2 lg:grid-rows-100px max-h-[400px] min-h-[200px] overflow-y-scroll">
                {videos.length > 0 &&
                  videos
                    .filter(
                      (video) =>
                        !category.length ||
                        video.category_id === parseInt(category, 10)
                    )
                    .filter(
                      (video) =>
                        !keyword.length ||
                        video.name.toLowerCase().includes(keyword.toLowerCase())
                    )

                    .map((video) => (
                      <div
                        key={video.id}
                        className="px-5 py-1 flex items-center justify-between"
                      >
                        <span className="font-primary text-xl">
                          {video.name}
                        </span>
                        <div
                          className="h-6 w-6 cursor-pointer"
                          role="button"
                          onClick={() => handleEditClick(video)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEditClick(video);
                            }
                          }}
                          tabIndex="0"
                        >
                          <img
                            src={editPencil}
                            alt="edit-logo"
                            className="h-full w-full"
                          />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              {formActive && selectedVideo && (
                <UpdateVideo
                  selectedVideo={selectedVideo}
                  setFormActive={setFormActive}
                  categories={categories}
                  isMobile={isMobile}
                  setModal={setModal}
                  setModalText={setModalText}
                />
              )}
              {formActive && addVideo && (
                <UploadVideo
                  setFormActive={setFormActive}
                  categories={categories}
                  isMobile={isMobile}
                  setModal={setModal}
                  setModalText={setModalText}
                />
              )}
            </div>
          </div>
        </div>
        {modal && (
          <CustomModal msg={modalText} closeModal={() => setModal(false)} />
        )}
      </>
    )
  );
}
