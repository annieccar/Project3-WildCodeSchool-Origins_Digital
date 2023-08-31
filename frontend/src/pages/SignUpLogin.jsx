import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import useMediaQuery from "../hooks/useMediaQuery";

export default function SignUpLogin() {
  const [loginSelected, setLoginSelected] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 760px)");

  const changeSelected = () => {
    setLoginSelected(!loginSelected);
  };
  return (
    <div className=" flex flex-col items-center min-h-[1200px] mt-2 bg-dark text-white ">
      <div className="flex m-5">
        <button
          className={
            loginSelected
              ? `w-36 h-9 m-5 rounded-3xl font-primary font-semibold border-2 border-orange bg-orange`
              : `w-36 h-9 m-5 rounded-3xl font-primary font-semibold border-2 border-orange`
          }
          type="button"
          onClick={changeSelected}
          disabled={loginSelected}
          hidden={isDesktop}
        >
          Log In
        </button>

        <button
          className={
            !loginSelected
              ? `w-36 h-9 m-5 rounded-3xl font-primary font-semibold border-2 border-orange bg-orange`
              : `w-36 h-9 m-5 rounded-3xl font-primary font-semibold border-2 border-orange`
          }
          type="button"
          onClick={changeSelected}
          disabled={!loginSelected}
          hidden={isDesktop}
        >
          Sign up
        </button>
      </div>

      <div className="">
        {isDesktop && (
          <div className="flex basis-1/2 justify-center">
            <Login /> <Signup />
          </div>
        )}
        {!isDesktop && loginSelected ? <Login /> : null}
        {!isDesktop && !loginSelected ? <Signup /> : null}
      </div>
    </div>
  );
}
