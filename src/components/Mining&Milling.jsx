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


                <group scale={0.2}>
                    { /* to check how to make maxWidth responsive */}
                    <Text position={[-1, 15, 2]} maxWidth={20}>
                        A chicken egg sized uranium fuel can provide as much electricity as 88 tonnes of coal!!
                        according to the International Atomic Energy Agency (IAEA) but apparently i'm blocked idky, forbidden 403 when i try entering the website in singapore. so i'll be referencing most of my information from the book, rad future by isabelle boemeke. uranium mining is now, oct 2025, one of the safest and most tightly regualated in the world. according to hannah ritchie, data scientist and researcher, the amount of mining needed for clean energy for the whole world is 500 to 1000 times less than the current amount we are mining for fossil fuels. the Breakthrough institute reports, '1 gigawatt-hour of electricity with nuclear requires 30% of the rocks and metals needed for solar and just 23% for onshore winds'. more than 50% of uranium mining uses insitu recovery, a process which skips the need for open pits or tunnels. a liquid, made of water, oxygen, hyroden peroxide, and either soduium carbonate or carbon dioxide, is injected into the ground to dissolve uranium which is then pumped to the surface. what happens after?   
                        <meshStandardMaterial color={"black"}/>
                    </Text>
                    <Text position={[-1, 17, 2]} maxWidth={23}>
                       
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