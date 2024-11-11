"use client";

import { USAMap, USAStateAbbreviation } from "@mirawision/usa-map-react";
import { useState, useEffect } from "react";

export default function USA() {
  const [hover, setHover] = useState("");

  function handleHover(ab: string) {
    setHover(ab)
  }

  return (
    <>
      <StateHover text={hover} />
      <USAMap
        defaultState={{
          fill: "#ffffff",
          stroke: "#000000",
          onClick: handleHover,
          onHover: handleHover,
        }}
        className="text-white"
        mapSettings={{ hideStates: [""] }}
      />
    </>
  );
}

interface CursorFollowerProps {
  text: string
}
function StateHover({ text }: CursorFollowerProps) {
  if (text === "") {
    return null
  }

  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updatePosition)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div 
        className="absolute bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm shadow-md transition-all duration-100 ease-out"
        style={{
          left: `${position.x + 10}px`,
          top: `${position.y + 10}px`,
        }}
        aria-hidden="true"
      >
        {text}
      </div>
    </div>
  )
}
