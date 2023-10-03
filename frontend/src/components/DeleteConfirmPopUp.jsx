import PropTypes from "prop-types";

export default function DeleteConfirmPopUp({
  type,
  name,
  setDeleteConfirm,
  deleteFunction,
}) {
  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  const deleteEntry = () => {
    setDeleteConfirm(false);
    deleteFunction();
  };

  return (
    <div>
      <button type="button" onClick={cancelDelete}>
        <div className="fixed z-10 top-0 bottom-0 left-0 right-0 backdrop-blur-sm" />
      </button>
      <div className="bg-lightBlue dark:bg-dark border-solid border-2 border-orange w-[330px] px-5 py-3 rounded-md flex flex-col gap-2 items-center fixed z-50 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 ">
        <p className="text-almostWhite dark:text-white text-center font-primary font-bold text-md my-2">
          You are about to delete this {type} : {name} <br /> Are you sure you
          want to continue?
        </p>
        <div>
          <button
            className="text-white  h-8 mx-1.5 text-sm font-primary font-semibold rounded-full w-32 px-4 py-0.5 mt-1"
            style={{
              background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
            }}
            type="button"
            onClick={cancelDelete}
          >
            Cancel
          </button>
          <button
            className="text-orange h-8 mx-1.5 text-sm border-orange border-2 font-primary font-semibold rounded-full w-32 px-4 py-0.5 mt-1"
            type="button"
            onClick={deleteEntry}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteConfirmPopUp.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setDeleteConfirm: PropTypes.func.isRequired,
  deleteFunction: PropTypes.func.isRequired,
};
