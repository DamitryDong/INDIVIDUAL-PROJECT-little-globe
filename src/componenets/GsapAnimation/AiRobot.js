import { useEffect, useRef } from "react";
import gsap from "gsap";

const WobbleEffect = ({ children }) => {
  const wobbleRef = useRef(null);

  useEffect(() => {
    gsap.set(wobbleRef.current, { rotation: -20 }); // Start at -20 degrees

    gsap.to(wobbleRef.current, {
      rotation: 3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      onRepeat: () => {
        // Quick jump effect at the end of rotation, we leave it inside so we can repeat it
        gsap.to(wobbleRef.current, {
          y: -15, 
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });
      },
    });
  }, []);

  return <div ref={wobbleRef}>{children}</div>;
};

export default WobbleEffect;
