import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createPortal } from "react-dom";
import visa from "../assets/images/Visa.png";
import expressAPI from "../services/expressAPI";
import CustomModal from "../components/CustomModal";
import DeleteUserModal from "../components/DeleteUserModal";

export default function UserProfileManagement() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [usertypes, setUsertypes] = useState(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    expressAPI
      .get(`/api/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    expressAPI
      .get(`/api/users/usertypes`)
      .then((res) => setUsertypes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleUserDelete = () => {
    expressAPI
      .delete(`/api/users/${id}`)
      .then((res) => {
        if (res.status === 204) {
          navigate("/admin/users");
        }
      })
      .catch((err) => console.error(err));
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    username: {
      required: "An username must be registered.",
      pattern: {
        value: /[a-z0-9éèàëñçù^*+'\\"=²&§$¤€£<>()|%°.-_@]/gi,
        message: "Registered username contains forbidden characters.",
      },
      minLength: {
        value: 3,
        message: "An username must have at least 3 characters.",
      },
      maxLength: {
        value: 64,
        message: "An username must have less than 64 characters.",
      },
    },
    firstname: {
      required: "A firstname must be registered.",
      pattern: {
        value: /[a-z0-9éèàëñçù]/gi,
        message: "Registered firstname contains forbidden characters.",
      },
      minLength: {
        value: 2,
        message: "A firstname must have at least 2 characters.",
      },
      maxLength: {
        value: 64,
        message: "A firstname must have less than 64 characters.",
      },
    },
    lastname: {
      required: "A lastname must be registered.",
      pattern: {
        value: /[a-z0-9éèàëñçù]/gi,
        message: "Registered lastname contains forbidden characters.",
      },
      minLength: {
        value: 2,
        message: "A lastname must have at least 2 characters.",
      },
      maxLength: {
        value: 64,
        message: "A lastname must have less than 64 characters.",
      },
    },
    email: {
      required: "An email must be registered.",
      pattern: {
        value: /^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,4}$/gi,
        message:
          'Registered email has the wrong format. It must resemble "johndoe@example.com."',
      },
    },
    password: {
      minLength: {
        value: 8,
        message: "A valid password must have at least 8 characters.",
      },
      maxLength: {
        value: 64,
        message: "A valid password must have less than 64 characters.",
      },
    },
    passwordconfirmation: {
      validate: (value) =>
        value === watch("password") || "Passwords do not match.",
    },
  };

  const usernameRegister = register("username", registerOptions.username);
  const firstnameRegister = register("firstname", registerOptions.firstname);
  const lastnameRegister = register("lastname", registerOptions.lastname);
  const emailRegister = register("email", registerOptions.email);
  const usertypeRegister = register("usertype_id", registerOptions.usertype_id);
  const passwordRegister = register("password", registerOptions.password);
  const passwordConfirmationRegister = register(
    "passwordconfirmation",
    registerOptions.passwordconfirmation
  );

  const onSubmit = (data) => {
    const userData = { ...data, id: user.id, profileimage: user.profileimage };

    expressAPI
      .put(`/api/users/${user.id}/admin`, userData)
      .then((res) => {
        if (res.status === 201) {
          setMsg("User updated");
          setModal(true);
        } else {
          setMsg("Something went wrong, retry later");
          setModal(true);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-dark flex flex-col w-full pb-16 md:pb-10 md:items-center">
      {user && usertypes && (
        <div className="flex flex-col mt-5 md:w-1/3">
          <h1 className="text-center text-xl text-orange font-bold mb-5">{`${user.username}`}</h1>
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
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="font-primary font-bold text-lg py-2"
              >
                Password
              </label>
              <input
                type="password"
                name={passwordRegister.name}
                onChange={passwordRegister.onChange}
                ref={passwordRegister.ref}
                aria-invalid={errors.passwordRegister ? "true" : "false"}
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg pl-2 py-1 w-full"
              />
              {errors.password && (
                <p className="text-[#FF2415]"> {errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="py-2 pl-1 font-semibold"
                htmlFor="passwordconfirmation"
              >
                Confirm password:
              </label>
              <input
                className="bg-dark border-2 border-orange focus:outline-none rounded-lg w-full pl-1 py-1"
                type="password"
                placeholder="Confirm new password"
                onChange={passwordConfirmationRegister.onChange}
                name={passwordConfirmationRegister.name}
                ref={passwordConfirmationRegister.ref}
                aria-invalid={errors.passwordconfirmation ? "true" : "false"}
              />
              {errors.passwordconfirmation && (
                <p className="text-[#FF2415]">
                  {errors.passwordconfirmation.message}
                </p>
              )}
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
