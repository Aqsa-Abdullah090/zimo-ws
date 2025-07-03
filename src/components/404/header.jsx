import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";

export default function TopHeader({ pathname, darkMode }) {
  const router = useRouter();
  const [firstAnimated, setFirstAnimated] = useState(false); // WS 1
  const [secondAnimated, setSecondAnimated] = useState(false); // WS 2
  const [thirdAnimated, setThirdAnimated] = useState(false); // WS 3–8 done
  const [fourthAnimated, setFourthAnimated] = useState(false); // W.svg done
  const [ws3To8Completed, setWs3To8Completed] = useState(0); // Counter

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

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // or a loader

  return (
    <section className="relative h-[20px] flex items-center justify-center mt-[12px] sm:mt-[30px] 3xl:mt-[50px] font-arial mx-[8px] sm:mx-[20px] 3xl:mx-[40px]">
      <div className="w-full flex flex-row items-center gap-[2px] ">
        {images.map((src, index) => {
          const commonProps = {
            key: index,
            src,
            alt: `Logo ${index}`,
            className: `h-[12px] sm:h-[20px] 3xl:h-[25px] ${
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
                initial={{ x: 40, opacity: 0 }}
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
                initial={{ x: 30, opacity: 0 }}
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
                initial={{ y: -300, opacity: 0 }}
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
                initial={{ x: -20, opacity: 0 }}
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
                initial={{ x: -8, opacity: 0 }}
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

      {hasMounted && (
        <div className="h-[20px] mt-[2px] absolute top-[80px] sm:top-1/2 -translate-y-1/2 text-[10px] sm:text-[12px] 3xl:text-[14px] tracking-[3px] uppercase">
          REQUESTED URL {pathname}
        </div>
      )}
    </section>
  );
}
