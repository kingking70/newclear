import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import NuclearExplained from './nuclear/NuclearExplained';

export default function App() {
  return (
    <>
      {/* 3D backdrop — fixed behind the editorial overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 42 }}>
          <color attach="background" args={["#0D1318"]} />
          <Experience />
        </Canvas>
      </div>

      {/* Editorial overlay — scrolls natively */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <NuclearExplained />
      </div>
    </>
  );
}
