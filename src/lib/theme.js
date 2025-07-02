import { useState, useEffect, useRef } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasToggled = useRef(false);

  useEffect(() => {
    if (hasToggled.current) {
      console.log("Skipped second theme toggle (React dev mode).");
      return;
    }

    const saved = localStorage.getItem("darkMode") === "true";
    console.log("Previously saved theme in localStorage:", saved);

    const newTheme = !saved;
    console.log("New (inverted) theme:", newTheme);

    setDarkMode(newTheme);
    localStorage.setItem("darkMode", newTheme.toString());
    console.log("Updated theme saved to localStorage:", newTheme);

    hasToggled.current = true;
    setIsReady(true); // only after theme is set
  }, []);

  return [darkMode, setDarkMode, isReady];
}
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode, isReady] = useTheme();

  if (!isReady) return null; // Prevent rendering until theme is ready

  return (
    <div className={darkMode ? "dark" : ""}>
      {children}
    </div>
  );
}


