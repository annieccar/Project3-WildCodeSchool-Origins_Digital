import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import magnifier from "../assets/images/Vector.png";
import pencil from "../assets/images/Pencil.svg";
import expressAPI from "../services/expressAPI";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    expressAPI.get(`/api/users`).then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="flex flex-col my-5 md:max-w-[50rem] md:mx-auto">
      <div className="flex justify-center mb-5">
        <button
          type="button"
          className="bg-orange-gradient rounded-full px-8 py-2 text-lg"
          onClick={() => navigate("/admin/users/create")}
        >
          Create User
        </button>
      </div>
      <div className="flex flex-col gap-2 w-10/12 mx-auto">
        <label
          htmlFor="user-list"
          className="font-primary font-bold text-lg text-orange"
        >
          User List :
        </label>
        <div className="flex justify-between py-1 px-2 mb-3 border-2 border-orange rounded-xl">
          <input
            className="bg-dark h-10 font-primary text-gray focus: outline-none"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button">
            <img src={magnifier} alt="search" />
          </button>
        </div>
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
