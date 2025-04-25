'use client'
import React, { useRef, useState,useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

import { PerspectiveCamera } from '@react-three/drei'


function Box(props) {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    meshRef.current.rotation.z += delta
    meshRef.current.rotation.y += delta

  })
  return (
    <PerspectiveCamera position={[0,0,0]}>

    <mesh
      {...props}
        ref={meshRef}
        scale={.1}
        wireframe={true} 
      >
      <boxGeometry args={[props.boxWidth,props.boxHeight, props.boxLength]}/>
      <meshStandardMaterial color={'#e59a1a'} height={props.height} width={props.width}/>
    </mesh>
    </PerspectiveCamera>

  )
}

export default function Home() {
  const [height,setHeight] = useState(100)
  const [width,setWidth] = useState(100)
  const [boxWidth,setBoxWidth] = useState(10)
  const [boxHeight,setBoxHeight] = useState(10)
  const [boxLength,setBoxLength] = useState(10)

  useEffect(()=>{
    if (typeof window !== "undefined" ){
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
      window.addEventListener('resize',()=>{
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
      })
    } 

  },[])

  const handleBoxHeightChange = (e)=>{
    if(boxHeight === 10) return
    setBoxHeight(e.target.value)
  }

  const handleBoxWidthChange = (e)=>{
    if(boxWidth === 10) return
    setBoxWidth(e.target.value)
  }

  const handleBoxLengthChange = (e)=>{
    if(boxLength === 10) return
    setBoxLength(e.target.value)
  }

  const increaseBoxHeight = ()=>{
    if(boxHeight === 15) return 
    setBoxHeight(boxHeight => boxHeight += 1)
  }
  const decreaseBoxHeight = ()=>{
    if(boxHeight === 10 ) return 
    setBoxHeight(boxHeight => boxHeight -= 1)
  }

  const increaseBoxWidth = ()=>{
    if(boxWidth === 15 ) return 
    setBoxWidth(boxWidth => boxWidth += 1)
  }
  const decreaseBoxWidth = ()=>{
    if(boxWidth === 10 ) return 
    setBoxWidth(boxWidth => boxWidth -= 1)
  }

  const increaseBoxLength = ()=>{
    if(boxLength === 15 ) return 
    setBoxLength(boxLength => boxLength += 1)
  }
  const decreaseBoxLength = ()=>{
    if(boxLength === 10 ) return 
    setBoxLength(boxLength => boxLength -= 1)
  }
  
  return (
    <div className="grid grid-cols-[60%_40%] ">
      <div className="min-h-screen">
      <Canvas className="bg-black" width={width} height={height}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI/4} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/2} />
        <Box position={[0, 0, 0]} boxHeight={boxHeight} boxWidth={boxWidth} boxLength={boxLength}/>
      </Canvas>
      </div>
      <div className="p-10">
        <div className="flex flex-col">
        <span className="text-5xl font-bold">Design. Customize.<br/>Experience.</span>
        <div className="flex justify-around w-full my-5">
          <div className="flex items-center width-[20%] p-[5px]"><span className="p-[1px]">Length : {boxLength} </span><input type="number" min="10" max="15" value={boxLength} onChange={handleBoxLengthChange}/> <span onClick={decreaseBoxLength} className="p-1 bg-stone-400 cursor-pointer">-</span> <span onClick={increaseBoxLength} className="p-1 bg-stone-400 cursor-pointer">+</span></div>
        
          <div className="flex items-center width-[20%] p-[5px]"><span className="p-[1px]">Width : {boxWidth} </span><input type="number" min="10" max="15" value={boxWidth} onChange={handleBoxWidthChange}/> <span onClick={decreaseBoxWidth} className="p-1 bg-stone-400 cursor-pointer">-</span> <span onClick={increaseBoxWidth} className="p-1 bg-stone-400 cursor-pointer">+</span></div>
        
          <div className="flex items-center width-[20%] p-[5px]"><span className="p-[1px]">Height : {boxHeight} </span><input type="number" min="10" max="15" value={boxHeight} onChange={handleBoxHeightChange}/> <span className="p-[5px] bg-stone-400 cursor-pointer" onClick={decreaseBoxHeight}>-</span> <span className="p-1 bg-stone-400 cursor-pointer" onClick={increaseBoxHeight}>+</span></div>
        
        </div>

        </div>
      </div>
    </div>
  );
}
