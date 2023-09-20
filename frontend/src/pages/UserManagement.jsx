import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import magnifier from "../assets/images/Vector.png";
import pencil from "../assets/images/Pencil.svg";
import expressAPI from "../services/expressAPI";
import CreateUserManagement from "./CreateUserManagement";
import UserProfileManagement from "./UserProfileManagement";
import useMediaQuery from "../hooks/useMediaQuery";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);
  const [userProps, setUserProps] = useState(null);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(true);

  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    expressAPI.get(`/api/users`).then((res) => setUsers(res.data));
  }, []);

  const handleCreateUser = () => {
    if (isDesktop) {
      setCreate(true);
      setUpdate(false);
    } else {
      navigate("/admin/users/create");
    }
  };

  const handleUserProps = (user) => {
    setUserProps(user);
  };
  const handleFormUpdate = () => {
    setUpdate(true);
    setCreate(false);
  };

  const handleUpdateUser = (user) => {
    if (isDesktop) {
      handleUserProps(user);
      handleFormUpdate();
    } else {
      navigate(`/admin/users/${user.id}`);
    }
  };

  return (
    <div className="bg-dark flex flex-col lg:flex-row mt-10">
      <div className="flex flex-col lg:w-1/2">
        <div className="flex justify-center mb-5">
          <button
            type="button"
            className="bg-orange-gradient rounded-full px-8 py-2 text-lg"
            onClick={handleCreateUser}
          >
            New user
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
              className="bg-dark w-full h-10 font-primary text-gray focus: outline-none"
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
                <div
                  key={user.id}
                  className="flex justify-between lg:grid lg:grid-cols-[calc(100%_/_3),_calc(100%_/_3),_100px]"
                >
                  {isDesktop ? (
                    <>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handleUpdateUser(user)}
                        >
                          <img src={pencil} alt="pencil" className="w-7" />
                        </button>
                        <p>{user.username}</p>
                      </div>
                      <p>{user.email}</p>
                      <p>{user.type_name}</p>
                    </>
                  ) : (
                    <>
                      <p>{user.username}</p>
                      <button
                        type="button"
                        onClick={() => handleUpdateUser(user)}
                      >
                        <img src={pencil} alt="pencil" className="w-7" />
                      </button>
                    </>
                  )}
                </div>
              ))}
        </div>
      </div>
      {isDesktop && create && <CreateUserManagement setUsers={setUsers} />}
      {isDesktop && update && (
        <UserProfileManagement
          userProps={userProps}
          setUpdate={setUpdate}
          setUsers={setUsers}
          setCreate={setCreate}
        />
      )}
    </div>
  );
}
