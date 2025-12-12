import { cycles } from "../../cycles";
import { SectionTitle } from "./SectionTitle";
import { Text } from "@react-three/drei";

export default function Enrichment(props) {
    return (
        <>
            <group {...props}>
                <SectionTitle>
                    {cycles[2].name}
                </SectionTitle>
            

                <group scale={0.2}>
                    { /* to check how to make maxWidth responsive */}
                    <Text position={[-1, 15, 2]} maxWidth={20}>
                         
                        <meshStandardMaterial color={"black"}/>
                    </Text>
                    <Text position={[-1, 17, 2]} maxWidth={23}>
                    
                        <meshStandardMaterial color={"black"}/>
                    </Text>
                </group>
            </group>
        </>
    )
}