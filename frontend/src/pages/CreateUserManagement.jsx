import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import CustomModal from "../components/CustomModal";
import expressAPI from "../services/expressAPI";
import {
  registerOptions,
  giveTodayDate,
} from "../validators/createUserManagement.validator";
import useMediaQuery from "../hooks/useMediaQuery";

export default function CreateUserManagement({ setUsers }) {
  const [usertypes, setUsertypes] = useState(null);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    expressAPI
      .get(`/api/users/usertypes`)
      .then((res) => setUsertypes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const usernameRegister = register("username", registerOptions.username);
  const firstnameRegister = register("firstname", registerOptions.firstname);
  const lastnameRegister = register("lastname", registerOptions.lastname);
  const birthdateRegister = register("birthdate", registerOptions.birthdate);
  const genderRegister = register("gender", registerOptions.gender);
  const emailRegister = register("email", registerOptions.email);
  const usertypeRegister = register("usertype_id", registerOptions.usertype_id);
  const passwordRegister = register("password", registerOptions.password);
  const passwordConfirmationRegister = register("passwordconfirmation", {
    required: "A password confirmation must be registered.",
    validate: (value) =>
      value === watch("password") || "Passwords do not match.",
  });

  const onSubmit = (data) => {
    expressAPI
      .post(`/api/users/`, data)
      .then((res) => {
        if (res.status === 201 && isDesktop) {
          reset();
          expressAPI.get(`/api/users`).then((result) => setUsers(result.data));
        } else {
          navigate("/admin/users");
        }
      })
      .catch((err) => {
        console.error(err);
        setModal(true);
      });
  };

  return (
    <div className="flex flex-col w-full pt-5 pb-16 lg:pb-10 bg-dark lg:w-1/2 lg:mt-2 lg:items-center">
      {usertypes && (
        <div className="flex flex-col lg:w-3/5">
          <h1 className="text-center text-xl text-orange font-bold mb-5">
            User profile creation
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-10/12 mx-auto"
          >
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="font-primary font-bold text-lg py-2"
              >
                Username
              </label>
              <input
                type="text"
                name={usernameRegister.name}
                onChange={usernameRegister.onChange}
                ref={usernameRegister.ref}
                aria-invalid={errors.usernameRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.username && (
                <p className="text-[#FF2415]"> {errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="firstname"
                className="font-primary font-bold text-lg py-2"
              >
                Firstname
              </label>
              <input
                type="text"
                name={firstnameRegister.name}
                onChange={firstnameRegister.onChange}
                ref={firstnameRegister.ref}
                aria-invalid={errors.firstnameRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.firstname && (
                <p className="text-[#FF2415]"> {errors.firstname.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastname"
                className="font-primary font-bold text-lg py-2"
              >
                Lastname
              </label>
              <input
                type="text"
                name={lastnameRegister.name}
                onChange={lastnameRegister.onChange}
                ref={lastnameRegister.ref}
                aria-invalid={errors.lastnameRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.lastname && (
                <p className="text-[#FF2415]"> {errors.lastname.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="py-2 pl-1 font-semibold" htmlFor="birthdate">
                Birthdate :
              </label>
              <input
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg w-full p-1"
                type="date"
                max={giveTodayDate()}
                placeholder="Enter your birthdate"
                onChange={birthdateRegister.onChange}
                name={birthdateRegister.name}
                ref={birthdateRegister.ref}
                aria-invalid={errors.birthdate ? "true" : "false"}
              />
              {errors.birthdate && (
                <p className="text-[#FF2415]"> {errors.birthdate.message}</p>
              )}
            </div>
            <fieldset className="flex flex-col gap-1 pt-2 mt-4 mb-2">
              <legend className="font-bold">Select the gender:</legend>

              <div className="flex justify-between items-center w-3/4">
                <label className="pl-2" htmlFor="genderChoice1">
                  Female
                </label>
                <input
                  type="radio"
                  id="genderChoice1"
                  value="female"
                  onChange={genderRegister.onChange}
                  name={genderRegister.name}
                  ref={genderRegister.ref}
                />
              </div>
              <div className="flex justify-between items-center w-3/4">
                <label className="pl-2" htmlFor="genderChoice2">
                  Male
                </label>
                <input
                  type="radio"
                  id="genderChoice2"
                  value="male"
                  onChange={genderRegister.onChange}
                  name={genderRegister.name}
                  ref={genderRegister.ref}
                />
              </div>
              <div className="flex justify-between items-center w-3/4">
                <label className="pl-2" htmlFor="genderChoice3">
                  Not gendered
                </label>
                <input
                  type="radio"
                  id="genderChoice3"
                  value="not gendered"
                  onChange={genderRegister.onChange}
                  name={genderRegister.name}
                  ref={genderRegister.ref}
                />
              </div>
            </fieldset>
            {errors.gender && (
              <p className="text-[#FF2415]"> {errors.gender.message}</p>
            )}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-primary font-bold text-lg py-2"
              >
                Email
              </label>
              <input
                type="text"
                name={emailRegister.name}
                onChange={emailRegister.onChange}
                ref={emailRegister.ref}
                aria-invalid={errors.emailRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.email && (
                <p className="text-[#FF2415]"> {errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-primary font-bold text-lg py-2">
                Account status
              </p>
              <select
                name={usertypeRegister.name}
                onChange={usertypeRegister.onChange}
                ref={usertypeRegister.ref}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg w-full py-2"
              >
                {usertypes.map((usertype) => (
                  <option key={usertype.id} value={usertype.id}>
                    {usertype.type_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="font-primary font-bold text-lg py-2"
              >
                Password
              </label>
              <input
                type="password"
                name={passwordRegister.name}
                onChange={passwordRegister.onChange}
                ref={passwordRegister.ref}
                aria-invalid={errors.passwordRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.password && (
                <p className="text-[#FF2415]"> {errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="py-2 pl-1 font-semibold"
                htmlFor="passwordconfirmation"
              >
                Confirm password:
              </label>
              <input
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg w-full pl-1 py-1"
                type="password"
                placeholder="Confirm your password"
                onChange={passwordConfirmationRegister.onChange}
                name={passwordConfirmationRegister.name}
                ref={passwordConfirmationRegister.ref}
                aria-invalid={errors.passwordconfirmation ? "true" : "false"}
              />
              {errors.passwordconfirmation && (
                <p className="text-[#FF2415]">
                  {errors.passwordconfirmation.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 items-center mt-3 mb-5">
              <button
                type="submit"
                className="bg-orange-gradient rounded-full px-8 py-2 text-lg"
              >
                Create user
              </button>
            </div>
          </form>
        </div>
      )}
      {modal &&
        createPortal(
          <CustomModal
            closeModal={() => setModal(false)}
            msg="Something went wrong, retry later."
          />,
          document.body
        )}
    </div>
  );
}

CreateUserManagement.propTypes = {
  setUsers: PropTypes.func,
};

CreateUserManagement.defaultProps = {
  setUsers: null,
};
