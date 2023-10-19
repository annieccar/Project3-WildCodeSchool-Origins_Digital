import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import UpdateUserDetails from "../components/UpdateUserDetails";
import AddPaymentInfo from "../components/AddPaymentInfo";
import ExistingPaymentDetails from "../components/ExistingPaymentDetails";
import PaymentDetailsPopUp from "../components/PaymentDetailsPopUp";
import interceptor from "../hooks/useInstanceWithInterceptor";

export default function UserProfile() {
  const { user, setUser } = useCurrentUserContext();
  const expressAPI = interceptor();
  const [premium, setPremium] = useState(false);
  const [userTypeId, setUserTypeId] = useState(user.usertype_id);
  const [paymentDetailsModal, setPaymentDetailsModal] = useState(false);
  const [text, setText] = useState("updated");

  useEffect(() => {
    expressAPI
      .get(`/api/users/${user.id}`)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser({ ...res.data });
        setUserTypeId(res.data.usertype_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const userDetails = {
      ...user,
      usertype_id: userTypeId,
    };

    expressAPI
      .put(`/api/users/${user.id}/usertype`, userDetails)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userTypeId]);

  let status = "";
  if (userTypeId === 1) {
    status = "Free User";
  } else if (userTypeId === 2) {
    status = "Premium membership";
  } else if (userTypeId === 3) {
    status = "Administrator";
  }

  return (
    <>
      <div className="bg-almostWhite dark:bg-dark text-lightBlue dark:text-white flex justify-center">
        <div className="flex flex-col items-center mb-10 lg:flex-row lg:justify-center  lg:items-start lg:w-4/6 h-5/6 lg:mt-10">
          <UpdateUserDetails />
          <div className="w-80 flex flex-col justify-start lg:ml-28">
            <h1 className="text-orange font-primary font-bold text-xl py-3">
              Your account status
            </h1>
            <h2 className="font-primary font-bold text-l mb-2 ">{status}</h2>
            {userTypeId === 1 && !premium && (
              <div className="w-full flex justify-center">
                <button
                  className="text-white bg-orange-gradient font-primary font-semibold rounded-full w-48 h-8 px-4 py-0.5 my-10"
                  onClick={() => {
                    setPremium(true);
                  }}
                  type="button"
                >
                  Upgrade to premium
                </button>
              </div>
            )}
            {premium && (
              <AddPaymentInfo
                setUserTypeId={setUserTypeId}
                setPremium={setPremium}
                userTypeId={userTypeId}
                setPaymentDetailsModal={setPaymentDetailsModal}
                setText={setText}
              />
            )}

            {userTypeId !== 1 && (
              <ExistingPaymentDetails
                setUserTypeId={setUserTypeId}
                userTypeId={userTypeId}
                setPaymentDetailsModal={setPaymentDetailsModal}
                setText={setText}
              />
            )}
          </div>
        </div>
      </div>
      {paymentDetailsModal && (
        <PaymentDetailsPopUp
          setPaymentDetailsModal={setPaymentDetailsModal}
          text={text}
        />
      )}
    </>
  );
}
