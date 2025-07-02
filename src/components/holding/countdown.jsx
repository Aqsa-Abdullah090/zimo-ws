import { useEffect, useState } from "react";
import { formatNumber2Digit } from "../../lib/helpers";
import { useTimer } from "react-timer-hook";
import moment from "moment";
import { motion } from "framer-motion";
import { COMINGSOON_TABS } from "./lib";

const launchDate = new Date(moment.utc("2025-12-02").format());

function Countdown({ tab, darkMode }) {
  const [isClient, setIsClient] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0); // how many items to show

  const { days, hours, minutes, seconds } = useTimer({
    expiryTimestamp: launchDate,
  });

  useEffect(() => {
    setIsClient(true);

    // Sequentially show countdown items one by one
    if (tab >= COMINGSOON_TABS.countdown) {
      let delay = 1200;
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
        }, delay + i * 800); // 0.6s interval
      }
    }
  }, [tab]);

  if (!isClient) return null;

  const iconBasePath = "/assets/holding/countdown/";
  const suffix = darkMode ? " W" : "";

  const countdownItems = [
    { value: days, icon: `${iconBasePath}DAY(S)${suffix}.svg` },
    { value: hours, icon: `${iconBasePath}HOUR(S)${suffix}.svg` },
    { value: minutes, icon: `${iconBasePath}MINUTE(S)${suffix}.svg` },
    { value: seconds, icon: `${iconBasePath}SECOND(S)${suffix}.svg` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: tab >= COMINGSOON_TABS.countdown ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="uppercase flex flex-col gap-[25px] 3xl:gap-[45px] items-center w-full overflow-hidden"
    >
      {countdownItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ x: 100, opacity: 0 }}
          animate={
            visibleCount > index ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={visibleCount > index ? "block" : "invisible"}
        >
          <CountdownItem value={item.value} icon={item.icon} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Countdown;

const CountdownItem = ({ value, icon }) => {
  const isDayIcon = icon.includes("DAY(S)");

  return (
    <div className="flex flex-col gap-[10px] 3xl:gap-[15px] items-center font-extralight w-[30px]">
      <img
        src={icon}
        alt="unit"
        className={`w-[12px] lg:w-[20px] 3xl:w-[30px] object-contain ${
          isDayIcon ? "mb-[10px]" : ""
        }`}
        draggable="false"
      />
      <span className="text-[15px] lg:text-[26px] 3xl:text-[40px] tracking-[4px] rotate-[90deg] font-Lato">
        {formatNumber2Digit(value)}
      </span>
    </div>
  );
};
