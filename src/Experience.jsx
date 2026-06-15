import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export default function Experience() {
  const processesContainer = useRef();
  const scrollProgress = useRef(0);

  const SECTIONS_DISTANCE = 15;
  const SECTION_COUNT = 8;

  useEffect(() => {
    const onScroll = () => {
      const doc = document.scrollingElement || document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? doc.scrollTop / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    if (processesContainer.current) {
      processesContainer.current.position.z =
        -scrollProgress.current * SECTIONS_DISTANCE * (SECTION_COUNT - 1);
    }
  });

  return (
    <>
      <Environment preset="sunset" />

      <group ref={processesContainer}>
        <group>
          {/* dystopia */}
        </group>

        <group position-z={1 * SECTIONS_DISTANCE}>
          {/* debunk myths */}
        </group>

        <group position-z={2 * SECTIONS_DISTANCE}>
          {/* why singapore? */}
        </group>

        <group position-z={3 * SECTIONS_DISTANCE}>
          {/* what is nuclear and nuclear energy? */}
        </group>

        <group position-z={4 * SECTIONS_DISTANCE}>
          {/* radiation */}
        </group>

        <group position-z={5 * SECTIONS_DISTANCE}>
          {/* how does nuclear energy compare with other energy sources? */}
        </group>

        <group position-z={6 * SECTIONS_DISTANCE}>
          {/* waste management */}
        </group>

        <group position-z={7 * SECTIONS_DISTANCE}>
          {/* location and land etc. */}
        </group>

        <group position-z={8 * SECTIONS_DISTANCE}>
          {/* learn more */}
        </group>
      </group>
    </>
  );
}
