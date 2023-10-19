import axios from "axios";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import expressAPI from "../services/expressAPI";
import { useLoginContext } from "../contexts/LoginContext";

function useInstanceWithInterceptor() {
  const { setUser } = useCurrentUserContext();
  const { setIsLoggedIn } = useLoginContext();

  expressAPI.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response) {
        if (
          (err.response.status === 401 &&
            err.response.data.message ===
              "Unauthorized: access token has expired.") ||
          err.response.data.message === "No token provided." ||
          (err.response.status === 403 && err.response.data)
        ) {
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.status === 200) {
                setIsLoggedIn(false);
                setUser(null);
                localStorage.clear();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }

      return Promise.reject(err);
    }
  );
  return expressAPI;
}

export default useInstanceWithInterceptor;
