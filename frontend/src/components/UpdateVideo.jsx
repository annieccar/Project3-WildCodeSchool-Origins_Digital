import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import HoverVideoPlayer from "react-hover-video-player";
import { BiLeftArrowAlt } from "react-icons/bi";
import PropTypes from "prop-types";

import expressAPI from "../services/expressAPI";
import editPencil from "../assets/images/edit.svg";

export default function UpdateVideo({
  selectedVideo,
  setFormActive,
  categories,
  isMobile,
  setModal,
  setModalText,
}) {
  const [name, setName] = useState(selectedVideo.name);
  const [details, setDetails] = useState(selectedVideo.details);
  const [hours, setHours] = useState(selectedVideo.duration.split(":")[0]);
  const [minutes, setMinutes] = useState(selectedVideo.duration.split(":")[1]);
  const [seconds, setSeconds] = useState(selectedVideo.duration.split(":")[2]);

  const [editCategory, setEditCategory] = useState(false);
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    setName(selectedVideo.name);
    setDetails(selectedVideo.details);
    setHours(selectedVideo.duration.split(":")[0]);
    setMinutes(selectedVideo.duration.split(":")[1]);
    setSeconds(selectedVideo.duration.split(":")[2]);
  }, [selectedVideo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const findCategory = () => {
    const categoryName = categories.find(
      (category) => selectedVideo.category_id === category.id
    ).name;
    return categoryName;
  };

  const updateVideo = (data) => {
    const duration = `${hours}:${minutes}:${seconds}`;
    let categoryId = selectedVideo.category_id;
    if (data.category) {
      categoryId = data.category;
    }

    const videoData = {
      name,
      file_name: selectedVideo.file_name,
      duration,
      details,
      categoryId,
    };

    expressAPI
      .put(`/api/videos/${selectedVideo.id}`, videoData)
      .then((res) => {
        if (res.status === 204) {
          setModal(true);
          setModalText("Your video has been successfully updated");
          setFormActive(false);
        } else {
          setModal(true);
          setModalText("A problem has occured");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteVideo = () => {
    expressAPI
      .delete(`/api/videos/${selectedVideo.id}`)
      .then((res) => {
        if (res.status === 204) {
          setModal(true);
          setModalText("Your video has been successfully deleted");
        } else {
          setModal(true);
          setModalText("A problem has occured");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setFormActive(false);
  };

  return (
    categories.length > 0 && (
      <>
        {isMobile && (
          <button
            type="button"
            onClick={() => setFormActive(false)}
            className="text-white flex items-center font-bold font-primary text-lg text-start w-full mb-5"
          >
            <BiLeftArrowAlt size={35} /> Back
          </button>
        )}
        <form
          className="w-80 lg:w-96 flex flex-col justify-start pb-16 lg:bp-0"
          onSubmit={handleSubmit(updateVideo)}
        >
          <h1 className="text-orange font-primary text-xl font-bold mb-5">
            Selected Video:
          </h1>
          <div className="flex justify-center mb-2">
            <HoverVideoPlayer
              videoSrc={`${import.meta.env.VITE_BACKEND_URL}/Public/videos/${
                selectedVideo.file_name
              }.mp4`}
              pausedOverlay={
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/Public/thumbnails/${
                    selectedVideo.file_name
                  }.png`}
                  alt={selectedVideo.name}
                  className="rounded-md"
                />
              }
              playbackRangeEnd={5}
              loadingStateTimeout={1000}
              controls
              controlsList="nodownload nofullscreen"
              className="w-full rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              Video name
            </label>
            {/* eslint-disable react/jsx-props-no-spreading */}
            <input
              className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
              })}
              aria-invalid={errors.username ? "true" : "false"}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span className="text-red">
                Your video name must have a minimum of 3 characters
              </span>
            )}
          </div>
          <label
            htmlFor="videofile"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Video file:
          </label>
          <h2 className="text-white font-primary text-xl mb-3">
            {`${selectedVideo.file_name}`}
          </h2>

          <div className="flex flex-col">
            <label
              htmlFor="details"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              Video details:
            </label>
            <input
              className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
              type="text"
              {...register("details", {
                required: true,
                minLength: 10,
              })}
              aria-invalid={errors.details ? "true" : "false"}
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            {errors.details && (
              <span className="text-red">
                Add a short description of your video
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="duration"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              Video duration:
            </label>
            <div className="flex justify-between items-center mb-2">
              <input
                className="h-9 focus:outline-none w-20 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                type="text"
                {...register("hours", {
                  required: true,
                  minLength: 2,
                })}
                aria-invalid={errors.hours ? "true" : "false"}
                name="hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <p className="font-primary">:</p>
              <input
                className="h-9 focus:outline-none w-20 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                type="text"
                {...register("minutes", {
                  required: true,
                  minLength: 2,
                })}
                aria-invalid={errors.minutes ? "true" : "false"}
                name="minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
              <p className="font-primary">:</p>
              <input
                className="h-9 focus:outline-none w-20 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                type="text"
                {...register("seconds", {
                  required: true,
                  minLength: 2,
                })}
                aria-invalid={errors.seconds ? "true" : "false"}
                name="seconds"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </div>
            {(errors.hours || errors.minutes || errors.seconds) && (
              <span className="text-red">
                You must enter a video duration in the format 00:00:00
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              Category:
            </label>
            {!editCategory && (
              <div className="flex justify-between pr-2 mb-5">
                <h2 className="text-white font-primary text-xl mb-1">
                  {findCategory()}
                </h2>
                <button type="button" onClick={() => setEditCategory(true)}>
                  <img src={editPencil} alt="edit pencil" />
                </button>
              </div>
            )}
            {editCategory && (
              <>
                <select
                  className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                  {...register("category", {
                    required: false,
                  })}
                  aria-invalid={errors.category ? "true" : "false"}
                  name="category"
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-red">Select a category</span>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="access"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              User access:
            </label>
            {!editUser && (
              <div className="flex justify-between pr-2 mb-5">
                <h2 className="text-white font-primary text-xl mb-1">
                  Premium User
                </h2>
                <button type="button" onClick={() => setEditUser(true)}>
                  <img src={editPencil} alt="edit pencil" />
                </button>
              </div>
            )}
            {editUser && (
              <>
                <select
                  className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                  {...register("access", {
                    required: true,
                  })}
                  aria-invalid={errors.category ? "true" : "false"}
                  name="access"
                >
                  <option value="">Select</option>
                  <option value="free">Free user</option>
                  <option value="premium">Premium User</option>
                  <option value="Admin">Admin</option>
                </select>
                {errors.access && (
                  <span className="text-red">Select a user type access</span>
                )}
              </>
            )}
          </div>
          <div className="w-full flex justify-around my-5">
            <input
              className="cursor-pointer text-white h-10 focus:outline-none font-primary font-semibold rounded-full w-36 px-4 py-0.5 bg-orange-gradient"
              type="submit"
              value="Update Video"
            />
            <button
              type="button"
              onClick={() => deleteVideo()}
              className="text-orange h-10 font-primary font-semibold rounded-full w-36 px-4 py-0.5 border-solid border-2 border-orange"
            >
              Delete Video
            </button>
          </div>
        </form>
      </>
    )
  );
}

UpdateVideo.propTypes = {
  selectedVideo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    file_name: PropTypes.string.isRequired,
  }).isRequired,

  setFormActive: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isMobile: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  setModalText: PropTypes.func.isRequired,
};
