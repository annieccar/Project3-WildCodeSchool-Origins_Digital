import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import expressAPI from "../services/expressAPI";
import CustomModal from "../components/CustomModal";
import DeleteUserModal from "../components/DeleteUserModal";
import registerOptions from "../validators/userProfileManagement.validator";
import useMediaQuery from "../hooks/useMediaQuery";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { useLoginContext } from "../contexts/LoginContext";

export default function UserProfileManagement({
  userProps,
  setUpdate,
  setUsers,
  setCreate,
}) {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [usertypes, setUsertypes] = useState(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { user } = useCurrentUserContext();
  const { setIsLoggedIn } = useLoginContext();

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
      setUserProfile(userProps);
    } else {
      expressAPI
        .get(`/api/users/${id}`)
        .then((res) => setUserProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [userProps]);

  useEffect(() => {
    if (userProfile) {
      setValue("username", userProfile.username);
      setValue("firstname", userProfile.firstname);
      setValue("lastname", userProfile.lastname);
      setValue("email", userProfile.email);
      setValue("usertype_id", userProfile.usertype_id);
    }
  }, [userProfile]);

  useEffect(() => {
    expressAPI
      .get(`/api/users/usertypes`)
      .then((res) => setUsertypes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleUserDelete = () => {
    expressAPI
      .delete(`/api/users/${userProfile.id}`)
      .then((res) => {
        if (userProfile.username === user.username) {
          expressAPI.get("/api/auth/logout").then((result) => {
            if (result.status === 200) {
              setIsLoggedIn(false);
              localStorage.clear();
              navigate("/");
            }
          });
        }
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
      .put(`/api/users/${userProfile.id}/admin`, data)
      .then((res) => {
        if (res.status === 201) {
          if (isDesktop) {
            expressAPI
              .get(`/api/users`)
              .then((result) => setUsers(result.data));
            setUserProfile({ id: userProfile.id, ...data });
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
      {userProfile && usertypes && (
        <div className="flex flex-col mt-5 lg:w-3/5 lg:mt-0">
          <h1 className="text-center text-xl text-orange font-bold mb-5">
            {userProfile.username}
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
                defaultValue={userProfile.username}
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
                defaultValue={userProfile.firstname}
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
                defaultValue={userProfile.lastname}
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
                defaultValue={userProfile.email}
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
                defaultValue={userProfile.usertype_id}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-2 w-full"
              >
                {usertypes.map((usertype) => (
                  <option key={usertype.id} value={usertype.id}>
                    {usertype.type_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3 items-center my-5">
              <button
                type="submit"
                className="w-40 bg-orange-gradient font-bold rounded-full px-3 py-2"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => setDeleteModal(true)}
                className="w-40 bg-blue-gradient font-bold rounded-full px-3 py-2"
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
            username={userProfile.username}
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
