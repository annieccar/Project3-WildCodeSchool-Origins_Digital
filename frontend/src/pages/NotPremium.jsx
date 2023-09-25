import { useNavigate } from "react-router-dom";

export default function NotPremium() {
  const navigate = useNavigate();
  return (
    <div className=" bg-almostWhite dark:bg-dark h-screen flex justify-center items-center">
      <div
        role="button"
        onClick={() => navigate("/")}
        className="fixed top-0 bottom-0 left-0 right-0 h-screen"
        tabIndex={0}
        onKeyDown={() => navigate("/")}
        aria-label="Navigate to the homepage"
      />
      <div className="bg-lightBlue dark:bg-dark border-solid border-2 border-orange w-[330px] px-5 py-3 rounded-md flex flex-col gap-2 items-center bottom-1/2 right-1/2 -translate-y-16 ">
        <p className="text-almostWhite dark:text-white text-center font-primary font-bold text-md my-2">
          You need a premium membership to access this page
        </p>
        <div>
          <button
            className="text-white relative mx-1.5 mb-2 text-sm font-primary font-semibold rounded-full w-64 px-4 py-0.5 mt-1"
            style={{
              background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
            }}
            type="button"
            onClick={() => navigate("/profile")}
          >
            Upgrade to premium for 6.99€/month
          </button>
        </div>
      </div>
    </div>
  );
}
