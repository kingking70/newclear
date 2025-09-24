import { cycles } from "../../cycles";
import { SectionTitle } from "./SectionTitle";

export default function Conversion(props) {
    return (
        <>
            <group {...props}>
                <SectionTitle>
                    {cycles[1].name}
                </SectionTitle>
            </group>
             
        </>
    )
}