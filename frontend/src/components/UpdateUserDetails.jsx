import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import pencil from "../assets/images/Pencil.svg";

export default function UpdateUserDetails() {
  const { user, setUser } = useCurrentUserContext();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  const profileImage = user.profileimage;
  const userTypeId = user.usertype_id;

  const onSubmit = () => {
    const newData = getValues();

    const userDetails = {
      ...newData,
      profileimage: profileImage,
      usertype_id: userTypeId,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
        userDetails
      )
      .then((res) => {
        setUser(res.data);
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
              profileImage
                ? `${profileImage}`
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
            Username
          </label>
          <Controller
            name="username"
            control={control}
            defaultValue={user.username}
            rules={{
              required: "A userName is required",
              minLength: {
                value: 3,
                message:
                  "A username with a minimum of 3 characters is required",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                />
                {errors.username && (
                  <span className="text-red">{errors.username.message}</span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Firstname"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            First Name
          </label>
          <Controller
            name="firstname"
            control={control}
            defaultValue={user.firstname}
            rules={{
              required: "A first name is required",
              minLength: {
                value: 2,
                message:
                  "A first name with a minimum of 2 characters is required",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                />
                {errors.firstname && (
                  <span className="text-red">{errors.firstname.message}</span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Lastname"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Last Name
          </label>
          <Controller
            name="lastname"
            control={control}
            defaultValue={user.lastname}
            rules={{
              required: "A last name is required",
              minLength: {
                value: 2,
                message:
                  "A last name with a minimum of 2 characters is required",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                />
                {errors.lastname && (
                  <span className="text-red">{errors.lastname.message}</span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Email Address
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue={user.email}
            rules={{
              required: "An email adress is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                />
                {errors.email && (
                  <span className="text-red">{errors.email.message}</span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Password
          </label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "An password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                />
                {errors.password && (
                  <span className="text-red">{errors.password.message}</span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-white font-primary font-bold text-l mb-2 "
          >
            Confirm password
          </label>
          <Controller
            name="confirmpassword"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Your password does not match",
            }}
            render={({ field }) => (
              <>
                <input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                />
                {errors.confirmpassword && (
                  <span className="text-red">
                    {errors.confirmpassword.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex justify-center my-5">
          <input
            className="text-white font-primary font-semibold rounded-full w-auto px-4 py-0.5"
            style={{
              background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
            }}
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
