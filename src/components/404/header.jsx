import React from 'react'

export default function TopHeader() {
  return (
    <div>TopHeader</div>
  )
}

// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { useRouter } from "next/navigation";

// function TopHeader({ pathname, darkMode }) {
//   const router = useRouter();

//   const shapesSet1 = [
//     { src: "/assets/holding/header/O1.svg", steps: 1, width: 20, delay: 14000 },
//     { src: "/assets/holding/header/O2.svg", steps: 3, width: 24, delay: 9500 },
//     { src: "/assets/holding/header/O3.svg", steps: 8, width: 27, delay: 7500 },
//     { src: "/assets/holding/header/O4.svg", steps: 2, width: 25, delay: 5500 },
//     { src: "/assets/holding/header/O5.svg", steps: 4, width: 22, delay: 3000 },
//     { src: "/assets/holding/header/O2.svg", steps: 3, width: 32, delay: 0 },
//   ];

//   const shapesSet2 = [
//     {
//       src: "/assets/holding/header/O1.1.svg",
//       steps: 1,
//       width: 20,
//       delay: 14000,
//     },
//     {
//       src: "/assets/holding/header/O2.1.svg",
//       steps: 3,
//       width: 24,
//       delay: 9500,
//     },
//     {
//       src: "/assets/holding/header/O3.1.svg",
//       steps: 8,
//       width: 27,
//       delay: 7500,
//     },
//     {
//       src: "/assets/holding/header/O4.1.svg",
//       steps: 2,
//       width: 25,
//       delay: 5500,
//     },
//     {
//       src: "/assets/holding/header/O5.1.svg",
//       steps: 4,
//       width: 22,
//       delay: 3000,
//     },
//     { src: "/assets/holding/header/O2.1.svg", steps: 3, width: 32, delay: 0 },
//   ];

//   const totalSteps = 8;
//   const startX = -300;
//   const endX = 10;
//   const spacing = -9;

//   const [useAltShapes, setUseAltShapes] = useState(false);
//   const currentShapes = useAltShapes ? shapesSet2 : shapesSet1;
//   const [isClickable, setIsClickable] = useState(false);

//   const [shapeSteps, setShapeSteps] = useState(
//     new Array(currentShapes.length).fill(0)
//   );
//   const circleRef = useRef(null);
//   const forwardTimers = useRef([]);
//   const reverseTimers = useRef([]);

//   useEffect(() => {
//     let isCancelled = false;

//     const runAnimationCycle = () => {
//       if (isCancelled) return;

//       setIsClickable(false);
//       const shapes = useAltShapes ? shapesSet2 : shapesSet1;
//       setShapeSteps(new Array(shapes.length).fill(0));

//       let circleDone = false;
//       let shapesDone = false;

//       const maybeEnableClick = () => {
//         if (circleDone && shapesDone) {
//           setIsClickable(true);
//         }
//       };

//       // Animate circle
//       const circle = shapes[0];
//       const circleTimeline = gsap.timeline({ paused: true });
//       circleTimeline.fromTo(
//         circleRef.current,
//         { x: startX, rotate: 0, opacity: 0 },
//         {
//           x: endX,
//           rotate: 360,
//           opacity: 1,
//           duration: 4,
//           ease: "power2.inOut",
//           onComplete: () => {
//             circleDone = true;
//             maybeEnableClick();
//           },
//         }
//       );

//       const circleStart = gsap.delayedCall(circle.delay / 1000, () => {
//         circleTimeline.play();
//       });
//       forwardTimers.current.push(circleStart);

//       let activeShapes = shapes.length - 1;

//       // Forward shapes
//       shapes.forEach((shape, index) => {
//         if (index === 0) return;

//         const startForward = gsap.delayedCall(shape.delay / 1000, () => {
//           let elapsed = 0;
//           const tickFn = () => {
//             elapsed += gsap.ticker.deltaRatio() * (1000 / 60);
//             if (elapsed >= 800) {
//               elapsed = 0;
//               setShapeSteps((prev) => {
//                 const updated = [...prev];
//                 if (updated[index] < totalSteps) {
//                   updated[index] += 1;
//                 } else {
//                   gsap.ticker.remove(tickFn);
//                   activeShapes -= 1;
//                   if (activeShapes === 0) {
//                     shapesDone = true;
//                     maybeEnableClick();
//                   }
//                 }
//                 return updated;
//               });
//             }
//           };
//           gsap.ticker.add(tickFn);
//           forwardTimers.current.push(tickFn);
//         });

