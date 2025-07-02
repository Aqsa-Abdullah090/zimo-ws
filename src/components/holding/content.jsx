import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "./countdown";
import ComingSoon from "./coming-soon";
import { COMINGSOON_TABS } from "./lib";

export default function Content({ currentImageIndex, images, fade, darkMode }) {
  const [tab, setTab] = useState(COMINGSOON_TABS.countdown);

  // Update tab every 5 seconds
  useEffect(() => {
  let startTime = Date.now();
  let frameId;

  const tick = () => {
    const now = Date.now();
    const elapsed = now - startTime;

    if (elapsed >= 5000) {
      if (tab !== COMINGSOON_TABS.comingsoon) {
        setTab((prev) => prev + 1);
      }
      startTime = now; // reset timer
    }

    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frameId);
}, [tab]);


  return (
    <>
      {/* Centered image */}
      <motion.div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center">
        <img
          src={images[currentImageIndex]}
          alt="Logo"
          className={`w-[180px] sm:w-[220px] 3xl:w-[256px] transition-opacity ${
            fade ? "opacity-100 duration-[2000ms]" : "opacity-0 duration-1000"
          } ${darkMode ? "invert" : ""}`}
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
        />
      </motion.div>

      {/* Coming Soon */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-center mt-[80px] lg:mt-[100px]">
        <AnimatePresence>
          <ComingSoon tab={tab} darkMode={darkMode} />
        </AnimatePresence>
      </div>

      {/* Countdown on the side */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[2px] sm:right-[30px] 3xl:right-[50px] w-[70px] sm:w-[122.31px] lg:w-[80px] 3xl:w-[90px]">
        <Countdown tab={tab} darkMode={darkMode} />
      </div>
    </>
  );
}
