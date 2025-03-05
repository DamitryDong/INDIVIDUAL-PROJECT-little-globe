'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger separately

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerRiseEffect({ children, }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const effect = gsap.context(() => {
      gsap.fromTo(
        containerRef.current.children, 
        { opacity: 0, x: 30, clipPath: "inset(0% 100% 100% 0%)" },  // Start from below and hidden
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2, 
          ease: 'power3.out', 
          stagger: 1, 
          delay: 0, 
          clipPath: "inset(0% 0% 0% 0%)",
          scrollTrigger: { 
            trigger: containerRef.current,
            start: "top+=80% bottom",  // Starts when the top of the element is 50% from the top of the viewport
            end: "bottom-=60% top",    // Ends when the bottom of the element is 50% from the top of the viewport          
            scrub: true,          // Makes the animation scrub with scroll
            markers: true,        // Add markers to debug
          }
        }
      );
    });
    
    return () => effect.revert();
  }, []); // Only run once, no need for `trigger`

  return <div ref={containerRef}>{children}</div>;
}
