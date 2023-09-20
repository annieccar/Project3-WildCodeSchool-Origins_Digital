import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import logo from "../assets/images/origins-digital.svg";
import CategoryMenuDesktop from "./CategoryMenuDesktop";
import expressAPI from "../services/expressAPI";
import magnifier from "../assets/images/Vector.png";
import ToolboxPopUp from "./ToolboxPopUp";

export default function Navbar() {
  const { user } = useCurrentUserContext();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuSelected, setUserMenuSelected] = useState(false);
  const [categorySelection, setCategorySelection] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [toolboxOpen, setToolboxOpen] = useState(false);

  const handleUserMenu = () => {
    setUserMenuSelected(true);
  };

  const handleMyProfile = () => {
    setUserMenuSelected(false);
    navigate("/profile");
  };

  const handleLogOut = () => {
    expressAPI.get("/api/auth/logout").then((res) => {
      if (res.status === 200) {
        setIsLoggedIn(false);
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
    if (isLoggedIn) {
      navigate("/playlists");
    } else {
      navigate("/login");
    }
  };

  const handleSearch = () => {
    navigate(`/search/name=${keyWord}`);
  };

  const handleToolboxClick = () => {
    setToolboxOpen(true);
  };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
    handleResize();
  }, [user]);

  window.addEventListener("resize", handleResize);

  return (
    <nav className="bg-dark flex justify-center items-center h-16 w-full  ">
      <Link to="/">
        <img
          className="h-16 mb-1 mt-0.5 fixed top-1 left-0"
          src={logo}
          alt="Origin Digital Logo"
        />
      </Link>
      {!isMobile && (
        <div className="w-1/2 flex justify-between items-center">
          <div>
            <input
              className="bg-dark w-52 h-10 font-primary text-base lg:text-xl p-2 border-2 lg:border-2 border-orange rounded-md text-gray "
              placeholder="search"
              onChange={(e) => {
                setKeyWord(e.target.value);
              }}
            />
            <button type="button" onClick={handleSearch}>
              <img
                src={magnifier}
                alt="search"
                className="translate-y-1 -translate-x-8 w-6 h-6"
              />
            </button>
          </div>
          <button type="button" onClick={() => setCategorySelection(true)}>
            <h1
              className={`font-primary font-bold text-lg hover:text-orange -translate-x-10 ${
                categorySelection && "text-orange"
              } `}
            >
              Categories
            </h1>
          </button>
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
        <button
          type="button"
          onClick={handleUserMenu}
          className="fixed top-1 right-4"
        >
          {user.profileimage ? (
            <div className="flex items-center my-2">
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/public/profileimages/${user.profileimage}`}
                alt="user"
                className="rounded-full h-10 mr-3"
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
      ) : (
        <Link to="/login">
          <button
            className="text-white h-8 w-28 font-primary font-semibold rounded-full px-4 py-0.5 mx-4 bg-orange-gradient fixed top-3 right-1"
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
          <div className="backdrop-blur-md border-solid border-2 border-orange w-32 px-5 py-3 rounded-md flex flex-col gap-2 items-start fixed z-50 top-14 right-2 ">
            <button type="button" onClick={handleMyProfile}>
              <p className="text-white hover:text-orange font-primary font-bold my-2">
                My profile
              </p>
            </button>
            <button type="button" onClick={handleLogOut}>
              <p className="text-white hover:text-orange font-primary font-bold my-2">
                Log Out
              </p>
            </button>
          </div>
        </>
      )}
      {categorySelection && (
        <>
          <button type="button" onClick={() => setCategorySelection(false)}>
            <div className="fixed top-0 bottom-12 left-0 right-0" />
          </button>
          <CategoryMenuDesktop setCategorySelection={setCategorySelection} />
        </>
      )}
      {toolboxOpen && (
        <ToolboxPopUp
          isOpen={toolboxOpen}
          onClose={() => setToolboxOpen(!toolboxOpen)}
        />
      )}
      <ToastContainer />
    </nav>
  );
}
