import { SectionTitle } from "./SectionTitle";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function Utopia(props) {

    const CityRef = useRef();

    useFrame((state, delta) => {

        // Uranium
        if (!CityRef.current) return;
        // CityRef.current.rotation.z += 0.3 * delta
        CityRef.current.rotation.y += 0.2 * delta


    })

    return (
        <>
            <group {...props}>
                
                <SectionTitle>Utopia</SectionTitle>

                <group ref={CityRef}>
                    <Float>
                        <mesh position={[3, 0.5, -2]}>
                            <boxGeometry args={[0.2, 10, 10]} />
                            <meshStandardMaterial color="#62bf24" />
                        </mesh>
                    </Float>
                </group>

                
            </group>
        </>
    )
}