import React, { useEffect } from 'react';
import { useLazyQuery } from 'react-apollo';
import GET_DOCUMENT from '../../graphql/query.getDocuments.gql'
import { useCssHandles } from 'vtex.css-handles'
const CSS_HANDLES = [
  'weekRecommend_image',
  'weekRecommend_wrapperInfoRecipe',
  'weekRecommend_containerInfoRecipe',
  'weekRecommend_containerTags',
  'weekRecommend_tags',
  'weekRecommend_name',
  'weekRecommend_recipeProperty',
  'weekRecommend_recipePropertyColumn',
  'weekRecommend_recipePropertyItem',
  'weekRecommend_recipePropertyItemText',
  'weekRecommend_btnRecipes'
]

const RecipesWeekRecommended = () => {
  const handles: any = useCssHandles(CSS_HANDLES)
  const [getInfo, { data: infoRecommend, loading: userLoadingRecommend }] = useLazyQuery(GET_DOCUMENT)

  useEffect(() => {
    if (!userLoadingRecommend) return getInfo({
      variables: {
        acronym: 'RP',
        id: 'week=true',
        fields: ['name', 'image', 'tagList', 'porciones', 'time', 'ingredients', 'id', 'servings', 'skus', 'video', 'tip'],
      },
    })
  }, [infoRecommend])
  let ArrTag = []
  let ArrIng = []
  let listTags = []
  // let listIng=[]
  ArrTag = infoRecommend?.documents[0].fields[2].value.split(",")
  ArrIng = infoRecommend?.documents[0].fields[4].value.split(",")
  if (infoRecommend?.documents[0].fields.length > 0) {
    listTags = ArrTag.map((item: any) => <li className={`${handles.weekRecommend_tags}`}>{item.replace(/[^a-zA-Z ]/g, "")}</li>);
    // listIng = ArrIng.map((item:any) => <li className={`${handles.recipePage_recipeIngredientsItem}`}>{item.replace(/[^a-zA-Z ]/g, "")}</li>);
  }

  return (
    <><div>
      <div className="relative w-100 mt5">
        <div className={`${handles.weekRecommend_image}`}>
          <img width="587" height="453" src={`${infoRecommend?.documents[0].fields[1].value}`}>
          </img>
        </div>
        <div className={`absolute right-0 top-0 ${handles.weekRecommend_wrapperInfoRecipe}`}>
          <div className={`relative ${handles.weekRecommend_containerInfoRecipe}`}>
            <ul className={`${handles.weekRecommend_containerTags}`}>
              {listTags}
            </ul>
            <a href={`/recetas/page?id=${infoRecommend?.documents[0].fields[5].value}`} className={`${handles.weekRecommend_name}`}>
              {infoRecommend?.documents[0].fields[0].value}
            </a>
            <div className={`${handles.weekRecommend_recipeProperty}`}>
              <ul className={`${handles.weekRecommend_recipePropertyColumn}`}>
                <li className={`mt0 ${handles.weekRecommend_recipePropertyItem}`}>
                  <span className="">
                  </span><span className={`${handles.weekRecommend_recipePropertyItemText}`}>
                    {infoRecommend?.documents[0].fields[6].value}
                    <span className="pl2">
                      Porciones</span>
                  </span>
                </li>
                <li className={`${handles.weekRecommend_recipePropertyItem}`}>
                  <span className="font-icn ingredients">
                  </span>
                  <span className={`${handles.weekRecommend_recipePropertyItemText}`}>
                    {ArrIng?.length}
                    <span className="pl2">
                      ingredientes
                    </span>
                  </span>
                </li>
              </ul>
              <ul className={`${handles.weekRecommend_recipePropertyColumn}`}>
                <li className={`mt0 ${handles.weekRecommend_recipePropertyItem}`}>
                  <span className="font-icn time">
                  </span>
                  <span className={`${handles.weekRecommend_recipePropertyItemText}`}>
                    {infoRecommend?.documents[0].fields[3].value}'</span>
                </li>
              </ul>
            </div>
            <a href={`/recetas/page?id=${infoRecommend?.documents[0].fields[5].value}`} className={`${handles.weekRecommend_btnRecipes}`}>
              VER RECETA
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default RecipesWeekRecommended
