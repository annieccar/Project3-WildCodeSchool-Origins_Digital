import PropTypes from "prop-types";
import Modal from "./Modal";

export default function SignupErrorPopUp({ isOpen, onClose, message }) {
  return (
    <Modal hasCloseBtn isOpen={isOpen} onClose={onClose}>
      <p className="text-3xl">Registration failed </p>
      <p>{message}</p>
      <p>Please check your informations.</p>
    </Modal>
  );
}

SignupErrorPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
};
SignupErrorPopUp.defaultProps = {
  message: "",
};
