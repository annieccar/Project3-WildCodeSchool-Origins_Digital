import PropTypes from "prop-types";
import Modal from "./Modal";

export default function LoginErrorPopUp({ isOpen, onClose }) {
  return (
    <Modal hasCloseBtn isOpen={isOpen} onClose={onClose}>
      <p className="text-3xl">Login failed</p>
      <p>No user matches this credentials.</p>
    </Modal>
  );
}

LoginErrorPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
