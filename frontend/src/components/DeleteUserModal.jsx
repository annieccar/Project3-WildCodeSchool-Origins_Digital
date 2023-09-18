import PropTypes from "prop-types";

function DeleteUserModal({ username, closeModal, handleUserDelete }) {
  return (
    <>
      <button
        type="button"
        aria-label="closeModal"
        className="fixed inset-0 backdrop-blur"
        onClick={closeModal}
      />
      <div className="bg-dark min-w-[15rem] w-fit flex flex-col gap-1 items-center font-primary font-semibold text-white fixed z-10 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 rounded-lg border-2 border-orange">
        <p className="text-center">
          Are you sure you want to delete this user ?
        </p>
        <p className="text-orange font-semibold">{username}</p>

        <div className="flex justify-around w-full mt-5">
          <button
            type="button"
            onClick={closeModal}
            className="bg-orange-gradient rounded-full text-sm px-6 py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUserDelete}
            className="border-2 border-orange text-orange text-sm rounded-full px-3 py-2"
          >
            Yes, delete this user
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteUserModal;

DeleteUserModal.propTypes = {
  username: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleUserDelete: PropTypes.func.isRequired,
};
