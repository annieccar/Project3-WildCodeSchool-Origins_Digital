import PropTypes from "prop-types";

export default function PaymentDetailsPopUp({ setPaymentDetailsModal, text }) {
  const closePopUp = () => {
    setPaymentDetailsModal(false);
  };

  return (
    <div>
      <button type="button" onClick={closePopUp}>
        <div className="fixed z-10 top-0 bottom-0 left-0 right-0 backdrop-blur-sm" />
      </button>
      <div className="dark:bg-dark bg-lightBlue border-solid border-2 border-orange w-64 px-5 py-3 rounded-md flex flex-col gap-2 items-center absolute z-50 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 ">
        <p className="text-orange text-center font-primary font-bold text-lg my-2">
          Your payment details have been successfully {text}.
        </p>

        <button
          className="text-white font-primary font-semibold rounded-full w-auto px-4 py-0.5 mt-1"
          style={{
            background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
          }}
          type="button"
          onClick={closePopUp}
        >
          Close
        </button>
      </div>
    </div>
  );
}

PaymentDetailsPopUp.propTypes = {
  setPaymentDetailsModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
