import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import magnifier from "../assets/images/Vector.png";
import pencil from "../assets/images/Pencil.svg";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="flex flex-col my-5">
      <div className="flex justify-center mb-5">
        <button
          type="button"
          className="bg-orange-gradient rounded-full px-6 py-2 text-lg"
          onClick={() => navigate("/admin/users/create")}
        >
          Create User
        </button>
      </div>
      <div className="flex flex-col gap-2 w-10/12 mx-auto">
        <label htmlFor="user-list" className="text-lg text-orange">
          User List :
        </label>
        <input
          className="bg-dark w-52 h-10 font-primary text-base p-2 border-2 focus:outline-none border-orange rounded-xl text-gray"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button">
          <img
            src={magnifier}
            alt="search"
            className="-translate-y-10 translate-x-[10.5rem]"
          />
        </button>
      </div>
      <div className="w-10/12 flex flex-col gap-2 px-5 py-4 mx-auto border-2 border-orange rounded-xl overflow-y-hidden">
        {users &&
          users
            .filter(
              (user) =>
                !search ||
                user.username
                  .toLocaleLowerCase()
                  .includes(search.trim().toLocaleLowerCase())
            )
            .map((user) => (
              <div key={user.id} className="flex justify-between">
                <p>{user.username}</p>
                <Link to={`/admin/users/${user.id}`}>
                  <img src={pencil} alt="pencil" className="w-7" />
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}
