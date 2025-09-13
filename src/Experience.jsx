import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";


export default function Experience() {
    
    const { position, color, opacity, transparent, wireframe } = useControls({
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        color: "#ff0000",
        opacity: {
            value: 0.5,
            min: 0,
            max: 1,
            step: 0.01,
        },
        transparent: true,
        wireframe: false
      });
    
    return <>

        // controls
        <OrbitControls />

        // lights
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 3]} intensity={1} />
        <directionalLight position={[0, 3, 3]} intensity={0.5} />

        // meshes
        <group>
        <mesh position={[position.x, position.y, position.z]}>
                <sphereGeometry />
                <meshStandardMaterial 
                    color={color}
                    transparent={transparent}
                    opacity={opacity}
                    wireframe={wireframe}
                />
            </mesh>
            
            <mesh position={[position.x+1.5, position.y, position.z]} scale={0.5}>
                <sphereGeometry/>
                <meshStandardMaterial
                    color={"red"}
                    transparent={transparent}
                    opacity={opacity}
                    wireframe={wireframe}
                />
            </mesh>

            <mesh position={[position.x-1.5, position.y, position.z]} scale={0.5}>
                <sphereGeometry/>
                <meshStandardMaterial
                    color={"red"}
                    transparent={transparent}
                    opacity={opacity}
                    wireframe={wireframe}
                />
            </mesh>
        </group>
        
        
    </>
}