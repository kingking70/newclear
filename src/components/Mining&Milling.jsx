import { cycles } from "../../cycles";
import { SectionTitle } from "./SectionTitle";

export default function MiningAndMilling(props) {
    return (
        <>
            <group {...props}>
                <SectionTitle>
                    {cycles[0].name}
                </SectionTitle>
            </group>
        </>
    )
}