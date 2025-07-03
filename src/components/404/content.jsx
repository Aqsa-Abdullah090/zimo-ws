export default function Content({ image, darkMode }) {
  return (
    <>
      {/* Centered image */}
      <div className="h-full w-full tracking-[3px] font-arial flex flex-col items-center justify-center">
        <div className="absolute top-1/2 -translate-y-1/2">
          <img
            src={image}
            alt="Logo"
            className={`w-[180px] sm:w-[220px] 3xl:w-[256px] transition-opacity ${
              darkMode ? "invert" : ""
            }`}
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        <p className="text-[10px] sm:text-[12px] 3xl:text-[14px] text-center mt-[150px] sm:mt-[120px] 3xl:mt-[150px] max-sm:w-[70%]">
          WE COULD NOT FIND THE PAGE YOU WERE LOOKING FOR.
        </p>
        <p className="text-[10px] sm:text-[12px] 3xl:text-[14px] mt-[30px] 3xl:mt-[50px]">
          TRY{" "}
          <a href="/" className="font-bold">
            SEARCHING
          </a>{" "}
          FOR SOMETHING ELSE.
        </p>
      </div>
    </>
  );
}
