import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm rounded-circle bg-light border"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  );
}