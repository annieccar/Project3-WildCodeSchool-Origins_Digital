import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createPortal } from "react-dom";
import CustomModal from "../components/CustomModal";
import expressAPI from "../services/expressAPI";
import visa from "../assets/images/Visa.png";

export default function CreateUserManagement() {
  const [usertypes, setUsertypes] = useState(null);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    expressAPI
      .get(`/api/users/usertypes`)
      .then((res) => setUsertypes(res.data))
      .catch((err) => console.error(err));
  }, []);

  function giveTodayDate() {
    const date = new Date();
    let month = date.getMonth().toString();
    if (month.length === 1) {
      month = "0".concat(month);
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
      day = "0".concat(day);
    }
    return `${date.getFullYear()}-${month}-${day}`;
  }

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    username: {
      required: "An username must be registered.",
      pattern: {
        value: /[a-z0-9éèàëñçù^*+'\\"=²&§$¤€£<>()|%°.-_@]/gi,
        message: "Registered username contains forbidden characters.",
      },
      minLength: {
        value: 3,
        message: "An username must have at least 3 characters.",
      },
      maxLength: {
        value: 64,
        message: "An username must have less than 64 characters.",
      },
    },
    firstname: {
      required: "A firstname must be registered.",
      pattern: {
        value: /[a-z0-9éèàëñçù]/gi,
        message: "Registered firstname contains forbidden characters.",
      },
      minLength: {
        value: 2,
        message: "A firstname must have at least 2 characters.",
      },
      maxLength: {
        value: 64,
        message: "A firstname must have less than 64 characters.",
      },
    },
    lastname: {
      required: "A lastname must be registered.",
      pattern: {
        value: /[a-z0-9éèàëñçù]/gi,
        message: "Registered lastname contains forbidden characters.",
      },
      minLength: {
        value: 2,
        message: "A lastname must have at least 2 characters.",
      },
      maxLength: {
        value: 64,
        message: "A lastname must have less than 64 characters.",
      },
    },
    birthdate: {
      required: "A birthdate must be registered.",
      validate: (value) =>
        (value > "1900-01-01" && value < giveTodayDate()) ||
        "Your birthdate must be posterior to January 1st, 1900.",
    },
    gender: {
      required: "A gender must be registered.",
    },
    email: {
      required: "An email must be registered.",
      pattern: {
        value: /^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,4}$/gi,
        message:
          'Registered email has the wrong format. It must resemble "johndoe@example.com."',
      },
    },
    password: {
      required: "A password must be registered.",
      minLength: {
        value: 8,
        message: "A valid password must have at least 8 characters.",
      },
      maxLength: {
        value: 64,
        message: "A valid password must have less than 64 characters.",
      },
    },
    passwordconfirmation: {
      required: "A password confirmation must be registered.",
      validate: (value) =>
        value === watch("password") || "Passwords do not match.",
    },
  };

  const usernameRegister = register("username", registerOptions.username);
  const firstnameRegister = register("firstname", registerOptions.firstname);
  const lastnameRegister = register("lastname", registerOptions.lastname);
  const birthdateRegister = register("birthdate", registerOptions.birthdate);
  const genderRegister = register("gender", registerOptions.gender);
  const emailRegister = register("email", registerOptions.email);
  const usertypeRegister = register("usertype_id", registerOptions.usertype_id);
  const passwordRegister = register("password", registerOptions.password);
  const passwordConfirmationRegister = register(
    "passwordconfirmation",
    registerOptions.passwordconfirmation
  );

  const onSubmit = (data) => {
    expressAPI
      .post(`/api/users/`, data)
      .then((res) => {
        if (res.status === 201) {
          navigate("/admin/users");
        } else {
          setModal(true);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col w-full mt-5 pb-16 md:pb-10 bg-dark md:items-center">
      {usertypes && (
        <div className="flex flex-col md:w-1/3">
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
            <fieldset className="flex flex-col gap-1 py-2 my-2">
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
            <div>
              <h1 className="text-orange font-primary font-bold text-xl py-3">
                Payment Info:
              </h1>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="CardNumber"
                className="font-primary font-bold text-lg mb-2"
              >
                Card Number
              </label>
              <input
                className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                type="text"
                name="cardnumber"
                defaultValue="**** **** **** 6258"
              />
            </div>
            <div className="flex items-center">
              <img className="h-[61px]" src={visa} alt="Visa" />
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
