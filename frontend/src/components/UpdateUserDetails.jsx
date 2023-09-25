import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidUserRectangle } from "react-icons/bi";
import expressAPI from "../services/expressAPI";

import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import pencil from "../assets/images/Pencil.svg";
import trash from "../assets/images/trash.svg";

export default function UpdateUserDetails() {
  const { user, setUser } = useCurrentUserContext();
  const [displayedImage, setDisplayedImage] = useState(() => {
    if (user.profileimage) {
      return (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/public/profileimages/${
            user.profileimage
          }`}
          alt="User Profile"
          className="rounded-full h-28 w-28 object-cover"
        />
      );
    }
    return (
      <div className="text-white">
        <BiSolidUserRectangle size={100} />
      </div>
    );
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [uploadPicture, setUploadPicture] = useState(false);

  const [file, setFile] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    if (file.length > 0) {
      formData.append("profileimage", file[0]);
    } else {
      formData.append("profileimage", "");
    }

    formData.append("username", data.username);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("usertype_id", user.usertype_id);

    expressAPI
      .put(`/api/users/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        res.data.usertype_id = parseInt(res.data.usertype_id, 10);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.status === 201) {
          setUpdateSuccess(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setUploadPicture(false);
  };

  const handleBlur = () => {
    setUpdateSuccess(false);
  };

  return (
    <>
      <form
        className="w-80 flex flex-col justify-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-orange font-primary font-bold text-xl py-3">
          Your Profile
        </h1>
        <div className="flex justify-between items-center my-2 pr-3">
          {file.length > 0 ? (
            <img
              src={URL.createObjectURL(file[0])}
              alt="profile"
              className="rounded-full h-28 w-28 object-cover"
            />
          ) : (
            <div className="rounded-full h-28 w-28 flex items-center object-cover">
              {displayedImage}
            </div>
          )}
          {uploadPicture && (
            <label className="flex justify-center items-center font-primary text-white h-8 focus:outline-none font-semibold rounded-full bg-orange-gradient border-none w-28">
              <span>Select file</span>
              <input
                type="file"
                name="profileimage"
                placeholder="Choose File"
                onChange={(e) => {
                  setFile(e.target.files);
                }}
                className="hidden"
              />
            </label>
          )}
          {!uploadPicture && (
            <div className="flex justify-between w-24">
              <button type="button" onClick={() => setUploadPicture(true)}>
                <img className="h-9 w-9" src={pencil} alt="Edit pencil" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDisplayedImage(
                    <div className="text-white">
                      <BiSolidUserRectangle size={100} />
                    </div>
                  );
                  setFile([]);
                }}
              >
                <img className="h-7 w-7" src={trash} alt="trash" />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            User Name
          </label>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <input
            className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            type="text"
            {...register("username", {
              required: true,
              minLength: 3,
            })}
            aria-invalid={errors.username ? "true" : "false"}
            name="username"
            defaultValue={user.username}
          />
          {errors.username && (
            <span className="text-red">
              Your user name must have a minimum of 3 characters
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Firstname"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            First Name
          </label>
          <input
            className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            type="text"
            {...register("firstname", {
              required: true,
              minLength: 3,
            })}
            aria-invalid={errors.firstname ? "true" : "false"}
            name="firstname"
            defaultValue={user.firstname}
          />
          {errors.firstname && (
            <span className="text-red">
              Your first name must have a minimum of 3 characters
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Lastname"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Last Name
          </label>
          <input
            className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            type="text"
            {...register("lastname", {
              required: true,
              minLength: 3,
            })}
            aria-invalid={errors.lastname ? "true" : "false"}
            name="lastname"
            defaultValue={user.lastname}
          />
          {errors.lastname && (
            <span className="text-red">
              Your last name must have a minimum of 3 characters
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Email Address
          </label>
          <input
            className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            type="text"
            {...register("email", {
              required: true,
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            name="email"
            defaultValue={user.email}
          />
          {errors.email && (
            <span className="text-red">
              You must enter a valid email adress
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Password
          </label>
          <input
            className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            aria-invalid={errors.password ? "true" : "false"}
            name="password"
          />
          {errors.password && (
            <span className="text-red">
              Your password must have a minimum of 8 characters
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Confirm password
          </label>
          <input
            className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            type="password"
            {...register("confirmpassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            aria-invalid={errors.confirmpassword ? "true" : "false"}
            name="confirmpassword"
          />
          {errors.confirmpassword && (
            <span className="text-red">Your password does not match</span>
          )}
        </div>
        <div className="flex justify-center my-5">
          <input
            className="text-white h-8 focus:outline-none font-primary font-semibold rounded-full w-auto px-4 py-0.5 bg-orange-gradient"
            type="submit"
            value="Save Changes"
          />
        </div>
      </form>
      {updateSuccess && (
        <>
          <button type="button" onClick={handleBlur}>
            <div className="fixed z-10 top-0 bottom-0 left-0 right-0 backdrop-blur-lg" />
          </button>
          <div className="bg-dark border-solid border-2 border-orange w-80 px-5 py-3 rounded-md flex flex-col gap-2 items-center absolute z-50 top-1/3 x-center ">
            <p className="text-white text-center my-2">
              Your account details have been successfully updated
            </p>
            <button
              type="button"
              className="text-white my-2 font-primary font-semibold rounded-full w-auto px-4 py-0.5"
              style={{
                background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
              }}
              onClick={handleBlur}
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}
