import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <Canvas camera={{ position: [0, 3, 3] }}>
      <mesh>
        <sphereGeometry />
        <meshNormalMaterial />
      </mesh>
    </Canvas>
  );
}

export default App;
