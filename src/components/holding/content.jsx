import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "./countdown";
import ComingSoon from "./coming-soon";
import { COMINGSOON_TABS } from "./lib";

export default function Content({ fade, darkMode }) {
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
        startTime = now;
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [tab]);

  // LOGO IMAGES
  const images = [
    "/assets/holding/W.svg",
    "/assets/holding/S.svg",
    "/assets/holding/ZIMO WS 1.svg",
    "/assets/holding/ZIMO WS 2.svg",
    "/assets/holding/ZIMO WS 3.svg",
    "/assets/holding/ZIMO WS 4.svg",
    "/assets/holding/ZIMO WS 5.svg",
    "/assets/holding/ZIMO WS 6.svg",
    "/assets/holding/ZIMO WS 7.svg",
    "/assets/holding/ZIMO WS 8.svg",
  ];

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      {/* Centered image */}
      <motion.div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center">
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-row items-center justify-center gap-[2px]">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Logo ${index}`}
              className={`h-[60px] sm:h-[46px] 3xl:h-[80px] ${darkMode ? "invert" : ""}`}
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          ))}
        </div>
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
