import { useState } from "react";

import pencil from "../assets/images/Pencil.svg";

export default function UserProfile() {
  // A modifier une fois le use context de Thibault récupéré
  const profileImage = "";
  const [userName, setUserName] = useState("anniec");
  const [firstName, setFirstName] = useState("Annie");
  const [lastName, setLastName] = useState("Carignan");
  const [email, setEmail] = useState("annie@test.com");
  const [password, setPassword] = useState("Hello");
  const [userTypeId, setUserTypeId] = useState(1);

  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cryptogram, setCryptogram] = useState("");

  // A modifier une fois le use context de Thibault récupéré
  const handleSubmit = () => {};
  const upgradePremium = () => {
    setUserTypeId(2);
  };

  return (
    <div className="bg-dark">
      <div className="flex flex-col items-center">
        <form className="w-80" onSubmit={handleSubmit}>
          <h1 className="text-orange font-primary font-bold text-xl py-3">
            Your Profile
          </h1>
          <div className="flex justify-between items-center my-2 pr-3">
            <img
              src={
                profileImage
                  ? `${profileImage}`
                  : "../../src/assets/images/User.png"
              }
              alt={userName}
            />
            <img className="h-9 w-9" src={pencil} alt="Edit pencil" />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Username"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              Username
            </label>
            <input
              className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              name="userName"
              id="userName"
              value={userName}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Firstname"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              First Name
            </label>
            <input
              className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Lastname"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              Last Name
            </label>
            <input
              className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              Email Address
            </label>
            <input
              className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              value={email}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-white font-primary font-bold text-l mb-2 "
            >
              Password
            </label>
            <input
              className="mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              value={password}
            />
          </div>
          <div className="flex justify-center my-5">
            <input
              className="text-white font-primary font-semibold rounded-full w-auto px-4 py-0.5"
              style={{
                background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
              }}
              type="submit"
              value="Save Changes"
            />
          </div>
        </form>
        <div className="w-80">
          <h1 className="text-orange font-primary font-bold text-xl py-3">
            Your account status
          </h1>
          <h2 className="text-white font-primary font-bold text-l mb-2 ">
            {userTypeId === 1 ? "Free User" : "Premium"}
          </h2>
        </div>
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
              type="text"
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
                type="password"
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
      </div>

      <div />
    </div>
  );
}
