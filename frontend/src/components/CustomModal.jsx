import PropTypes from "prop-types";

function CustomModal({ msg, closeModal }) {
  return (
    <>
      <button
        type="button"
        aria-label="closeModal"
        className="fixed inset-0 z-30 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="bg-lightBlue dark:bg-dark min-w-[15rem] w-fit font-primary font-semibold text-almostWhite dark:text-white fixed z-30 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 rounded-lg border-2 border-orange">
        <p className="text-center">{msg}</p>
        <button
          type="button"
          className="text-white absolute top-1 right-1 bg-orange-gradient rounded-sm px-2"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </>
  );
}

export default CustomModal;

CustomModal.propTypes = {
  msg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
