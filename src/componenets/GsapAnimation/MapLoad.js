"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FadeIn = ({ children, duration = 2, delay = 0 }) => {
  const ref = useRef(null); //set the current reference location without having to give it a name

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, filter: "blur(10px)" },
      { opacity: 1, filter: "blur(0px)", duration, delay, ease: "power2.out" }
    );
  }, [duration, delay]);
  

  return (
        <div ref={ref} className="w-full h-full">
            {children}
        </div>
    )
};

export default FadeIn;
