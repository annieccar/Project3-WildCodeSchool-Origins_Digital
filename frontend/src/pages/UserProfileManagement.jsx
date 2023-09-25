import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import visa from "../assets/images/Visa.png";
import interceptor from "../hooks/useInstanceWithInterceptor";

import CustomModal from "../components/CustomModal";
import DeleteUserModal from "../components/DeleteUserModal";
import registerOptions from "../validators/userProfileManagement.validator";
import useMediaQuery from "../hooks/useMediaQuery";

export default function UserProfileManagement({
  userProps,
  setUpdate,
  setUsers,
  setCreate,
}) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [usertypes, setUsertypes] = useState(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const expressAPI = interceptor();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const usernameRegister = register("username", registerOptions.username);
  const firstnameRegister = register("firstname", registerOptions.firstname);
  const lastnameRegister = register("lastname", registerOptions.lastname);
  const emailRegister = register("email", registerOptions.email);
  const usertypeRegister = register("usertype_id", registerOptions.usertype_id);

  useEffect(() => {
    if (isDesktop) {
      setUser(userProps);
    } else {
      expressAPI
        .get(`/api/users/${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
    }
  }, [userProps]);

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("firstname", user.firstname);
      setValue("lastname", user.lastname);
      setValue("email", user.email);
      setValue("usertype_id", user.usertype_id);
    }
  }, [user]);

  useEffect(() => {
    expressAPI
      .get(`/api/users/usertypes`)
      .then((res) => setUsertypes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleUserDelete = () => {
    expressAPI
      .delete(`/api/users/${user.id}`)
      .then((res) => {
        if (res.status === 204 && isDesktop) {
          setUpdate(false);
          expressAPI.get(`/api/users`).then((result) => setUsers(result.data));
          setCreate(true);
        } else {
          navigate("/admin/users");
        }
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = (data) => {
    expressAPI
      .put(`/api/users/${user.id}/admin`, data)
      .then((res) => {
        if (res.status === 201) {
          if (isDesktop) {
            expressAPI
              .get(`/api/users`)
              .then((result) => setUsers(result.data));
            setUser({ id: user.id, ...data });
          }
          setMsg("User updated");
          setModal(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setMsg("Something went wrong, retry later");
        setModal(true);
      });
  };

  return (
    <div className="bg-dark flex flex-col w-full pb-16 lg:w-1/2 lg:items-center">
      {user && usertypes && (
        <div className="flex flex-col mt-5 lg:w-3/5 lg:mt-0">
          <h1 className="text-center text-xl text-orange font-bold mb-5">
            {user.username}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-10/12 mx-auto"
          >
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="font-primary font-bold text-lg py-2"
              >
                Username
              </label>
              <input
                type="text"
                name={usernameRegister.name}
                onChange={usernameRegister.onChange}
                ref={usernameRegister.ref}
                defaultValue={user.username}
                aria-invalid={errors.usernameRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.username && (
                <p className="text-[#FF2415]"> {errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="firstname"
                className="font-primary font-bold text-lg py-2"
              >
                Firstname
              </label>
              <input
                type="text"
                name={firstnameRegister.name}
                onChange={firstnameRegister.onChange}
                ref={firstnameRegister.ref}
                defaultValue={user.firstname}
                aria-invalid={errors.firstnameRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.firstname && (
                <p className="text-[#FF2415]"> {errors.firstname.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastname"
                className="font-primary font-bold text-lg py-2"
              >
                Lastname
              </label>
              <input
                type="text"
                name={lastnameRegister.name}
                onChange={lastnameRegister.onChange}
                ref={lastnameRegister.ref}
                defaultValue={user.lastname}
                aria-invalid={errors.lastnameRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.lastname && (
                <p className="text-[#FF2415]"> {errors.lastname.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-primary font-bold text-lg py-2"
              >
                Email
              </label>
              <input
                type="text"
                name={emailRegister.name}
                onChange={emailRegister.onChange}
                ref={emailRegister.ref}
                defaultValue={user.email}
                aria-invalid={errors.emailRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.email && (
                <p className="text-[#FF2415]"> {errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-primary font-bold text-lg py-2">
                Account status
              </p>
              <select
                name={usertypeRegister.name}
                onChange={usertypeRegister.onChange}
                ref={usertypeRegister.ref}
                defaultValue={user.usertype_id}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-2 w-full"
              >
                {usertypes.map((usertype) => (
                  <option key={usertype.id} value={usertype.id}>
                    {usertype.type_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h1 className="text-orange font-primary font-bold text-xl py-3">
                Payment Info:
              </h1>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="CardNumber"
                className="text-white font-primary font-bold text-l mb-2 "
              >
                Card Number
              </label>
              <input
                className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-orange bg-dark text-gray font-primary "
                type="text"
                name="cardnumber"
                defaultValue="**** **** **** 6258"
              />
            </div>
            <div className="flex items-center">
              <img className="h-[61px]" src={visa} alt="Visa" />
            </div>
            <div className="flex flex-col gap-3 items-center my-5">
              <button
                type="submit"
                className="w-40 bg-orange-gradient rounded-full px-3 py-2"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => setDeleteModal(true)}
                className="w-40 border-2 border-orange text-orange rounded-full px-3 py-2"
              >
                Delete this user
              </button>
            </div>
          </form>
        </div>
      )}
      {modal &&
        createPortal(
          <CustomModal closeModal={() => setModal(false)} msg={msg} />,
          document.body
        )}
      {deleteModal &&
        createPortal(
          <DeleteUserModal
            username={user.username}
            closeModal={() => setDeleteModal(false)}
            handleUserDelete={handleUserDelete}
          />,
          document.body
        )}
    </div>
  );
}

UserProfileManagement.propTypes = {
  userProps: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileimage: PropTypes.string,
    usertype_id: PropTypes.number.isRequired,
  }),
  setUpdate: PropTypes.func,
  setUsers: PropTypes.func,
  setCreate: PropTypes.func,
};

UserProfileManagement.defaultProps = {
  userProps: null,
  setUpdate: null,
  setUsers: null,
  setCreate: null,
};
