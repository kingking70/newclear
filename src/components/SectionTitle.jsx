import { Text3D, Center } from "@react-three/drei";

export const SectionTitle = ({ children, ...props }) => {
  return (
    <Center center>
      <Text3D font='/fonts/Inter_Bold.json' size={0.5} {...props}>
      {children}
        <meshStandardMaterial color="white" />
      </Text3D>
    </Center>
   
  );
};