import PropTypes from "prop-types";
import Modal from "./Modal";

export default function CarouselErrorPopUp({ isOpen, onClose, message }) {
  return (
    <Modal hasCloseBtn isOpen={isOpen} onClose={onClose}>
      <p className="text-3xl">{message.title}</p>
      <p>{message.content}</p>
      {message.button && (
        <button
          type="button"
          onClick={() => onClose(message.button.onValidation)}
        >
          {message.button.text}
        </button>
      )}
    </Modal>
  );
}

CarouselErrorPopUp.propTypes = {
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
