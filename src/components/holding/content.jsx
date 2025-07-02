import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "./countdown";
import ComingSoon from "./coming-soon";
import { COMINGSOON_TABS } from "./lib";

export default function Content({ fade, darkMode }) {
  const [tab, setTab] = useState(COMINGSOON_TABS.countdown);
  const [firstAnimated, setFirstAnimated] = useState(false); // WS 1
  const [secondAnimated, setSecondAnimated] = useState(false); // WS 2
  const [thirdAnimated, setThirdAnimated] = useState(false); // WS 3–8 done
  const [fourthAnimated, setFourthAnimated] = useState(false); // W.svg done
  const [ws3To8Completed, setWs3To8Completed] = useState(0); // Counter

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

  // Trigger W.svg after WS 3–8 complete
  useEffect(() => {
    if (ws3To8Completed === 6) {
      setThirdAnimated(true);
    }
  }, [ws3To8Completed]);

  const images = [
    "/assets/holding/W.svg", // 0
    "/assets/holding/S.svg", // 1
    "/assets/holding/ZIMO WS 1.svg", // 2
    "/assets/holding/ZIMO WS 2.svg", // 3
    "/assets/holding/ZIMO WS 3.svg", // 4
    "/assets/holding/ZIMO WS 4.svg", // 5
    "/assets/holding/ZIMO WS 5.svg", // 6
    "/assets/holding/ZIMO WS 6.svg", // 7
    "/assets/holding/ZIMO WS 7.svg", // 8
    "/assets/holding/ZIMO WS 8.svg", // 9
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
      <motion.div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center">
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-row items-center justify-center gap-[2px]">
          {images.map((src, index) => {
            const commonProps = {
              key: index,
              src,
              alt: `Logo ${index}`,
              className: `h-[60px] sm:h-[46px] 3xl:h-[80px] ${
                darkMode ? "invert" : ""
              }`,
              draggable: false,
              onDragStart: (e) => e.preventDefault(),
            };

            // W.svg (index 0): animate from right after WS 3–8
            if (index === 0) {
              return (
                <motion.img
                  {...commonProps}
                  initial={{ x: 100, opacity: 0 }}
                  animate={thirdAnimated ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  onAnimationComplete={() => setFourthAnimated(true)}
                  style={{ zIndex: 6 }}
                />
              );
            }

            // S.svg (index 1): animate from right to left after W.svg
            if (index === 1) {
              return (
                <motion.img
                  {...commonProps}
                  initial={{ x: 60, opacity: 0 }}
                  animate={fourthAnimated ? { x: -2, opacity: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{ zIndex: 5 }}
                />
              );
            }

            // WS 1 (index 2): drop from top
            if (index === 2) {
              return (
                <motion.img
                  {...commonProps}
                  initial={{ y: -400, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 3, ease: "linear" }}
                  onAnimationComplete={() => setFirstAnimated(true)}
                  style={{ zIndex: 10 }}
                />
              );
            }

            // WS 2 (index 3): slide from left after WS 1
            if (index === 3) {
              return (
                <motion.img
                  {...commonProps}
                  initial={{ x: -40, opacity: 0 }}
                  animate={firstAnimated ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  onAnimationComplete={() => setSecondAnimated(true)}
                  style={{ zIndex: 5 }}
                />
              );
            }

            // WS 3–8 (index 4–9): sequential after WS 2
            if (index >= 4 && index <= 9) {
              return (
                <motion.img
                  {...commonProps}
                  initial={{ x: -20, opacity: 0 }}
                  animate={secondAnimated ? { x: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.9 * (index - 4),
                    ease: "easeInOut",
                  }}
                  onAnimationComplete={() =>
                    setWs3To8Completed((prev) => prev + 1)
                  }
                  style={{ zIndex: 4 }}
                />
              );
            }

            return <img {...commonProps} />;
          })}
        </div>
      </motion.div>

      {/* Coming Soon */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-center mt-[80px] lg:mt-[100px]">
        <AnimatePresence>
          <ComingSoon tab={tab} darkMode={darkMode} />
        </AnimatePresence>
      </div>

      {/* Countdown */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[2px] sm:right-[30px] 3xl:right-[50px] w-[70px] sm:w-[122.31px] lg:w-[80px] 3xl:w-[90px]">
        <Countdown tab={tab} darkMode={darkMode} />
      </div>
    </>
  );
}
