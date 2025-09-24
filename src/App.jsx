import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { Grid, Scroll, ScrollControls, Stats } from '@react-three/drei';
import { Leva } from 'leva';
import { cycles } from '../cycles';



export default function App() {
    
  // stages
  // 1) mining & milling
  // 2) conversion
  // 3) enrichment
  // 4) fuel fabrication
  // 5) power plant
  // 6) fuel storage
  // 7) waste disposal
  // 0) recycling
  // stages = ScrollControls pages

  
  return (
    <>
      <Leva />
      <Stats />
      <Canvas camera={{ position: [0, 0.5, 5], fov: 42 }}>

        <color attach="background" args={["#f5f3ee"]} />
        <fog attach="fog" args={["#f5f3ee", 10, 50]} />
        
        { /* <Grid
          sectionSize={3}
          sectionColor={"#b37979"}
          sectionThickness={1}
          cellSize={1}
          cellColor={"#6f6f6f"}
          cellThickness={0.6}
          infiniteGrid
          fadeDistance={50}
          fadeStrength={5}
        /> */ }

        <ScrollControls pages={cycles.length} damping={0.1} maxSpeed={0.2}>
          <group position-y={-0.5}>
            <Experience />
          </group>  
        </ScrollControls> 
        
            
        
      </Canvas>
    </>
  )
}