import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useMediaQuery from "../hooks/useMediaQuery";

export default function ToolboxPopUp({ onClose }) {
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const navigate = useNavigate();

  const handleClosePopUp = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleClick = (page) => {
    handleClosePopUp();
    navigate(`/admin/${page}`);
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-30"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={`bg-lightBlue dark:bg-opacity-0 dark:backdrop-blur-xl border-solid text-almostWhite dark:text-white border-2 border-orange w-60 h-54 px-5 py-3 rounded-md flex flex-col gap-2 items-start fixed z-30 top-14 right-1/3 translate-x-3/4 ${
          !isDesktop && "top-auto bottom-14 right-52 "
        } `}
      >
        <button
          type="button"
          onClick={() => handleClick("category")}
          className="hover:text-orange font-primary font-bold text-l my-2"
        >
          Categories management
        </button>
        <button
          type="button"
          onClick={() => handleClick("video")}
          className="hover:text-orange font-primary font-bold text-l my-2"
        >
          Videos management
        </button>
        <button
          type="button"
          onClick={() => handleClick("carousel")}
          className="hover:text-orange font-primary font-bold text-l my-2"
        >
          Carousels management
        </button>
        <button
          type="button"
          onClick={() => handleClick("users")}
          className="hover:text-orange font-primary font-bold text-l my-2"
        >
          Users management
        </button>
      </div>
    </>
  );
}

ToolboxPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
};
