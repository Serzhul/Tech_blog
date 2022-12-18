import { ReactNode, FunctionComponent } from "react"
import Footer from "./Footer"
import GlobalStyle from "./GlobalStyle"
import styled from "@emotion/styled"

interface TemplateProps {
  children: ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Template: FunctionComponent<TemplateProps> = function ({ children }) {
  return (
    <Container>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  )
}

export default Template
