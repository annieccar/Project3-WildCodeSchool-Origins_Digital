import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import LoginErrorPopUp from "./LoginErrorPopUp";
import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";
import expressAPI from "../services/expressAPI";

export default function Login() {
  const { setIsBackgroundBlurred } = useBlurredBackgroundContext();
  const { setUser } = useCurrentUserContext();

  const navigate = useNavigate();

  const [loginErrorPopUpOpen, setloginErrorPopUpOpen] = useState(false);

  const handleLoginError = () => {
    setloginErrorPopUpOpen(true);
    setIsBackgroundBlurred(true);
  };

  const handleCloseModal = () => {
    setloginErrorPopUpOpen(false);
    setIsBackgroundBlurred(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    email: {
      required: "An email must be registered.",
      pattern: {
        value: /^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,4}$/gi,
        message:
          'Registered email has the wrong format. It must resemble "johndoe@example.com."',
      },
    },
    password: {
      required: "A password must be registered",
      minLength: {
        value: 8,
        message: "A valid password must have at least 8 characters",
      },
      maxLength: {
        value: 30,
        message: "A valid password must have less than 30 characters",
      },
    },
  };

  const emailRegister = register("email", registerOptions.email);
  const passwordRegister = register("password", registerOptions.password);

  const handleLoginRegistration = (loginFormData) => {
    expressAPI
      .post(`/api/auth/login`, loginFormData)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        handleLoginError();
      });
  };

  return (
    <div className="min-h-[60vh] min-w-[45%] flex flex-col justify-items-center items-center ">
      <p className=" font-bold text-xl text-orange ">
        You already have an account
      </p>
      <form
        className="flex flex-col items-center min-w-[350px]"
        onSubmit={handleSubmit(handleLoginRegistration)}
      >
        <div className="flex flex-col w-[100%]  p-2 md:mt-8">
          <label className="py-2 pl-1 font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded-md border-[3px] p-1 h-9 border-orange bg-dark"
            type="text"
            placeholder="Enter your email address"
            onChange={emailRegister.onChange}
            name={emailRegister.name}
            ref={emailRegister.ref}
            aria-invalid={errors.email ? "true" : "false"}
          />
        </div>
        <div className="flex flex-col w-[100%]  p-2 ">
          <label className="py-2 pl-1  font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded-md border-[3px] p-1  border-orange bg-dark"
            type="password"
            placeholder="Enter your password"
            onChange={passwordRegister.onChange}
            name={passwordRegister.name}
            ref={passwordRegister.ref}
            aria-invalid={errors.password ? "true" : "false"}
          />
        </div>
        <input
          className="w-36 h-9 m-5 mt-8  rounded-3xl font-primary font-semibold  bg-[linear-gradient(90deg,#FF8200_0%,_#FF2415_100%)]"
          type="submit"
          value="Log In"
        />
      </form>
      <div role="alert" className="max-w-[230px] font-medium text-[#FF2415]">
        {errors.email && <p> {errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <LoginErrorPopUp
        className="bg-orange"
        isOpen={loginErrorPopUpOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
