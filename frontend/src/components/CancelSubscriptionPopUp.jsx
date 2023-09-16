import PropTypes from "prop-types";

export default function CancelSubscriptionPopUp({
  setCancelModal,
  setUserTypeId,
}) {
  const keepSubscription = () => {
    setCancelModal(false);
  };

  const cancel = () => {
    setUserTypeId(1);
    setCancelModal(false);
  };

  return (
    <div>
      <button type="button" onClick={keepSubscription}>
        <div className="fixed z-10 top-0 bottom-0 left-0 right-0 backdrop-blur-md" />
      </button>
      <div className="bg-dark border-solid border-2 border-orange w-[330px] px-5 py-3 rounded-md flex flex-col gap-2 items-center absolute z-50 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 ">
        <p className="text-white text-center font-primary font-bold text-md my-2">
          We are sorry to see you go. Are you sure you want to cancel your
          subscription to your premium membership and loose access to over 1000
          weekly videos?
        </p>
        <div>
          <button
            className="text-white mx-1.5 text-sm font-primary font-semibold rounded-full w-32 px-4 py-0.5 mt-1"
            style={{
              background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
            }}
            type="button"
            onClick={keepSubscription}
          >
            No, keep subscription
          </button>
          <button
            className="text-orange mx-1.5 text-sm border-orange border-2 font-primary font-semibold rounded-full w-32 px-4 py-0.5 mt-1"
            type="button"
            onClick={cancel}
          >
            Yes, continue to cancellation
          </button>
        </div>
      </div>
    </div>
  );
}

CancelSubscriptionPopUp.propTypes = {
  setCancelModal: PropTypes.func.isRequired,
  setUserTypeId: PropTypes.func.isRequired,
};
