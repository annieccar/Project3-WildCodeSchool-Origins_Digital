import { useState } from "react";

// import { useCurrentUserContext } from "../contexts/CurrentUserContext";

export default function AddPaymentInfo() {
  // const { user } = useCurrentUserContext();

  // const [userTypeId, setUserTypeId] = useState(user.usertype_id);

  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cryptogram, setCryptogram] = useState("");

  const upgradePremium = () => {
    // setUserTypeId(2);
  };

  return (
    <form className="w-80 pb-10" onSubmit={upgradePremium}>
      <h1 className="text-orange font-primary font-bold text-xl py-3">
        Payment Info:
      </h1>
      <div className="flex flex-col">
        <label
          htmlFor="CardholderName"
          className="text-white font-primary font-bold text-l mb-2 "
        >
          Cardholder Name
        </label>
        <input
          className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
          onChange={(e) => setCardHolderName(e.target.value)}
          type="text"
          name="cardholdername"
          id="cardholdername"
          value={cardHolderName}
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="CardNumber"
          className="text-white font-primary font-bold text-l mb-2 "
        >
          Card Number
        </label>
        <input
          className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
          onChange={(e) => setCardNumber(e.target.value)}
          type="number"
          name="cardnumber"
          id="cardnumber"
          value={cardNumber}
        />
      </div>
      <div className="flex items-center">
        <img
          className="h-[61px]"
          src="../../src/assets/images/Visa.png"
          alt="Visa"
        />
        <img
          className="h-[55px]"
          src="../../src/assets/images/American_Express.png"
          alt="Amex"
        />
        <img
          className="h-[53px]"
          src="../../src/assets/images/MasterCard.png"
          alt="MasterCard"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="expiryDate"
          className="text-white font-primary font-bold text-l mb-2 "
        >
          Expiry Date
        </label>
        <div className="flex w-full">
          <select
            className="w-36 mb-2 mr-6 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            onChange={(e) => setExpMonth(e.target.value)}
            name="month"
            id="month"
            value={expMonth}
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
            className="w-36 h-8 mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            onChange={(e) => setExpYear(e.target.value)}
            name="year"
            id="year"
            value={expYear}
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
          className="text-white font-primary font-bold text-l mb-2 "
        >
          Cryptogram
        </label>
        <div className="flex items-center">
          <input
            className="h-8 w-32 mr-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
            onChange={(e) => setCryptogram(e.target.value)}
            type="number"
            name="cryptogram"
            id="cryptogram"
            value={cryptogram}
          />
          <img
            src="../../src/assets/images/Card_Verification_Value.png"
            alt="cryptogram"
          />
        </div>
      </div>
      <div className="flex justify-center my-5">
        <input
          className="text-white font-primary font-semibold rounded-full w-auto h-8 px-4 py-0.5"
          style={{
            background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
          }}
          type="submit"
          value="Upgrade to premium"
        />
      </div>
    </form>
  );
}
