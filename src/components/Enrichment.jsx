import { cycles } from "../../cycles";
import { SectionTitle } from "./SectionTitle";

export default function Enrichment(props) {
    return (
        <>
            <group {...props}>
                <SectionTitle>
                    {cycles[2].name}
                </SectionTitle>
            </group>
        </>
    )
}