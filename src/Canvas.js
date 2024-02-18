import { useRef,useEffect,useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center,OrbitControls  } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './store'
import Logo from './Logo'


export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (

  <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
      <Logo/>

    <ambientLight intensity={0.5} />
    <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
    <CameraRig>
      <Backdrop />
      {/* <OrbitControls /> */}
      <Center>
        <Shirt />
      </Center>
    </CameraRig>
  </Canvas>

)

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

function Shirt(props) {
  const snap = useSnapshot(state)

  var [de_x,setde_x] = useState(state.decalX)
  var [de_y,setde_y] = useState(state.decalY)
  var [de_z,setde_z] = useState(state.decalZ)
  var [scale,setscale] = useState(state.scale)


  const dynamicDecalPosition = [de_x, de_y, de_z];
  useEffect(() => {
    const handleKeyDown = (event) => {
      const step = 0.01; // Adjust the step size based on your preference
      console.log("key pressed")
      console.log(state.decalX)
      console.log(state.decalY)
      console.log(state.decalY)

      switch (event.key) {
        case 'ArrowUp':
          setde_y(de_y += step)
          break;
        case 'ArrowDown':
          setde_y(de_y -= step)

          break;
        case 'ArrowLeft':
          setde_x(de_x -= step)

          break;
        case 'ArrowRight':
          setde_x(de_x += step)

          break;
        default:
          // Do nothing for other keys
          break;
      }
    };  
     window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  // useFrame((state, delta) => {
  //   // Update the decal position based on dynamic state values
  //   easing.dampC(decalPosition, [state.decalX, state.decalY, state.decalZ], 0.25, delta);
  // });

  let texture;
  // const texture = useTexture(`/${snap.decal}.png`)
  if (snap.decal && snap.decal.startsWith('blob')) {
    // If state.decal is a URL, use it directly
    console.log(snap.decal)

    texture = useTexture(snap.decal);
  } else {
    // If state.decal is a filename, load it from the public folder
    // console.log(snap.decal)
    texture = useTexture(`/${snap.decal}.png`);
  }
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))

  return (
    
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
      <Decal position={dynamicDecalPosition} rotation={[0, 0, 0]} scale={scale} map={texture} map-anisotropy={16} />
    </mesh>
  );
}

useGLTF.preload('/shirt_baked_collapsed.glb')
;['/react.png', '/three2.png', '/pmndrs.png','/veg.png'].forEach(useTexture.preload)
