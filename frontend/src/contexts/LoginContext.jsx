import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext();
export const useLoginContext = () => useContext(LoginContext);

export function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const memoizedLogin = useMemo(() => {
    return { isLoggedIn, setIsLoggedIn };
  }, [isLoggedIn]);

  return (
    <LoginContext.Provider value={memoizedLogin}>
      {children}
    </LoginContext.Provider>
  );
}

LoginContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
