import { FunctionComponent, PropsWithChildren } from "react"

const Container: FunctionComponent = (props: PropsWithChildren) => {
  return <div>{props.children}</div>
}

export default Container
