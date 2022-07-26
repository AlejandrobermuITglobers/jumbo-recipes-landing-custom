import React, { useEffect } from 'react';
import { useLazyQuery } from 'react-apollo';
import GETDOCUMENT from '../../graphql/query.getDocuments.gql'
import { useCssHandles } from 'vtex.css-handles'
import { pathOr } from 'ramda';
import { serializer } from '../../utils/serialaizer';
import Images from '../globals/Images'
import { Link }
  from 'vtex.render-runtime';


const CSS_HANDLES = [
  'recommend_container',
  'recommend_containerInfoCard',
  'recommend_recipeItem',
  'recommend_wrapperItem',
  'recommend_containerItem',
  'weekRecommend_containerTags',
  'weekRecommend_tags',
  'weekRecommend_name',
  'weekRecommend_recipeProperty',
  'weekRecommend_recipePropertyColumn',
  'weekRecommend_recipePropertyItem',
  'weekRecommend_recipePropertyItemText',
  'weekRecommend_btnRecipes'
]

const RecipesRecommended = () => {
  const handles: any = useCssHandles(CSS_HANDLES)
  const [getInfo, { data: infoRecommend, loading: userLoadingRecommend }] = useLazyQuery(GETDOCUMENT)

  useEffect(() => {
    if (!userLoadingRecommend) return getInfo({
      variables: {
        acronym: 'RP',
        where: 'isRecommended=true',
        fields: ['name', 'image', 'tagList', 'porciones', 'time', 'ingredients', 'id', 'servings', 'skus', 'video', 'tip'],
      },
    })
  }, [infoRecommend])
  const dataShow = serializer(pathOr([], ["documents"], infoRecommend))

  return (

    <div className={`${handles.recommend_container}`}>
      {dataShow.map((element: any) => (
        <div key={element.id} className={`${handles.recommend_containerInfoCard}`}>
          <Images image={element.image} alt={element.name} />
          <div className={`${handles.recommend_wrapperItem}`}>
            <div className={`${handles.recommend_containerItem}`}>
              <ul className={`${handles.weekRecommend_containerTags}`}>
                {
                  JSON.parse(element.tagList).map((tag: any) => (
                    <li className={`${handles.weekRecommend_tags}`}>{tag}</li>
                  ))
                }
              </ul>
              <Link
                className={`${handles.weekRecommend_name}`}
                to={`/recetas/page?id=${element.id}`}
              >
                {element.name}
              </Link>
              <div className={`${handles.weekRecommend_recipeProperty}`}>
                <ul className={`${handles.weekRecommend_recipePropertyColumn}`}>
                  <li className={`mt0 ${handles.weekRecommend_recipePropertyItem}`}>
                    <span className={`${handles.weekRecommend_recipePropertyItemText}`}>
                      {element.servings} {" "}  Porciones
                      <span className="desktop">

                      </span>
                    </span>
                  </li>
                  <li className={`mt0 ${handles.weekRecommend_recipePropertyItem}`}>
                    <span className="font-icn ingredients">
                    </span>
                    <span className={`${handles.weekRecommend_recipePropertyItemText}`}>
                      <span className="desktop">
                        {JSON.parse(element.ingredients).length}  {" "}  ingredientes
                      </span>
                    </span>
                  </li>
                </ul>
                <ul className={`${handles.weekRecommend_recipePropertyColumn}`}>
                  <li className={`mt0 ${handles.weekRecommend_recipePropertyItem}`}>
                    <span className={`${handles.weekRecommend_recipePropertyItemText}`}>
                      {element.time}'
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              className={`${handles.weekRecommend_btnRecipes}`}
              to={`/recetas/page?id=${element.id}`}
            >
              VER RECETA
            </Link>
          </div>
        </div>
      ))
      }
    </div>
  )
}
export default RecipesRecommended
