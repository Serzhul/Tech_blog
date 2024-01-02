import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import {
  ColorCategoryMapKey,
  colors,
  COLOR_CATEGORY_MAP,
} from "../../static/theme"

interface CategoryItemProps {
  active: boolean
  name: string
}

interface GatsbyLinkProps extends CategoryItemProps {
  children: ReactNode
  className?: string
  to: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryItem = styled(({ name, active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))`
  margin-right: 20px;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "800" : "400")};
  cursor: pointer;

  position: relative;
  display: flex;
  cursor: pointer;
  outline: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 600;
  color: ${colors.GRAY.gray8};
  text-transform: uppercase;
  padding: 10px;
  background: ${props =>
    COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].boxShadow[1]};
  border: 2px solid
    ${props => COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].border};
  border-radius: 12px;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props =>
      COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].background};
    border: 1px solid
      ${props => COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].border};
    border-radius: inherit;
    box-shadow: 0 0 0 1px
        ${props =>
          COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].boxShadow[0]},
      0 0.625em 0 0
        ${props =>
          COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].boxShadow[1]};
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:hover {
    background: ${props =>
      COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].boxShadow[1]};
    transform: translate(0, 0.25em);
    &::before {
      box-shadow: 0 0 0 1px
          ${props =>
            COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].boxShadow[0]},
        0 0.5em 0 0
          ${props =>
            COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].boxShadow[1]};
      transform: translate3d(0, 0.5em, -1em);
    }
  }

  &:active {
    background: ${props =>
      COLOR_CATEGORY_MAP[props.name as ColorCategoryMapKey].background};
    transform: translate(0em, 0.75em);

    &::before {
      box-shadow: 0 0 0 1px ${colors.TEAL.teal2}, 0 0 ${colors.TEAL.teal1};
      transform: translate3d(0, 0, -1em);
    }
  }

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 20px;
  }

  @media (max-width: 540px) {
    font-size: 15px;
    margin-bottom: 20px;
  }
`
export default CategoryItem
