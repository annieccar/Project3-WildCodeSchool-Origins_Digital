import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import logo from "../assets/images/origins-digital.svg";
import CategoryMenuDesktop from "./CategoryMenuDesktop";
import interceptor from "../hooks/useInstanceWithInterceptor";

import magnifier from "../assets/images/Vector.png";
import ToolboxPopUp from "./ToolboxPopUp";
import ToggleThemeButton from "./ToggleThemeButton";
import { useLoginContext } from "../contexts/LoginContext";

export default function Navbar() {
  const { user, setUser } = useCurrentUserContext();
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  const navigate = useNavigate();
  const expressAPI = interceptor();
  const [isMobile, setIsMobile] = useState(true);
  const [userMenuSelected, setUserMenuSelected] = useState(false);
  const [categorySelection, setCategorySelection] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [toolboxOpen, setToolboxOpen] = useState(false);

  const handleUserMenu = () => {
    setUserMenuSelected(!userMenuSelected);
    setToolboxOpen(false);
    setCategorySelection(false);
  };

  const handleMyProfile = () => {
    setUserMenuSelected(false);
    navigate("/profile");
  };

  const handleLogOut = () => {
    expressAPI.get("/api/auth/logout").then((res) => {
      if (res.status === 200) {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.clear();
        setUserMenuSelected(false);
        navigate("/");
      } else {
        toast.error("Impossible to logout");
      }
    });
  };

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handlePlaylists = () => {
    setToolboxOpen(false);
    setCategorySelection(false);
    if (isLoggedIn) {
      navigate("/playlists");
    } else {
      navigate("/login");
    }
  };

  const handleSearch = () => {
    navigate(`/search/name=${keyWord}`);
  };

  const handleKeyDown = (e, func) => {
    if (e.key === "Enter") {
      func();
    }
  };

  const handleToolboxClick = () => {
    setToolboxOpen(!toolboxOpen);
    setCategorySelection(false);
    setUserMenuSelected(false);
  };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
    handleResize();
  }, [user]);

  window.addEventListener("resize", handleResize);

  return (
    <nav className="bg-lightBlue dark:bg-dark text-white flex justify-center items-center h-16 w-full z-30 fixed ">
      <Link to="/">
        <img
          className="h-16 mb-1 fixed top-0 left-0"
          src={logo}
          alt="Origin Digital Logo"
        />
      </Link>
      {!isMobile && (
        <div className="bg-lightBlue dark:bg-dark h-16 w-1/2 flex justify-between items-center fixed z-30">
          <div>
            <input
              className="bg-lightBlue dark:bg-dark w-52 h-10 font-primary text-base lg:text-xl py-1 px-2 border-2 lg:border-2 dark:border-orange focus:outline-none rounded-full text-almostWhite "
              placeholder="Search..."
              onChange={(e) => {
                setKeyWord(e.target.value);
              }}
              onKeyDown={(e) => handleKeyDown(e, handleSearch)}
            />
            <button type="button" onClick={handleSearch}>
              <img
                src={magnifier}
                alt="search"
                className="translate-y-1 -translate-x-9 w-6 h-6"
              />
            </button>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCategorySelection(true);
                setUserMenuSelected(false);
                setToolboxOpen(false);
              }}
            >
              <h1
                className={`font-primary font-bold text-lg hover:text-orange -translate-x-10 ${
                  categorySelection && "text-orange"
                } `}
              >
                Categories
              </h1>
            </button>
            {categorySelection && (
              <>
                <button
                  type="button"
                  onClick={() => setCategorySelection(false)}
                >
                  <div className="fixed top-0 bottom-12 left-0 right-0" />
                </button>
                <div className="absolute -translate-y-10 translate-x-24">
                  <CategoryMenuDesktop
                    setCategorySelection={setCategorySelection}
                  />
                </div>
              </>
            )}
          </div>
          <button type="button" onClick={handlePlaylists}>
            <h1 className="font-primary font-bold text-lg hover:text-orange -translate-x-10  ">
              Playlists
            </h1>
          </button>
          {user?.usertype_id === 3 && (
            <button type="button" onClick={handleToolboxClick}>
              <h1
                className={`font-primary font-bold text-lg hover:text-orange -translate-x-10 ${
                  toolboxOpen && "text-orange"
                } `}
              >
                Management tools
              </h1>
            </button>
          )}
        </div>
      )}

      {isLoggedIn ? (
        <div className="flex gap-2 items-center fixed top-1 right-4 z-[31]">
          <button type="button" onClick={handleUserMenu}>
            {user.profileimage ? (
              <div className="flex items-center my-2">
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/public/profileimages/${user.profileimage}`}
                  alt="user"
                  className="rounded-full h-10 mr-3 w-10 object-cover"
                />
                <p className="font-primary font-">{user.username}</p>
              </div>
            ) : (
              <div className="flex items-center my-2">
                <BiUserCircle className="w-10 h-10 " />
                <p className="font-primary font-semibold">{user.username}</p>
              </div>
            )}
          </button>
          <ToggleThemeButton />
        </div>
      ) : (
        <Link to="/login">
          <button
            className="text-white h-8 w-28 font-primary font-semibold rounded-full px-4 py-0.5 mx-4 bg-orange-gradient fixed top-4 right-1"
            type="button"
          >
            Log in
          </button>
        </Link>
      )}
      {userMenuSelected && (
        <>
          <button type="button" onClick={() => setUserMenuSelected(false)}>
            <div className="fixed top-20 bottom-12 left-0 right-0 " />
          </button>
          <div className="bg-lightBlue dark:bg-opacity-0 dark:backdrop-blur-md text-white border-solid border-2 border-orange w-32 px-5 py-3 rounded-md flex flex-col gap-2 items-start fixed z-50 top-14 right-2 ">
            <button type="button" onClick={handleMyProfile}>
              <p className="hover:text-orange font-primary font-bold my-2">
                My profile
              </p>
            </button>
            <button type="button" onClick={handleLogOut}>
              <p className="hover:text-orange font-primary font-bold my-2">
                Log Out
              </p>
            </button>
          </div>
        </>
      )}

      {toolboxOpen && <ToolboxPopUp onClose={() => setToolboxOpen(false)} />}
      <ToastContainer />
    </nav>
  );
}
