import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-dark flex justify-between items-center h-16">
      <Link to="/">
        <img
          className="h-4/5 mb-1 w-3/5"
          src="../../src/assets/images/origins-digital.svg"
          alt="Origin Digital Logo"
        />
      </Link>
      <Link to="/login">
        <button
          className="text-white mr-3 font-primary border-none"
          type="button"
        >
          Log in/Sign Up
        </button>
      </Link>
    </nav>
  );
}
