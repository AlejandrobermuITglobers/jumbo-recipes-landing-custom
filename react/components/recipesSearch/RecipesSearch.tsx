import React, { useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import { pathOr } from 'ramda';
import { serializer } from '../../utils/serialaizer';
import GET_RECIPIES from '../../graphql/query.getDocuments.gql'
import { useCssHandles } from 'vtex.css-handles';
import ModalSearch from './ModalSearch'
import { Alert } from 'vtex.styleguide'


const CSS_HANDLES = [
  'searchRecipes_wrapperSearch',
  'searchRecipes_containerSearch',
  'searchRecipes_titleSearch',
  'searchRecipes_inputSearch',
  'searchRecipes_btnSearch',
  'searchRecipes_btnTextSearch',
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
const RecipesSearch = () => {
  const handles: any = useCssHandles(CSS_HANDLES)
  const [idSearch, setIdSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataSearch, setDataSearch] = useState([])
  const [messageError, setMessageError] = useState("")
  const [goQuery, setGoQuery] = useState(false)

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }


  const [getInfoModal] = useLazyQuery(GET_RECIPIES, {
    onCompleted(data) {
      if (data.documents.length && goQuery) {
        const result = serializer(pathOr([], ["documents"], data))
        setDataSearch(result)
        handleModal()
        setGoQuery(false)
      }

      if (!data.documents.length && goQuery) {
        setMessageError("Lo lamentamos la receta no existe")
        setTimeout(() => {
          setMessageError("")
        }, 5000);
        setGoQuery(false)
      }

    },
    fetchPolicy: "no-cache"
  })

  const handleClick = (e: any) => {
    e.preventDefault()

    setGoQuery(true)
    getInfoModal({
      variables: {
        acronym: 'RP',
        where: `name=${idSearch}*`,
        fields: ['name', 'image', 'tagList', 'porciones', 'time', 'ingredients', 'id', 'servings', 'skus', 'video', 'tip'],
      },
    }
    )

  }

  return (
    <>
      {messageError &&
        <Alert type="error">
          {messageError}
        </Alert>
      }
      {isModalOpen &&
        <ModalSearch
          modal={isModalOpen}
          closedModal={handleModal}
          data={dataSearch}
        />

      }
      <div className={`${handles.searchRecipes_wrapperSearch}`}>
        <div className={`${handles.searchRecipes_containerSearch}`}>
          <div className={`${handles.searchRecipes_titleSearch}`}>
            Tipea una comida o ingrediente
          </div>
          <input onChange={event => setIdSearch(event.target.value)} type="text" className={`${handles.searchRecipes_inputSearch}`} id="search-word-input" placeholder="Ej: Arroz, Pastel, Carne...">
          </input>
        </div>
        <div className={`${handles.searchRecipes_btnSearch}`}>
          <div className={`${handles.searchRecipes_btnSearch}`}>
            {/*<div className={`${handles.searchRecipes_btnTextSearch}`}>BUSCAR */}
            <button
              onClick={handleClick}
              className={`${handles.searchRecipes_btnTextSearch}`}>BUSCAR
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default RecipesSearch
