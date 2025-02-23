import React, { useState, useEffect } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import state from '../store';



const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/voicevision/design/shirt_baked.glb');
  
  const logoTexture = useTexture(snap.logoDecal || '');
  const fullTexture = useTexture(snap.fullDecal || '');

  if (!logoTexture) return null;
  
  

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString} position={[-0.31, 0, 0]}>
       
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.01, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
            >
              <meshStandardMaterial
              map={logoTexture}
              color={snap.logoColor} // Apply color overlay
              transparent={true}
              map-anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
            </Decal>
            
          
        )}

        <Text  
          position={[0, 0.12, 0.12]} 
          scale={[0.03, 0.03, 0.01]}
          anchorX="center" 
          anchorY="middle" 
          color={snap.textColor || "black"}
          fontSize={0.6}
          font={snap.font || "/voicevision/design/default.otf"}
        >
          {snap.text}
        </Text>
      
      </mesh>
    </group>
  );
};

export default Shirt;
