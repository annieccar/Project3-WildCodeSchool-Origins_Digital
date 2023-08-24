import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const [missingValues, setMissingValues] = useState("");

  const { setUser } = useCurrentUserContext();

  const navigate = useNavigate();

  let errorMessage = "";

  const handleChange = (event) => {
    const { id, value } = event.target;
    setLoginFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const checkLoginForm = (obj) => {
    const values = [];
    let message = "";
    for (const [key, value] of Object.entries(obj)) {
      if (!value.length) {
        values.push(` ${key}`);
      }
    }

    if (values.length) {
      if (values.length === 1) {
        message = `Please complete the field${values[0]}.`;
      } else {
        message = `Please complete the fields${[...values]}.`;
      }
    }
    if (obj.loginPassword.length < 8) {
      message += " A password must have at least 8 characters.";
    }

    return message.replaceAll("login", "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    errorMessage = checkLoginForm(loginFormData);
    if (!errorMessage.length) {
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
        });
    } else {
      setMissingValues(errorMessage);
    }
  };

  return (
    <div className="min-h-[60vh] min-w-[50%] mx-12 flex flex-col justify-items-center items-center">
      <p className="w-[230px] font-bold text-orange ">
        You already have an account
      </p>
      <form className="flex flex-col items-center " onSubmit={handleSubmit}>
        <div className="flex flex-col p-2 md:mt-8">
          <label className="py-2 pl-1 font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded-sm border-[1px] p-0.5 border-orange bg-blue"
            type="email"
            id="loginEmail"
            name="email"
            placeholder="Enter your email"
            value={loginFormData.loginEmail || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1  font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded-sm border-[1px] p-0.5 border-orange bg-blue"
            type="password"
            id="loginPassword"
            name="password"
            placeholder="Enter your password"
            value={loginFormData.loginPassword || ""}
            onChange={handleChange}
          />
        </div>

        <button
          className="w-36 h-9 m-5 mt-8  rounded-3xl font-primary font-semibold border-2 border-orange bg-orange"
          type="submit"
        >
          Log In
        </button>
      </form>
      <p className="max-w-[230px] font-medium text-[#FF2415]">
        {missingValues}
      </p>
    </div>
  );
}
