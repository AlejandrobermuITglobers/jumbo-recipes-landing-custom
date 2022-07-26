import React, { useEffect } from 'react';
import { useCssHandles } from 'vtex.css-handles'
import { useLazyQuery, useMutation } from 'react-apollo'
import GET_DOCUMENT from '../../graphql/query.getDocuments2.gql'
import GET_PRODUCT from '../../graphql/query.getProductInfo.gql'
import UPDATE_CART from '../../graphql/updateCart.graphql'

const CSS_HANDLES = [
  'recipePage_Container',
  'recipePage_rowContainer',
  'recipePage_rowContainerCol',
  'recipePage_wrapperTag',
  'recipePage_titleTag',
  'recipePage_Tag',
  'recipePage_recipeTitle',
  'recipePage_recipePropertysContainer',
  'recipePage_recipePropertysText',
  'recipePage_recipeIngredientsWrapper',
  'recipePage_recipeIngredientsTitle',
  'recipePage_recipeIngredientsMain',
  'recipePage_recipeIngredientsItem',
  'recipePage_recipeDescrition',
  'recipePage_styleSubtitle',
  'recipePage_Subtitle',
  'recipePage_recipeDescritionMain',
  'recipePage_recipeDescritionMainVideo',
  'recipePage_recipeDescritionMainText',
  'recipePage_recipeDescritionWrapperTip',
  'recipePage_recipeDescritionContainerTip',
  'recipePage_recipeDescritionContainerIconTip',
  'recipePage_recipeDescritionTitleTip',
  'recipePage_recipeDescritionTextTip',
  'recipePage_minicartWrapper',
  'recipePage_minicartProductGroupItem',
  'recipePage_minicartImageContainer',
  'recipePage_minicartInfoContainer',
  'recipePage_minicartInfoProductName',
  'recipePage_minicartInfoProductBrand',
  'recipePage_minicartInfoProductPriceContainer',
  'recipePage_minicartInfoProductPrice',
  'recipePage_minicartInfoProductPriceValue',
  'recipePage_minicartActionWrapper',
  'recipePage_minicartTotalQuantity',
  'recipePage_minicartTotalPrice',
  'recipePage_minicartActionBtn',
  'recipePage_minicartActionBtnText'
]
const RecipesPages=()=> {
const handles: any = useCssHandles(CSS_HANDLES)
const [getInfo, {data:infoRecommend, loading: userLoadingRecommend}] =useLazyQuery(GET_DOCUMENT)
const [getProduct, {data:infoProduct, loading: userLoadingProduct}] =useLazyQuery(GET_PRODUCT,{
  onCompleted(data){
    console.log ("esta es la data recomendada producto", data)
  },
  onError(error){
    console.log ("esta es la data recomendada producto", error)
  }
})
const [addToCart] = useMutation(UPDATE_CART,{
  onCompleted(data){
    console.log("esta es la data de la mutacion", data)
  },
  onError(error){
    console.log("esta es la data del error de la mutation", error)
  }
})

const idSearch =window.location?.search.replace('?id=','');

useEffect(() => {
  if (!userLoadingRecommend) return getInfo({

    variables: {
      acronym: 'RP',
      id: `${idSearch}`,
      fields: ['name','image', 'tagList', 'porciones', 'time','ingredients', 'id','servings','skus','video','tip','directions'],
    },
  })
}, [userLoadingRecommend])

 useEffect(() => {
   if (!userLoadingProduct) return getProduct({
     variables: {
       id:'33396'
     }
   })
 }, [])

 useEffect(() => {
  addToCart({
    variables: {
      salesChannel: "1",
      items: [
        {
          id: 33396,
          quantity: 1,
          seller: "1"
        }
      ]
    }
   }
   )

 }, [])

let ArrSku=[]
let ArrTag=[]
let ArrIng=[]
let listTags=[]
let listIng=[]
ArrTag= infoRecommend?.document.fields[2].value.split(",")
ArrSku= infoRecommend?.document.fields[7].value.match(/(\d+)/g)
ArrIng= infoRecommend?.document.fields[4].value.split(",")
if(infoRecommend?.document.fields.length>0){
  listTags = ArrTag.map((item:any) => <li className={`${handles.recipePage_Tag}`}>{item.replace(/[^a-zA-Z ]/g, "")}</li>);
  listIng = ArrIng.map((item:any) => <li className={`${handles.recipePage_recipeIngredientsItem}`}>{item.replace(/[^a-zA-Z ]/g, "")}</li>);
  console.log("esta es la array",ArrSku[0]
  ,infoProduct
  )
  console.log("esta es la array de ingredientes", ArrIng.length)
}

  return (
    <>
        <div id="content-page-wrapper" className={`${handles.recipePage_Container}`}>
            <div className={`${handles.recipePage_rowContainer}`}>
                    <section className={`${handles.recipePage_rowContainerCol}`}>
                        <div className="">
                            <img width="718" height="522" src={`${infoRecommend?.document.fields[1].value}`}>
                              </img>
                        </div>
                        <div className={`${handles.recipePage_wrapperTag}`}>
                            <div className={`${handles.recipePage_titleTag}`}>Tags:</div>
                              {listTags}
                        </div>
                    </section>
                    <section className={`${handles.recipePage_rowContainerCol}`}>
                        <div className={`${handles.recipePage_recipeTitle}`}>
                            {infoRecommend?.document.fields[0].value}
                        </div>
                        <div className="raitings-and-social row-container row-container--2columns row-container--separate">
                            {/* <div className="social row-container__column">
                                <button type="button" className="social-link font-icn facebook s_share s_facebook"></button>
                                <button type="button" className="social-link font-icn twitter s_share s_twitter"></button>
                                <button type="button" className="social-link font-icn gplus s_share s_plus"></button>
                                <button type="button" className="social-link font-icn email-b" data-overlay="share-recipe"></button>
                            </div> */}
                        </div>
                        <ul className={`${handles.recipePage_recipePropertysContainer}`}>
                          <li className="property portions">
                            <span className="font-icn portions">
                              </span>
                              <span className={`${handles.recipePage_recipePropertysText}`}> {infoRecommend?.document.fields[6].value} Porciones</span>
                          </li>
                          <li className="property time">
                            <span className="font-icn time">
                              </span>
                              <span className={`${handles.recipePage_recipePropertysText}`}> {infoRecommend?.document.fields[3].value}'</span>
                          </li>
                          <li className="property ingredients">
                            <span className="font-icn ingredients">
                            </span><span className={`${handles.recipePage_recipePropertysText}`}> {ArrIng?.length} ingredientes</span>
                          </li>
                          <li className="property price">
                            <span className="font-icn money-all">
                              </span><span className="text">3.490
                            </span>
                          </li>
                        </ul>
                        <div className={`${handles.recipePage_recipeIngredientsWrapper}`}>
                        <div className={`${handles.recipePage_recipeIngredientsTitle}`}>Ingredientes</div>
                          <ul className={`${handles.recipePage_recipeIngredientsMain}`}>
                              {listIng}
                            </ul>
                        </div>
                    </section>
                </div>
                <div className={`${handles.recipePage_recipeDescrition}`}>
                    <section className={`${handles.recipePage_rowContainerCol}`}>
                        <div className={`${handles.recipePage_styleSubtitle}`}>
                            <h2 className={`${handles.recipePage_Subtitle}`}>
                              Preparación
                            </h2>
                        </div>
                          <div className={`${handles.recipePage_recipeDescritionMain}`}>
                                <div className={`${handles.recipePage_recipeDescritionMainVideo}`}>
                                  <iframe className={`absolute db top-0 left-0 w-100 h-100`} src={`//www.youtube.com/embed/${infoRecommend?.document.fields[8].value}`} frameBorder="0"></iframe>
                                </div>
                                <div className={`${handles.recipePage_recipeDescritionMainText}`}>
                                {`${infoRecommend?.document.fields[10].value}`}
                                </div>
                            </div>
                        <div className={`${handles.recipePage_recipeDescritionWrapperTip}`}>
                            <div className={`${handles.recipePage_recipeDescritionContainerTip}`}>
                              <div className={`${handles.recipePage_recipeDescritionContainerIconTip}`}>
                                <div className="font-icn chef">
                                </div>
                              </div>
                              <div className={`${handles.recipePage_recipeDescritionTitleTip}`}>Tip del Chef</div>
                              <div className={`${handles.recipePage_recipeDescritionTextTip}`}> {infoRecommend?.document.fields[9].value}
                                </div>
                              </div>
                      </div>
                  </section>
                  <section className={`${handles.recipePage_rowContainerCol}`}>
                    <div className={`${handles.recipePage_styleSubtitle}`}>
                            <h2 className={`${handles.recipePage_Subtitle}`}>¡Haz la receta!</h2>
                    </div>
                    <div className={`${handles.recipePage_minicartWrapper}`}>
                      <div className={`${handles.recipePage_minicartProductGroupItem}`}>
                          <label className="product-item__select">
                            <div className="font-icn check">
                              </div>
                          </label>
                        <div className={`${handles.recipePage_minicartImageContainer}`}>
                          <img src="https://jumbocolombiafood.vteximg.com.br/arquivos/ids/174687-92-92/7702406000143.png.jpg?v=636112866940300000">
                          </img>
                        </div>
                        <div className={`${handles.recipePage_minicartInfoContainer}`}>
                          <a className={`${handles.recipePage_minicartInfoProductName}`} href="https://jumbocolombiafood.myvtex.com/azucar-manuelita-alta-pureza-x-1-kilo/p">
                             Azúcar Manuelita Alta Pureza x 1 Kilo
                          </a>
                          <div className={`${handles.recipePage_minicartInfoProductBrand}`}>
                               MANUELITA
                           </div>
                        </div>
					            <div className={`${handles.recipePage_minicartInfoProductPriceContainer}`}>
                      	<div className={`${handles.recipePage_minicartInfoProductPrice}`}>
                          <span className={`${handles.recipePage_minicartInfoProductPriceValue}`} data-price="3490" data-unit_multiplier="1">
					              $3.490
			                  </span></div>
                        </div>
					            <div className="product-item__quantity product-quantity" data-measurementunit="un" data-unitmultiplier="1" data-cartlimit="[object Object]">
                        1
                      </div>
                      </div>
                    </div>
                    <div className={`${handles.recipePage_minicartActionWrapper}`}>
                      <span className={`${handles.recipePage_minicartTotalQuantity}`}>
                        1 artículos</span>
                      <span className={`${handles.recipePage_minicartTotalPrice}`}>
                        $3.490</span>
                      <button id="add-recipe-to-cart" className={`${handles.recipePage_minicartActionBtn}`}>
                        <span className={`${handles.recipePage_minicartActionBtnText}`}>
                          AGREGAR TODO AL CARRITO</span>
                      </button>
                    </div>
                  </section>
            </div>
      </div>
  </>
  )
}
export default RecipesPages


