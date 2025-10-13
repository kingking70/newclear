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
                        This is the process where the isotopic proportion of U-235 is increased from 0.72% to 94%. 
                        If U-235 isotopic proportion remains below 20%, it is considered low enriched. Most commercial reactors use low enriched uranium (LEU) below 5% as fuel aka "reactor grade uranium". LEU does not deterioriate and can be safely stored for many years.
                        If U-235 isotopic proportion enriches beyond 20%, it is considered highly enriched. These uraniums are mostly used in naval propulsion reactors e.g. submarines, nuclear weapons, and some research reactors.    
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