import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { RiVisaFill, RiMastercardFill } from "react-icons/ri";
import { LiaCcAmex } from "react-icons/lia";
import { PiCreditCard } from "react-icons/pi";

export default function AddPaymentInfo({
  setUserTypeId,
  setPremium,
  userTypeId,
  setModUpdate,
  setPaymentDetailsModal,
  setText,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const upgradePremium = () => {
    setUserTypeId(2);
    setPremium(false);
    setText("registered");
    setPaymentDetailsModal(true);
  };

  const updateDetails = () => {
    setModUpdate(false);
    setText("updated");
    setPaymentDetailsModal(true);
  };

  return (
    <form
      className="text-lightBlue dark:text-white w-80 pb-10 z-50 "
      onSubmit={
        userTypeId === 1
          ? handleSubmit(upgradePremium)
          : handleSubmit(updateDetails)
      }
    >
      <h1 className="text-orange font-primary font-bold text-xl py-3">
        Payment Info:
      </h1>
      <div className="flex flex-col">
        <label
          htmlFor="CardholderName"
          className="font-primary font-bold text-l mb-2 "
        >
          Cardholder Name
        </label>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <input
          className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
          type="text"
          {...register("cardholdername", {
            required: true,
            minLength: 5,
          })}
          aria-invalid={errors.cardholdername ? "true" : "false"}
          name="cardholdername"
          defaultValue=""
        />
        {errors.cardholdername && (
          <span className="text-red">
            The first and last name of your card holder is required
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="CardNumber"
          className="font-primary font-bold text-l mb-2 "
        >
          Card Number
        </label>
        <input
          className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
          type="password"
          {...register("cardnumber", {
            required: true,
            minLength: 13,
          })}
          aria-invalid={errors.cardnumber ? "true" : "false"}
          name="cardnumber"
          defaultValue=""
        />
        {errors.cardnumber && (
          <span className="text-red">
            A valid credit card number is required
          </span>
        )}
      </div>
      <div className="flex items-center">
        <div className="mr-3 text-lightBlue dark:text-white">
          <RiVisaFill size={40} />
        </div>
        <div className="mr-3 text-lightBlue dark:text-white">
          <RiMastercardFill size={40} />
        </div>
        <div className="mr-3 text-lightBlue dark:text-white">
          <LiaCcAmex size={40} />
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="expiryDate"
          className="font-primary font-bold text-l mb-2 "
        >
          Expiry Date
        </label>
        <div className="flex w-full">
          <select
            className="h-9 w-36 mb-2 mr-6 px-2 rounded-lg border-2 border-solid focus:outline-none border-orange bg-almostWhite dark:bg-dark font-primary "
            name="month"
            id="month"
          >
            <option value="">Month</option>
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="sept">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
          </select>
          <select
            className="h-9 w-36 mb-2 px-2 rounded-lg border-2 border-solid border-orange focus:outline-none bg-almostWhite dark:bg-dark font-primary "
            name="year"
            id="year"
          >
            <option value="">Year</option>
            <option value="23">2023</option>
            <option value="24">2024</option>
            <option value="25">2025</option>
            <option value="26">2026</option>
            <option value="27">2027</option>
            <option value="28">2028</option>
            <option value="29">2029</option>
            <option value="30">2030</option>
            <option value="31">2031</option>
            <option value="32">2032</option>
            <option value="33">2033</option>
            <option value="34">2034</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="cryptogram"
          className="font-primary font-bold text-l mb-2 "
        >
          Cryptogram
        </label>
        <div className="flex items-center">
          <input
            className="h-9 focus:outline-none w-32 mr-2 px-2 rounded-lg border-2 border-solid border-orange bg-almostWhite dark:bg-dark font-primary "
            type="text"
            {...register("cryptogram", {
              required: true,
              minLength: 3,
            })}
            aria-invalid={errors.cryptogram ? "true" : "false"}
            name="cryptogram"
            defaultValue=""
          />
          <div className="text-lightBlue dark:text-white">
            <PiCreditCard size={40} />
          </div>
        </div>
        {errors.cryptogram && (
          <span className="text-red">A 3 digits cryptogram is required</span>
        )}
      </div>
      <div className="flex justify-center my-5">
        <input
          className="text-white bg-orange-gradient font-primary font-semibold rounded-full w-auto h-8 px-4 py-0.5"
          type="submit"
          value="Save payment details"
        />
      </div>
    </form>
  );
}

AddPaymentInfo.propTypes = {
  setUserTypeId: PropTypes.func.isRequired,
  setPremium: PropTypes.func.isRequired,
  userTypeId: PropTypes.number.isRequired,
  setModUpdate: PropTypes.func,
  setPaymentDetailsModal: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
};

AddPaymentInfo.defaultProps = {
  setModUpdate: null,
};
