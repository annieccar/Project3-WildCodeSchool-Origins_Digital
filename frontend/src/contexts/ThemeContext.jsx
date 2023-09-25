import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export function ThemeContextProvider({ children }) {
  const theme = localStorage.getItem("darkMode") ?? true;
  const [darkMode, setDarkMode] = useState(theme);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const memoizedTheme = useMemo(() => {
    return { darkMode, toggleTheme };
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={memoizedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
