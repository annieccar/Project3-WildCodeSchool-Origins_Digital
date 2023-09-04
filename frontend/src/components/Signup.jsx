import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

export default function Signup() {
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    gender: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [missingValues, setMissingValues] = useState("");

  const { setUser } = useCurrentUserContext();

  const navigate = useNavigate();

  let errorMessage = "";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignupFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const checkSignupForm = (obj) => {
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
    if (obj.password !== obj.password_confirmation) {
      message += "Please enter matching passwords.";
    }
    return message.replace("_", " ");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    errorMessage = checkSignupForm(signupFormData);

    if (!errorMessage.length) {
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
    } else {
      setMissingValues(errorMessage);
    }
  };

  return (
    <div className="min-h-[60vh] min-w-[50%] mx-12 flex flex-col justify-items-center items-center">
      <p className="w-[150px] font-bold text-orange ">Create an account</p>
      <form className="flex flex-col items-center ]" onSubmit={handleSubmit}>
        <div className="flex flex-col p-2 md:mt-8">
          <label className="py-2 pl-1 font-semibold" htmlFor="username">
            Username:
          </label>
          <input
            className="rounded-sm border-[1px] p-0.5 border-orange bg-blue"
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={signupFormData.username || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="firstname">
            Firstname :
          </label>
          <input
            className="rounded-sm border-[1px] p-0.5 border-orange bg-blue"
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter your firstname"
            value={signupFormData.firstname || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="lastname">
            Lastname:
          </label>
          <input
            className="rounded-sm border-[1px] p-0.5 border-orange bg-blue"
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your lastname"
            value={signupFormData.lastname || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="birthdate">
            Birthdate :
          </label>
          <input
            className="min-w-[190px] rounded-sm border-[1px] p-0.5 border-orange bg-blue webkit-calendar-picker-indicator:kitcolor-white"
            type="date"
            id="birthdate"
            name="birthdate"
            placeholder="Enter your birthdate"
            value={signupFormData.birthdate || ""}
            min="1900-01-01"
            onChange={handleChange}
          />{" "}
        </div>

        <fieldset className="flex flex-col p-2 min-w-[200px] ">
          <legend className="pt-2 pl-1 font-semibold">
            Select your gender:
          </legend>

          <div>
            <input
              type="radio"
              id="genderChoice1"
              name="gender"
              value="female"
              onChange={handleChange}
            />
            <label className="pl-2" htmlFor="genderChoice1">
              Female
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="genderChoice2"
              name="gender"
              value="male"
              onChange={handleChange}
            />
            <label className="pl-2" htmlFor="genderChoice2">
              Male
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="genderChoice3"
              name="gender"
              value="not gendered"
              onChange={handleChange}
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
            className="rounded-sm border-[1px] p-0.5 border-orange bg-blue"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={signupFormData.email || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label className="py-2 pl-1 font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded-sm border-[1px] p-0.5 border-orange bg-blue"
            type="password"
            id="password"
            name="password"
            placeholder="Choose your password"
            minLength="8"
            value={signupFormData.password || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col p-2 ">
          <label
            className="py-2 pl-1 font-semibold"
            htmlFor="password_confirmation"
          >
            Confirm password:
          </label>
          <input
            className="rounded-sm border-[1px] p-0.5 border-orange bg-blue"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Confirm your password"
            minLength="8"
            value={signupFormData.password_confirmation || ""}
            onChange={handleChange}
          />
        </div>

        <input
          className="w-36 h-9 m-5 mt-8  rounded-3xl font-primary font-semibold bg-orange-gradient"
          type="submit"
          value="Sign up"
        />
      </form>
      <p className="max-w-sm font-medium text-[#FF2415]">{missingValues}</p>
    </div>
    // Todo : user profile image upload
  );
}
