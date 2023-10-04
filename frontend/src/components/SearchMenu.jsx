import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import magnifier from "../assets/images/Vector.png";

export default function SearchMenu({ setSearchMenu }) {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");

  const handleSearch = () => {
    setSearchMenu(false);
    navigate(`/search/name=${keyWord}`);
  };

  const handleKeyDown = (e, func) => {
    if (e.key === "Enter") {
      func();
    }
  };

  return (
    <>
      <button type="button" onClick={() => setSearchMenu(false)}>
        <div className="fixed z-10 top-0 bottom-12 left-0 right-0 " />
      </button>
      <div className=" h-20 bg-lightBlue dark:bg-dark flex justify-center items-center w-full fixed z-50 bottom-12">
        <input
          className=" bg-lightBlue dark:bg-dark text-almostWhite focus:outline-none backdrop-blur-sm w-52 h-10 font-primary translate-x-4 text-base lg:text-xl p-2 border-2 lg:border-2 border-orange rounded-md"
          placeholder="search"
          onChange={(e) => {
            setKeyWord(e.target.value);
          }}
          onKeyDown={(e) => handleKeyDown(e, handleSearch)}
        />
        <button className="-translate-x-8" type="button" onClick={handleSearch}>
          <img src={magnifier} alt="search" className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

SearchMenu.propTypes = {
  setSearchMenu: PropTypes.func.isRequired,
};
