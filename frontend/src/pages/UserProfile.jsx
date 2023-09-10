import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import UpdateUserDetails from "../components/UpdateUserDetails";
import AddPaymentInfo from "../components/AddPaymentInfo";

export default function UserProfile() {
  const { user } = useCurrentUserContext();

  const userTypeId = user.usertype_id;

  let status = "";
  if (userTypeId === 1) {
    status = "Free User";
  } else if (userTypeId === 2) {
    status = "Premium";
  } else if (userTypeId === 3) {
    status = "Administrator";
  }
  return (
    <div className="bg-dark flex justify-center">
      <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:w-4/6 h-5/6 lg:mt-10">
        <UpdateUserDetails />
        <div className="w-80 flex flex-col justify-start">
          <h1 className="text-orange font-primary font-bold text-xl py-3">
            Your account status
          </h1>
          <h2 className="text-white font-primary font-bold text-l mb-2 ">
            {status}
          </h2>
          <AddPaymentInfo />
        </div>
      </div>
    </div>
  );
}
