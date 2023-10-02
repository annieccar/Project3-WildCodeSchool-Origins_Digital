import { useState } from "react";
import PropTypes from "prop-types";
import { RiVisaFill } from "react-icons/ri";

import AddPaymentInfo from "./AddPaymentInfo";
import CancelSubscriptionPopUp from "./CancelSubscriptionPopUp";

export default function ExistingPaymentDetails({
  userTypeId,
  setPaymentDetailsModal,
  setText,
  setUserTypeId,
}) {
  const [modUpdate, setModUpdate] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const openPopUp = (e) => {
    e.preventDefault();
    setCancelModal(true);
  };

  return (
    <>
      {!modUpdate && (
        <form className="w-80 pb-10">
          <div>
            <h2 className="text-orange font-primary font-bold text-l my-2 ">
              Renewal date:
            </h2>
            <h2 className="font-primary font-bold text-l my-2 ">25/01/2024</h2>
          </div>

          <div className="flex justify-center my-10">
            <button
              className="text-white bg-orange-gradient font-primary font-semibold rounded-full w-auto h-8 px-4 py-0.5"
              onClick={openPopUp}
              type="button"
            >
              Cancel Membership
            </button>
          </div>
          <h1 className="text-orange font-primary font-bold text-xl py-3">
            Payment Info:
          </h1>
          <div className="flex flex-col">
            <label
              htmlFor="CardNumber"
              className="font-primary font-bold text-l mb-2 "
            >
              Card Number
            </label>
            <input
              className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
              type="text"
              name="cardnumber"
              defaultValue="**** **** **** 6258"
            />
          </div>

          <div className="flex items-center text-lightBlue dark:text-white">
            <RiVisaFill size={40} />
          </div>

          <div className="flex justify-center my-5">
            <button
              className="text-white bg-orange-gradient font-primary font-semibold
          rounded-full w-auto h-8 px-4 py-0.5"
              type="submit"
              value="Update"
              onClick={() => {
                setModUpdate(true);
              }}
            >
              Update payment details
            </button>
          </div>
        </form>
      )}
      {modUpdate && (
        <AddPaymentInfo
          userTypeId={userTypeId}
          setModUpdate={setModUpdate}
          setPaymentDetailsModal={setPaymentDetailsModal}
          setText={setText}
        />
      )}
      {cancelModal && (
        <CancelSubscriptionPopUp
          setCancelModal={setCancelModal}
          setUserTypeId={setUserTypeId}
        />
      )}
    </>
  );
}

ExistingPaymentDetails.propTypes = {
  userTypeId: PropTypes.number.isRequired,
  setPaymentDetailsModal: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  setUserTypeId: PropTypes.func.isRequired,
};
