import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { Grid, Stats } from '@react-three/drei';
import { Leva } from 'leva';


export default function App() {

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* <Stats /> */}
      <Leva hidden/> hidden?
      <Canvas camera={{ position: [3, 3, 3] }}>
        <Grid 
          sectionSize={3}
          sectionColor={"#b37979"}
          sectionThickness={1}
          cellSize={1}
          cellColor={"#6f6f6f"}
          cellThickness={0.6}
          infiniteGrid
          fadeDistance={50}
          fadeStrength={5}
        />
        <Experience />
      </Canvas>
    </div>
  );
}
