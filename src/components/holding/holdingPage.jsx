import { useState, useEffect } from "react";
import { useTheme } from "../../lib/theme";
import Content from "./content";
import Footer from "./footer";

export default function HoldingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [darkMode, setDarkMode] = useTheme();

  const images = [
    "/assets/holding/ZIMO WS Duo.svg"
  ];

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div
      className={`w-screen h-[90vh] sm:h-[100vh] overflow-hidden ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Content
        currentImageIndex={currentImageIndex}
        images={images}
        fade={fade}
        darkMode={darkMode}
      />
      <Footer darkMode={darkMode} />
    </div>
  );
}
