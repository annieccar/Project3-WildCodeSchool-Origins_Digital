import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function SignUpLogin() {
  const [loginSelected, setLoginSelected] = useState(true);

  const changeSelected = () => {
    setLoginSelected(!loginSelected);
  };
  return (
    <div className=" flex flex-col items-center min-h-[1200px] mt-2 bg-dark text-white ">
      <div className="flex m-5">
        <button
          className={
            loginSelected
              ? `w-36 h-9 m-5 rounded-3xl font-primary font-semibold bg-[linear-gradient(90deg,#FF8200_0%,_#FF2415_100%)] `
              : `w-36 h-9 m-5 rounded-3xl font-primary font-semibold border-2 border-orange`
          }
          type="button"
          onClick={changeSelected}
          disabled={loginSelected}
        >
          Log In
        </button>

        <button
          className={
            !loginSelected
              ? `w-36 h-9 m-5 rounded-3xl font-primary font-semibold bg-[linear-gradient(90deg,#FF8200_0%,_#FF2415_100%)]`
              : `w-36 h-9 m-5 rounded-3xl font-primary font-semibold border-2  border-orange`
          }
          type="button"
          onClick={changeSelected}
          disabled={!loginSelected}
        >
          Sign up
        </button>
      </div>

      <div>
        {loginSelected ? <Login /> : null}
        {!loginSelected ? <Signup /> : null}
      </div>
    </div>
  );
}
