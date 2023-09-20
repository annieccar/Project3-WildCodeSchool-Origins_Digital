import { useNavigate } from "react-router-dom";

export default function NotPremium() {
  const navigate = useNavigate();
  return (
    <div>
      <button type="button" onClick={() => navigate("/")}>
        <div className="fixed z-10 top-0 bottom-0 left-0 right-0 backdrop-blur-md" />
      </button>
      <div className="bg-dark border-solid border-2 border-orange w-[330px] px-5 py-3 rounded-md flex flex-col gap-2 items-center absolute z-50 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 ">
        <p className="text-white text-center font-primary font-bold text-md my-2">
          You need a premium membership to watch this video
        </p>
        <div>
          <button
            className="text-white mx-1.5 mb-2 text-sm font-primary font-semibold rounded-full w-64 px-4 py-0.5 mt-1"
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
