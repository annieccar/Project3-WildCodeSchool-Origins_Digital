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
    <div className="bg-dark">
      <div className="flex flex-col items-center">
        <UpdateUserDetails />
        <div className="w-80">
          <h1 className="text-orange font-primary font-bold text-xl py-3">
            Your account status
          </h1>
          <h2 className="text-white font-primary font-bold text-l mb-2 ">
            {status}
          </h2>
        </div>
        <AddPaymentInfo />
      </div>
    </div>
  );
}
