import React, { FunctionComponent, ReactNode } from "react"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ColorBadgeMapKey, colors, COLOR_BADGE_MAP } from "../../static/theme"
import { Link } from "gatsby"

export type PostHeadInfoProps = {
  title: string
  date: string
  categories: string[]
}

interface PostCategoryProps {
  category: string
}

interface PostCategoryLinkProps {
  children: ReactNode
  className?: string
  to: string
}

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 0;
  color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`

const PrevPageIcon = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${colors.TEAL.teal4};
  border-radius: 6px;
  color: ${colors.TEAL.teal4};
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;

  :hover {
    background: ${colors.TEAL.teal4};
    color: #ffff;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 45px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`

const PostData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: 15px;
    font-weight: 400;
  }
`

const PostCategoryListWrapper = styled.div`
  display: flex;
  margin-right: 15px;
`

const PostCategory = styled(({ ...props }: PostCategoryLinkProps) => (
  <Link {...props} />
))`
  border: 1px solid
    ${(props: PostCategoryProps) =>
      COLOR_BADGE_MAP[props.category as ColorBadgeMapKey]};
  border-radius: 8px;
  padding: 5px 10px;
  margin-right: 15px;
  color: ${(props: PostCategoryProps) =>
    COLOR_BADGE_MAP[props.category as ColorBadgeMapKey]};
  transition: background 0.3s ease;

  :hover {
    background: ${(props: PostCategoryProps) =>
      COLOR_BADGE_MAP[props.category as ColorBadgeMapKey]};
    color: #ffff;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`

const PostDate = styled.div`
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  categories,
}) {
  const goBackPage = () => window.history.back()

  return (
    <PostHeadInfoWrapper>
      <PrevPageIcon onClick={goBackPage}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </PrevPageIcon>
      <Title>{title}</Title>
      <PostData>
        <PostCategoryListWrapper>
          {categories.map(category => (
            <PostCategory
              key={category}
              category={category}
              to={`/?category=${category}`}
            >
              {category}
            </PostCategory>
          ))}
        </PostCategoryListWrapper>
        <PostDate>{date}</PostDate>
      </PostData>
    </PostHeadInfoWrapper>
  )
}

export default PostHeadInfo
