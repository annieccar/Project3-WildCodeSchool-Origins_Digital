import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useMediaQuery from "../hooks/useMediaQuery";

export default function ToolboxPopUp({ isOpen, onClose }) {
  const [isPopupOpen, setIsPopupOpen] = useState(isOpen);
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const popUpRef = useRef(null);

  const navigate = useNavigate();

  const handleClosePopUp = () => {
    if (onClose) {
      onClose();
    }
    setIsPopupOpen(!isPopupOpen);
  };

  useOnClickOutside(popUpRef, handleClosePopUp);

  const handleClick = (page) => {
    handleClosePopUp();
    navigate(`/admin/${page}`);
  };

  return (
    <div
      ref={popUpRef}
      className={`backdrop-blur-md border-solid border-2 border-orange w-60 h-54 px-5 py-3 rounded-md flex flex-col gap-2 items-start absolute z-50 top-14 right-1/3 translate-x-3/4 ${
        !isDesktop && "top-auto bottom-14 right-52 "
      } `}
    >
      <button
        type="button"
        onClick={() => handleClick("category")}
        className="text-white hover:text-orange font-primary font-bold text-l my-2"
      >
        Categories management
      </button>
      <button
        type="button"
        onClick={() => handleClick("video")}
        className="text-white hover:text-orange font-primary font-bold text-l my-2"
      >
        Videos management
      </button>
      <button
        type="button"
        onClick={() => handleClick("carousel")}
        className="text-white hover:text-orange font-primary font-bold text-l my-2"
      >
        Carousels management
      </button>
      <button
        type="button"
        onClick={() => handleClick("users")}
        className="text-white hover:text-orange font-primary font-bold text-l my-2"
      >
        Users management
      </button>
    </div>
  );
}

ToolboxPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
