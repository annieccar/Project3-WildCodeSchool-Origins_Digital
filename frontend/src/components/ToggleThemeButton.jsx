import { useThemeContext } from "../contexts/ThemeContext";

export default function ToggleThemeButton() {
  const { darkMode, toggleTheme } = useThemeContext();
  return (
    <button type="button" onClick={toggleTheme}>
      {darkMode ? "🌑" : "☀️"}
    </button>
  );
}
