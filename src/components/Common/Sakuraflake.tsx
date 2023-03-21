import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "@emotion/styled"

interface SakuraflakeProps {
  delay: number
  opacity: number
  position: number
  duration: number
}

const MIN_DURATION = 10

const Sakura = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 5% 80% 10% 80%;
  background-color: #ffb6c1;
  animation: sakura-anim-1 10s 0s linear infinite;
  z-index: 1000;
  top: -8px;
  position: absolute;
  left: ${(props: SakuraflakeProps) => props.position}px;
  animation-delay: ${(props: SakuraflakeProps) => props.delay}s;
  opacity: ${(props: SakuraflakeProps) => props.opacity};

  @keyframes sakura-anim-1 {
    0% {
      top: -10%;
      transform: translateX(0) rotateX(0) rotateY(0);
    }

    100% {
      top: 100%;
      transform: translateX(15vw) rotateX(180deg) rotateY(360deg);
    }
  }
`

const Sakuraflake: FunctionComponent = function () {
  const [position, setPosition] = useState<number>(0)
  const delay = Math.random() * 10
  const initialOpacity = Math.random()

  const duration = Math.random() * 20 + MIN_DURATION

  useEffect(() => {
    setPosition(Math.random() * window.screen.width)
  }, [])

  return (
    <Sakura
      delay={delay}
      opacity={initialOpacity}
      position={position}
      duration={duration}
    />
  )
}

export default Sakuraflake
