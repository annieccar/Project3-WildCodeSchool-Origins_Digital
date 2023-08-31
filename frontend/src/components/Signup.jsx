import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

export default function Signup() {
  const { setUser } = useCurrentUserContext();

  const navigate = useNavigate();

  const handleLoginRegistration = async (signupFormData) => {
    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        signupFormData
      )
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
        value: 5,
        message: "An username must have at least 5 characters.",
      },
      maxLength: {
        value: 25,
        message: "An username must have less than 25 characters.",
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
        value: 25,
        message: "A firstname must have less than 25 characters.",
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
        value: 25,
        message: "A lastname must have less than 25 characters.",
      },
    },
    birthdate: {
      required: "A birthdate must be registered.",
      validate: (value) =>
        value > "1900-01-01" ||
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
        value: 30,
        message: "A valid password must have less than 30 characters.",
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
  const passwordRegister = register("password", registerOptions.password);
  const passwordConfirmationRegister = register(
    "passwordconfirmation",
    registerOptions.passwordconfirmation
  );

  const [noMatch, setNoMatch] = useState("");

  useEffect(() => {
    if (noMatch) {
      setNoMatch(() => "");
    }
  }, [errors.email, errors.password]);

  return (
    <div className="min-h-[60vh] min-w-[50%] mx-12 flex flex-col justify-items-center items-center">
      <p className="w-[150px] font-bold text-orange ">Create an account</p>
      <form
        className="flex flex-col items-center]"
        onSubmit={handleSubmit(handleLoginRegistration)}
      >
        <div className="flex flex-col p-2 md:mt-8">
          <label className="py-2 pl-1 font-semibold" htmlFor="username">
            Username:
          </label>
          <input
            className=" rounded-md border-[3px] p-0.5  border-orange bg-dark"
            type="text"
            placeholder="Enter your username"
            onChange={usernameRegister.onChange}
            name={usernameRegister.name}
            ref={usernameRegister.ref}
            aria-invalid={errors.usernameRegister ? "true" : "false"}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="firstname">
            Firstname :
          </label>
          <input
            className=" rounded-md border-[3px] p-0.5  border-orange bg-dark"
            type="text"
            placeholder="Enter your firstname"
            onChange={firstnameRegister.onChange}
            name={firstnameRegister.name}
            ref={firstnameRegister.ref}
            aria-invalid={errors.firstname ? "true" : "false"}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="lastname">
            Lastname:
          </label>
          <input
            className=" rounded-md border-[3px] p-0.5  border-orange bg-dark "
            type="text"
            placeholder="Enter your lastname"
            onChange={lastnameRegister.onChange}
            name={lastnameRegister.name}
            ref={lastnameRegister.ref}
            aria-invalid={errors.lastname ? "true" : "false"}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="birthdate">
            Birthdate :
          </label>
          <input
            className="min-w-[190px] rounded-md border-[3px] p-0.5  border-orange bg-dark "
            type="date"
            placeholder="Enter your birthdate"
            // min="1900-01-01"
            onChange={birthdateRegister.onChange}
            name={birthdateRegister.name}
            ref={birthdateRegister.ref}
            aria-invalid={errors.birthdate ? "true" : "false"}
          />
        </div>

        <fieldset className="flex flex-col p-2 min-w-[200px] ">
          <legend className="pt-2 pl-1 font-semibold">
            Select your gender:
          </legend>

          <div>
            <input
              type="radio"
              id="genderChoice1"
              value="female"
              onChange={genderRegister.onChange}
              name={genderRegister.name}
              ref={genderRegister.ref}
            />
            <label className="pl-2" htmlFor="genderChoice1">
              Female
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="genderChoice2"
              value="male"
              onChange={genderRegister.onChange}
              name={genderRegister.name}
              ref={genderRegister.ref}
            />
            <label className="pl-2" htmlFor="genderChoice2">
              Male
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="genderChoice3"
              value="not gendered"
              onChange={genderRegister.onChange}
              name={genderRegister.name}
              ref={genderRegister.ref}
            />
            <label className="pl-2" htmlFor="genderChoice3">
              Not gendered
            </label>
          </div>
        </fieldset>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded-md border-[3px] p-0.5  border-orange bg-dark"
            type="text"
            placeholder="Enter your email address"
            onChange={emailRegister.onChange}
            name={emailRegister.name}
            ref={emailRegister.ref}
            aria-invalid={errors.email ? "true" : "false"}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded-md border-[3px] p-0.5  border-orange bg-dark"
            type="password"
            placeholder="Choose your password"
            onChange={passwordRegister.onChange}
            name={passwordRegister.name}
            ref={passwordRegister.ref}
            aria-invalid={errors.password ? "true" : "false"}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label
            className="py-2 pl-1 font-semibold"
            htmlFor="passwordconfirmation"
          >
            Confirm password:
          </label>
          <input
            className="rounded-md border-[3px] p-1   border-orange bg-dark"
            type="password"
            placeholder="Confirm your password"
            onChange={passwordConfirmationRegister.onChange}
            name={passwordConfirmationRegister.name}
            ref={passwordConfirmationRegister.ref}
            aria-invalid={errors.passwordconfirmation ? "true" : "false"}
          />
        </div>

        <input
          className="w-36 h-9 m-5 my-8  rounded-3xl font-primary font-semibold border-2 border-orange bg-orange"
          type="submit"
          value="Sign up"
        />
      </form>
      <div
        role="alert"
        className={`max-w-sm font-medium rounded p-5 ${
          errors && "border-2"
        } text-[#FF2415]`}
      >
        {errors.username && <p> {errors.username.message}</p>}
        {errors.firstname && <p> {errors.firstname.message}</p>}
        {errors.lastname && <p> {errors.lastname.message}</p>}
        {errors.birthdate && <p> {errors.birthdate.message}</p>}
        {errors.gender && <p> {errors.gender.message}</p>}
        {errors.email && <p> {errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        {errors.passwordconfirmation && (
          <p> {errors.passwordconfirmation.message}</p>
        )}
      </div>
    </div>
    // Todo : user profile image upload
  );
}
