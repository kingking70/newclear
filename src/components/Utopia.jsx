import { SectionTitle } from "./SectionTitle";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { City } from "./models/City";

export default function Utopia(props) {

    const CityRef = useRef();

    useFrame((state, delta) => {

        // Uranium
        if (!CityRef.current) return;
        // CityRef.current.rotation.z += 0.3 * delta
        // CityRef.current.rotation.y += 0.2 * delta


    })

    // <mesh position={[3, -1, -2]}>
    //                         <boxGeometry args={[10, 0.1, 10]} />
    //                         <meshStandardMaterial color="#62bf24" />
    //                     </mesh>

    return (
        <>
            <group {...props}>
                
                <SectionTitle>Utopia</SectionTitle>

                <group ref={CityRef}>
                    <Float>
                        <City scale={5} position={[0, -2, 0]}/>
                    </Float>
                </group>

                
            </group>
        </>
    )
}