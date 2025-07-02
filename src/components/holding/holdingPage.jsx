import { useState, useEffect } from "react";
import { useTheme } from "../../lib/theme";
import Content from "./content";
import Footer from "./footer";

export default function HoldingPage() {
  const [darkMode, setDarkMode] = useTheme();

  return (
    <div
      className={`w-screen h-[90vh] sm:h-[100vh] overflow-hidden ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Content
        darkMode={darkMode}
      />
      <Footer darkMode={darkMode} />
    </div>
  );
}
