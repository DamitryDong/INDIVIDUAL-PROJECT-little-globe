"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScaleOpenAnimation = ({ children, duration = 3, delay = 1 }) => {
  const ref = useRef(null); // only runs once

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { scale: 5 },
      { opacity: 1, scale: 1,duration, delay, ease: "power2.out" }
    );
  }, [duration, delay]);
  

  return (
        <div ref={ref} className="w-full h-full">
            {children}
        </div>
    )
};

export default ScaleOpenAnimation;
