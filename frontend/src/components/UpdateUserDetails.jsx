import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import pencil from "../assets/images/Pencil.svg";

export default function UpdateUserDetails() {
  const { user } = useCurrentUserContext();

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const newData = { ...data };
    delete newData.confirmpassword;

    const userDetails = {
      ...newData,
      profileimage: user.profileimage,
      usertype_id: user.usertype_id,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
        userDetails
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.status === 201) {
          setUpdateSuccess(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleBlur = () => {
    setUpdateSuccess(false);
  };

  return (
    <>
      <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-orange font-primary font-bold text-xl py-3">
          Your Profile
        </h1>
        <div className="flex justify-between items-center my-2 pr-3">
          <img
            src={
              user.profileimage
                ? `${user.profileimage}`
                : "../../src/assets/images/User.png"
            }
            alt="profile"
          />
          <img className="h-9 w-9" src={pencil} alt="Edit pencil" />
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
            className=" focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
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
            className=" focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
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
            className="focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
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
            className="focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
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
            className="focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
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
            className="focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
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
            className="text-white focus:outline-none font-primary font-semibold rounded-full w-auto px-4 py-0.5 bg-orange-gradient"
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
