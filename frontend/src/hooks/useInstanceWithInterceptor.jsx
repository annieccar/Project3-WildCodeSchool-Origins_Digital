import axios from "axios";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import expressAPI from "../services/expressAPI";

function useInstanceWithInterceptor() {
  const { setUser } = useCurrentUserContext();

  expressAPI.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response) {
        if (
          err.response.status === 401 &&
          err.response.data.message ===
            "Unauthorized: access token has expired."
        ) {
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.status === 200) {
                setUser(null);
                localStorage.clear();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    }
  );
  return expressAPI;
}

export default useInstanceWithInterceptor;
