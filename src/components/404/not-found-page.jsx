import React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "../../lib/theme";
import Footer from "../holding/footer";
import Content from "./content";
import TopHeader from "./header";

function NotFoundPage() {
  const pathname = usePathname(); // Get current URL
  const image = ["/assets/404/404 ERROR.svg"];
  const [darkMode, setDarkMode] = useTheme()

  return (
    <div
      className={`w-screen h-[90vh] sm:h-[100vh] overflow-hidden ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <TopHeader pathname={pathname} darkMode={darkMode}  />
      <Content image={image}  darkMode={darkMode}/>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default NotFoundPage;

