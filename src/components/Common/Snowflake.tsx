import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "@emotion/styled"

interface SnowflakeProps {
  delay: number
  opacity: number
  position: number
  duration: number
}

const MIN_DURATION = 10

const Snow = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  animation: fall ${(props: SnowflakeProps) => props.duration}s linear;
  z-index: 1000;
  top: -8px;
  position: absolute;
  left: ${(props: SnowflakeProps) => props.position}px;
  animation-delay: ${(props: SnowflakeProps) => props.delay}s;
  opacity: ${(props: SnowflakeProps) => props.opacity};

  @keyframes fall {
    from {
    }

    to {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
`

const Snowflake: FunctionComponent = function () {
  const [position, setPosition] = useState<number>(0)
  const delay = Math.random() * 10
  const initialOpacity = Math.random()

  const duration = Math.random() * 20 + MIN_DURATION

  useEffect(() => {
    setPosition(Math.random() * window.screen.width)
  }, [])

  return (
    <Snow
      delay={delay}
      opacity={initialOpacity}
      position={position}
      duration={duration}
    />
  )
}

export default Snowflake
