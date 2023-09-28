import PropTypes from "prop-types";
import Modal from "./Modal";

export default function SignupErrorPopUp({ isOpen, onClose }) {
  return (
    <Modal hasCloseBtn isOpen={isOpen} onClose={onClose}>
      <p className="text-3xl">Registration failed </p>
      <p>Please check your informations.</p>
    </Modal>
  );
}

SignupErrorPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
