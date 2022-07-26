import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'recommend_recipeItem',
]

type PropsImage = {
  image: string
  alt: string
}
const Images = (
  {
    image,
    alt
  }: PropsImage

) => {

  const handles: any = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.recommend_recipeItem}`}>
      <img width="330" height="255" src={image} alt={alt} />
    </div>
  )
}

export default Images
