import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-dark flex justify-between items-center h-16">
      <Link to="/">
        <img
          src="../../src/assets/images/Origins Digital Logo.png"
          className="h-4/5 mb-2"
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
