import React, { useState } from "react";
import { useForm } from "react-hook-form";
import HoverVideoPlayer from "react-hover-video-player";
import { BiLeftArrowAlt } from "react-icons/bi";
import PropTypes from "prop-types";

import useInstanceWithInterceptor from "../hooks/useInstanceWithInterceptor";

export default function UploadVideo({
  setFormActive,
  categories,
  isMobile,
  setModal,
  setModalText,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [videoFile, setVideoFile] = useState([]);
  const [File, setFile] = useState([]);

  const expressAPI = useInstanceWithInterceptor();

  const onSubmit = (data) => {
    const duration = `${data.hours}:${data.minutes}:${data.seconds}`;

    const videoData = new FormData();
    videoData.append("name", data.name);
    videoData.append("videofile", data.videofile[0]);
    videoData.append("details", data.details);
    videoData.append("categoryId", data.category);
    videoData.append("duration", duration);

    const uploadVideo = async () => {
      try {
        const videoUploadResponse = await expressAPI.post(
          `/api/videos`,
          videoData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const { fileName } = videoUploadResponse.data;
        const thumbnailData = new FormData();
        thumbnailData.append("thumbnailfile", data.thumbnailfile[0]);

        const thumbnailUploadResponse = await expressAPI.post(
          `/api/videos/thumbnail?file_name=${fileName}`,
          thumbnailData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (thumbnailUploadResponse.status === 201) {
          setModal(true);
          setModalText("Your video has been succesfully uploaded");
          setFormActive(false);
        } else {
          setModal(true);
          setModalText("A problem has occured");
        }
      } catch (err) {
        console.error(err);
      }
    };

    uploadVideo();
  };

  return (
    categories.length > 0 && (
      <>
        {isMobile && (
          <button
            type="button"
            onClick={() => setFormActive(false)}
            className="text-lightBlue dark:text-white flex items-center font-bold font-primary text-lg text-start w-full mb-5"
          >
            <BiLeftArrowAlt size={35} /> Back
          </button>
        )}
        <form
          className="w-80 pb-16 lg:pb-0 lg:w-96 flex flex-col justify-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-orange font-primary text-xl font-bold mb-5">
            Upload new video:
          </h1>
          <div>
            {File.length > 0 && videoFile.length > 0 && (
              <HoverVideoPlayer
                videoSrc={URL.createObjectURL(videoFile[0])}
                pausedOverlay={
                  <img
                    src={URL.createObjectURL(File[0])}
                    alt="video thumbnail"
                    className="rounded-md"
                  />
                }
                playbackRangeEnd={5}
                loadingStateTimeout={1000}
                controls
                controlsList="nodownload nofullscreen"
                className="w-full rounded-md"
              />
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-lightBlue dark:text-white font-primary font-bold text-l mb-2 "
            >
              Video name
            </label>
            {/* eslint-disable react/jsx-props-no-spreading */}
            <input
              className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
              })}
              aria-invalid={errors.username ? "true" : "false"}
              name="name"
            />
            {errors.name && (
              <span className="text-red">
                Your video name must have a minimum of 3 characters
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="videofile"
              className="text-lightBlue dark:text-white font-primary font-bold text-l mb-2 "
            >
              Video file:
            </label>

            <input
              className="file:font-primary file:text-white file:font-semibold file:rounded-full file:bg-orange-gradient file:border-none file:h-7 file:mt-1 file:px-2 h-10 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
              type="file"
              {...register("videofile", {
                required: true,
              })}
              aria-invalid={errors.videofile ? "true" : "false"}
              name="videofile"
              onChange={(e) => {
                setVideoFile(e.target.files);
              }}
            />

            {errors.videofile && (
              <span className="text-red">Your must select a video file</span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="thumbnailfile"
              className="text-lightBlue dark:text-white font-primary font-bold text-l mb-2 "
            >
              Thumbnail file:
            </label>
            <input
              className="file:font-primary file:text-white file:font-semibold file:rounded-full file:bg-orange-gradient file:border-none file:h-7 file:mt-1 file:px-2 h-10 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
              type="file"
              {...register("thumbnailfile", {
                required: true,
              })}
              aria-invalid={errors.lastname ? "true" : "false"}
              name="thumbnailfile"
              onChange={(e) => {
                setFile(e.target.files);
              }}
            />
            {errors.thumbnailfile && (
              <span className="text-red">
                You must select a thumbnail file for your video
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="details"
              className="text-lightBlue dark:text-white font-primary font-bold text-l mb-2 "
            >
              Video details:
            </label>
            <input
              className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
              type="text"
              {...register("details", {
                required: true,
                minLength: 10,
              })}
              aria-invalid={errors.details ? "true" : "false"}
              name="details"
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
              className="text-lightBlue dark:text-white font-primary font-bold text-l mb-2 "
            >
              Video duration:
            </label>
            <div className="flex justify-between items-center mb-2">
              <input
                className="h-9 focus:outline-none w-20 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
                type="text"
                {...register("hours", {
                  required: true,
                  minLength: 2,
                })}
                aria-invalid={errors.hours ? "true" : "false"}
                name="hours"
                placeholder="hr"
              />
              <p className="font-primary">:</p>
              <input
                className="h-9 focus:outline-none w-20 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
                type="text"
                {...register("minutes", {
                  required: true,
                  minLength: 2,
                })}
                aria-invalid={errors.minutes ? "true" : "false"}
                name="minutes"
                placeholder="min"
              />
              <p className="font-primary">:</p>
              <input
                className="h-9 focus:outline-none w-20 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
                type="text"
                {...register("seconds", {
                  required: true,
                  minLength: 2,
                })}
                aria-invalid={errors.seconds ? "true" : "false"}
                name="seconds"
                placeholder="s"
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
              className="text-lightBlue dark:text-white font-primary font-bold text-l mb-2 "
            >
              Category:
            </label>
            <select
              className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
              {...register("category", {
                required: true,
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
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="access"
              className="text-lightBlue dark:text-white font-primary font-bold text-l mb-2 "
            >
              User access:
            </label>
            <select
              className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
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
          </div>

          <div className="flex justify-center my-5">
            <input
              className="text-white h-10 focus:outline-none font-primary font-semibold rounded-full w-40 px-4 py-0.5 bg-orange-gradient"
              type="submit"
              value="Upload Video"
            />
          </div>
        </form>
      </>
    )
  );
}

UploadVideo.propTypes = {
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
