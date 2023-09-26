import PropTypes from "prop-types";
import Modal from "./Modal";

export default function CarouselManagementPopUp({ isOpen, onClose, message }) {
  return (
    <Modal hasCloseBtn isOpen={isOpen} onClose={onClose}>
      <p className="text-xl">{message.title}</p>
      <p className="text-lg mt-2">{message.content}</p>
      {message.button && (
        <button
          type="button"
          onClick={() => onClose(message.button.onValidation)}
          className="h-10 mt-5 mb-3 w-36 rounded-3xl  font-semibold   bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)]"
        >
          {message.button.text}
        </button>
      )}
    </Modal>
  );
}

CarouselManagementPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    button: PropTypes.shape({
      onValidation: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.number,
    }),
  }).isRequired,
};
