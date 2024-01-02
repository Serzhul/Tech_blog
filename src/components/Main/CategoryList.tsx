import React, { FunctionComponent } from "react"
import styled from "@emotion/styled"
import CategoryItem from "./CategoryItem"

export interface CategoryListProps {
  selectedCategory: string
  categoryList: {
    [key: string]: number
  }
}

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 75px auto 0;

  @media (max-width: 768px) {
    margin-top: 50px;
    padding: 0 20px;
  }

  @media (max-width: 484px) {
    width: 500px;
    margin-top: 50px;
    padding: 0 20px;
  }
`

const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/?category=${name}`}
          active={name === selectedCategory}
          name={name}
          key={name}
        >
          {name}({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  )
}

export default CategoryList
