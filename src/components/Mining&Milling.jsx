import { Float, Html, Text } from "@react-three/drei";
import { cycles } from "../../cycles";
import Uranium from "./models/Uranium";
import { SectionTitle } from "./SectionTitle";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Egg from "./models/Egg";

export default function MiningAndMilling(props) {

    const UraniumRef = useRef();
    const EggRef = useRef();
    // const TextSource1Ref = useRef()

    useFrame((state, delta) => {

        // Uranium
        if (!UraniumRef.current) return;
        UraniumRef.current.rotation.z += 0.3 * delta
        UraniumRef.current.rotation.y += 0.2 * delta

        // Egg
        if (!EggRef.current) return;
        EggRef.current.rotation.x -= 0.4 * delta
        EggRef.current.rotation.y += 0.2 * delta
    })

    // const source1Click = () => {
    //     window.open("https://www.iaea.org/newscenter/news/what-is-uranium", "_blank")
    // }

    return (
        <>
            <group {...props}>
                <SectionTitle position-x={2}>
                    {cycles[0].name}
                </SectionTitle>
                
                <group ref={UraniumRef}>
                    <Float >
                        <Uranium scale={0.2} color="#ffd60a" position={[-2, 0, 1]}/>
                    </Float>
                </group>

                <group ref={EggRef}>
                    <Float>
                        <Egg scale={0.4} position={[1, -0.5, -2]}/>
                    </Float>
                </group>


                <group scale={0.2} >
                    <Text position-z={5}>
                        An chicken egg sized uranium can provide as much electricity as 88 tonnes of coal!!
                        <meshStandardMaterial color={"black"}/>
                    </Text>
                    <Text position={[-1, -1, 7]}>
                        An chicken egg sized uranium can provide as much electricity as 88 tonnes of coal!!
                        <meshStandardMaterial color={"black"}/>
                    </Text>
                </group>

                { /*
                
                <group scale={0.05} position-z={5}>
                    <Text ref={TextSource1Ref} onClick={source1Click}>
                        An chicken egg sized uranium can provide as much electricity as 88 tonnes of coal!!  
                        <meshStandardMaterial color={"black"}/>
                    </Text>
                
                </group>

                */}
                
            
            </group>
            
        </>
    )
}