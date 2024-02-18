// Logo.js
import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';

const Logo = () => {
  const texture = useTexture('/logo.png');

  return (
    <mesh position={[-7, 3.3, -15]} > 
      <planeGeometry args={[.8, .8,4]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export default Logo;
