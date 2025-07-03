import { useEffect } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", disableRightClick);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return <Component {...pageProps} />;
}
