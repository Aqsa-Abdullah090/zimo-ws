// components/Footer.jsx
import React from "react";

export default function Footer({ darkMode }) {
  return (
    <div className="absolute bottom-2 sm:bottom-0 w-full flex flex-col-reverse sm:flex-row items-center sm:items-end text-[4px] sm:text-[6px] 3xl:text-[9px] tracking-[1.3px]">
      {/* Centered text */}
      <div className="w-full text-center sm:w-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2 pb-[28px] 3xl:pb-[48px]">
        <p className="font-arial">
          © COPYRIGHT 2025 OMNIUM SOCIAL <span>I</span> ZIMO GROUP LIMITED. ALL RIGHTS RESERVED.
        </p>
      </div>

      {/* Image at the right corner */}
      <div className="sm:absolute sm:right-[30px] 3xl:right-[50px] pb-[10px] sm:pb-[30px] 3xl:pb-[50px]">
        <img
          src="/assets/holding/ZIMO OFFICIAL LICENSED.svg"
          alt="logo"
          className={`w-[70px] sm:w-[122.31px] lg:w-[80px] 3xl:w-[90px] ${
            darkMode ? "invert" : ""
          }`}
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}
