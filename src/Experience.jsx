
import { Environment, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { SectionTitle } from "./components/SectionTitle";
import MiningAndMilling from "./components/Miningandmilling";
import Conversion from "./components/Conversion";
import Enrichment from "./components/Enrichment";
import FuelFabrication from "./components/FuelFabrication";
import PowerPlant from "./components/PowerPlant";
import FuelStorage from "./components/FuelStorage";
import WasteDisposal from "./components/WasteDisposal";

export default function Experience() {
    
    const processesContainer = useRef();

    const SECTIONS_DISTANCE = 15;
    const scrollData = useScroll();

    useFrame(() => {
        processesContainer.current.position.z =
          -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);
    });

    return (
        <>

            { /* <WaterParticles /> */ }        
            
            <Environment preset="sunset"/>
        
            <group ref={processesContainer}>
                <group>
                    <MiningAndMilling/>
                </group>
                
                <group position-z={1 * SECTIONS_DISTANCE}>
                    <Conversion/>
                </group>

                <group position-z={2 * SECTIONS_DISTANCE}>
                    <Enrichment/>
                </group>

                <group position-z={3 * SECTIONS_DISTANCE}>
                    <FuelFabrication/>
                </group>

                <group position-z={4 * SECTIONS_DISTANCE}>
                    <PowerPlant/>
                </group>

                <group position-z={5 * SECTIONS_DISTANCE}>
                    <FuelStorage/>
                </group>

                <group position-z={6 * SECTIONS_DISTANCE}>
                    <WasteDisposal/>
                </group>
            </group>
            
        
            
            
        </>
    )
}
