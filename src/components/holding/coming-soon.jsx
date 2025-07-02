import { AnimatePresence, motion } from "framer-motion";
import { COMING_SOON, COMINGSOON_TABS } from "./lib";
import clsx from "clsx";
import { useEffect, useState } from "react";

function ComingSoon({ tab, darkMode }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (tab >= COMINGSOON_TABS.comingsoon) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [index, tab]);

  const current = COMING_SOON[index % COMING_SOON.length];

  return (
    <div className="w-[180px] sm:w-[220px] 3xl:w-[256px] h-[60px] 3xl:h-[80px] mt-[0px] 3xl:mt-[100px]">
      <AnimatePresence mode="wait">
        {tab >= COMINGSOON_TABS.comingsoon && (
          <motion.img
            key={index}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 1.2, ease: "linear" }}
            className={clsx(current.img_css, darkMode && "invert")}
            src={`/assets/holding/coming-soon/${current.img}`}
            alt="coming soon"
          />

          // <motion.img
          //   key={index}
          //   initial={{ y: 80, opacity: 0 }}
          //   animate={{ y: 0, opacity: 1 }}
          //   exit={{ y: 100, opacity: 0 }}
          //   transition={{
          //     y: {
          //       duration: 1.2,
          //       ease: [0.42, 0, 1, 1], // easeIn for slide up
          //     },
          //     opacity: {
          //       duration: 1.2,
          //       ease: [0.1, 0.1, 0.25, 1], // smoother ease for fade
          //     },
          //   }}
          //   className={clsx(current.img_css, darkMode && "invert")}
          //   src={`/assets/holding/coming-soon/${current.img}`}
          //   alt="coming soon"
          // />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ComingSoon;
