import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Login() {
  const { setUser } = useCurrentUserContext();

  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 760px)");

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

  const [noMatch, setNoMatch] = useState("");

  useEffect(() => {
    if (noMatch) {
      setNoMatch(() => "");
    }
  }, [errors.email, errors.password]);

  const handleLoginRegistration = async (loginFormData) => {
    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
        loginFormData
      )
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setNoMatch(() => "No user matches this credentials.");
      });
  };

  return (
    <div
      className={`min-h-[60vh] min-w-[50%] mx-12 flex flex-col justify-items-center items-center ${
        isDesktop && "border-r-4 border-blue"
      }  `}
    >
      <p className="w-[230px] font-bold text-orange ">
        You already have an account
      </p>
      <form
        className="flex flex-col items-center "
        onSubmit={handleSubmit(handleLoginRegistration)}
      >
        <div className="flex flex-col p-2 md:mt-8">
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
          <label className="py-2 pl-1  font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded-md border-[3px] p-0.5  border-orange bg-dark"
            type="password"
            placeholder="Enter your password"
            onChange={passwordRegister.onChange}
            name={passwordRegister.name}
            ref={passwordRegister.ref}
            aria-invalid={errors.password ? "true" : "false"}
          />
        </div>
        <input
          className="w-36 h-9 m-5 mt-8  rounded-3xl font-primary font-semibold border-2 border-orange bg-orange"
          type="submit"
          value="Log In"
        />
      </form>
      <div role="alert" className="max-w-[230px] font-medium text-[#FF2415]">
        {errors.email && <p> {errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        {noMatch && <p>{noMatch}</p>}
      </div>
    </div>
  );
}
