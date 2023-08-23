import pencil from "../assets/images/Pencil.svg";

export default function UserProfile() {
  return (
    <div className="bg-dark">
      <div className="flex flex-col items-center">
        <form className="w-80">
          <h1 className="text-orange font-primary font-bold text-xl py-3">
            Your Profile
          </h1>
          <div>
            <svg>{pencil}</svg>
          </div>
        </form>
      </div>

      <div />
    </div>
  );
}
