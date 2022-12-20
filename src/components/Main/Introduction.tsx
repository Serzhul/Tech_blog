import React, { FunctionComponent } from "react"
import styled from "@emotion/styled"
import ProfileImage from "components/Main/ProfileImage"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"

interface IntroductionProps {
  profileImage: IGatsbyImageData
}

const Background = styled.div`
  width: 100%;
  background-image: linear-gradient(60deg, #00bf8f 0%, #001510 100%);
  color: #ffffff;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const Title = styled.div`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`

const SocialIcons = styled.div`
  margin-top: 10px;
  font-size: 40px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
}) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />

        <div>
          <SubTitle>Share Thinkings</SubTitle>
          <Title>Frontend Developer Abel</Title>
        </div>
        <SocialIcons>
          <Link to="https://github.com/serzhul">
            <FontAwesomeIcon icon={faCircleUser} />
          </Link>
        </SocialIcons>
      </Wrapper>
    </Background>
  )
}

export default Introduction