//         forwardTimers.current.push(startForward);
//       });

//       // Reverse phase
//       const reverseStart = gsap.delayedCall(30, () => {
//         circleTimeline.reverse();
//         setIsClickable(false);

//         const delayBetween = 2;
//         let accumulatedDelay = 3;

//         shapes.forEach((shape, index) => {
//           if (index === 0) return;

//           const startReverse = gsap.delayedCall(accumulatedDelay, () => {
//             let elapsed = 0;
//             const tickFn = () => {
//               elapsed += gsap.ticker.deltaRatio() * (1000 / 60);
//               if (elapsed >= 800) {
//                 elapsed = 0;
//                 setShapeSteps((prev) => {
//                   const updated = [...prev];
//                   if (updated[index] > 0) {
//                     updated[index] -= 1;
//                   } else {
//                     gsap.ticker.remove(tickFn);
//                   }
//                   return updated;
//                 });
//               }
//             };
//             gsap.ticker.add(tickFn);
//             reverseTimers.current.push(tickFn);
//           });

//           reverseTimers.current.push(startReverse);
//           accumulatedDelay += delayBetween;
//         });

//         const restart = gsap.delayedCall(accumulatedDelay + 3, () => {
//           cleanupTimers();
//           setUseAltShapes((prev) => !prev); // toggle for next cycle
//         });
//         reverseTimers.current.push(restart);
//       });
//       reverseTimers.current.push(reverseStart);
//     };

//     const cleanupTimers = () => {
//       forwardTimers.current.forEach((t) => {
//         if (typeof t === "function") {
//           gsap.ticker.remove(t);
//         } else {
//           t.kill();
//         }
//       });
//       reverseTimers.current.forEach((t) => {
//         if (typeof t === "function") {
//           gsap.ticker.remove(t);
//         } else {
//           t.kill();
//         }
//       });
//       forwardTimers.current = [];
//       reverseTimers.current = [];
//     };

//     runAnimationCycle();

//     return () => {
//       isCancelled = true;
//       cleanupTimers();
//     };
//   }, [useAltShapes]);

//   return (
//     <section className="relative h-[20px] flex items-center justify-center mt-[12px] sm:mt-[30px] 3xl:mt-[50px] font-arial">
//       <div>
//         {currentShapes.map((shape, index) => {
//           const isCircle = index === 0;
//           const step = shapeSteps[index];

//           if (!isCircle && step === 0) return null;

//           const progress = step / totalSteps;
//           const translateX = isCircle
//             ? undefined
//             : startX + (endX - startX) * progress + index * (30 + spacing);

//           const rotation = isCircle
//             ? undefined
//             : shape.steps === 3
//             ? step * 180
//             : step * (360 / shape.steps);

//           const style = {
//             width: `${shape.width}px`,
//             height: "20px",
//             position: "absolute",
//             transformOrigin: "center center",
//             cursor: isClickable ? "pointer" : "default",
//             ...(isCircle
//               ? { opacity: 0 }
//               : {
//                   transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
//                   transition: "transform 0.5s ease-in-out",
//                 }),
//           };

//           return (
//             <img
//               key={index}
//               ref={isCircle ? circleRef : null}
//               src={shape.src}
//               alt={`shape-${index}`}
//               style={style}
//               className={`absolute ${
//                 darkMode ? "invert" : ""
//               } left-[4px] sm:left-[20px] 3xl:left-[40px] top-[0px]`}
//               onClick={() => {
//                 if (isClickable) router.push("/");
//               }}
//             />
//           );
//         })}
//       </div>

//       <div className="h-[20px] absolute top-[80px] sm:top-1/2 -translate-y-1/2 text-[10px] sm:text-[12px] 3xl:text-[14px] tracking-[3px] uppercase">
//         REQUESTED URL {pathname}
//       </div>
//     </section>
//   );
// }

// export default TopHeader;
