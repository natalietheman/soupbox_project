import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// components
import { LanguageContext } from '../containers/language'
import { Text } from '../containers/language'

// libraries
import AspectRatio from 'react-aspect-ratio'

const Recipe = props => {
  let url_ingredients = ''
  let url_steps = ''
  let url = ''

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [recipe, setRecipe] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])
  const { userLanguage } = useContext(LanguageContext)

  const fetchData = async () => {
    try {
      setIsError(false)
      setIsLoading(true)
      url = `${process.env.REACT_APP_API_URL}/recipe/${userLanguage}/${props.match.params.recipe_id}`
      url_ingredients = `${process.env.REACT_APP_API_URL}/recipe/ingredients/${userLanguage}/${props.match.params.recipe_id}`
      url_steps = `${process.env.REACT_APP_API_URL}/recipe/steps/${userLanguage}/${props.match.params.recipe_id}`

      axios
        .all([axios.get(url), axios.get(url_ingredients), axios.get(url_steps)])
        .then(
          axios.spread((_recipe, _ingredients, _steps, _gallery) => {
            setRecipe(_recipe.data)
            setIngredients(_ingredients.data)
            setSteps(_steps.data)
          }),
        )
      setIsLoading(false)
    } catch (err) {
      setIsError(true)
      console.log(err.message)
    }
  }

  // re-render when the language changes
  useEffect(() => {
    fetchData()
  }, [userLanguage])

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div class="grid grid-cols-singleRecipe">
          <div class="col-start-2 col-end-3">
            <div class="grid grid-cols-12">
              {/* Title div */}
              <div class="col-span-12 smMd:col-start-2 smMd:col-span-10 mdLg:col-span-12">
                <div class="grid grid-cols-12 w-full py-2 px-5">
                  {/* Soup title */}
                  <div class="col-span-9 flex items-end uppercase font-light font-sans text-3xl mdLg:text-4xl">
                    {recipe.name}
                  </div>
                  {/* Method + season icons */}
                  {/* TODO: change to dynamic icons, link to the correct method and season of the recipe */}
                  <div class="col-span-3 flex justify-end content-center">
                    <div class="flex justify-center items-center">
                      <div class="mr-2">
                        <AspectRatio ratio="1" style={{ maxWidth: '60px' }}>
                          <img
                            src={require(`../images/${userLanguage}/slowcook.png`)}
                          />
                        </AspectRatio>
                      </div>
                      <div class="ml-2">
                        <AspectRatio ratio="1" style={{ maxWidth: '60px' }}>
                          <img
                            src={require(`../images/${userLanguage}/summer.png`)}
                          />
                        </AspectRatio>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-12 smMd:col-start-2 smMd:col-span-10 mdLg:col-span-8 px-5 py-2">
                {/* Image */}
                <div class="mb-0 mdLg:mb-5">
                  <img
                    class="w-full h-recipeImage object-cover object-center"
                    src={require(`../images/gallery/${props.match.params.recipe_id}.JPG`)}
                  />
                </div>

                {/* Directions (MdLg+) */}
                <div class="hidden mdLg:block">
                  {/* Servings (MdLg+) */}
                  <div class="float-right">
                    <div class="uppercase text-2xl font-light font-sans mb-2 text-ingredient bg-ingredient flex justify-center pr-2">
                      {recipe.servings} <Text tid="servings" />
                    </div>
                  </div>
                  {/* Directions Title (MdLg+) */}
                  <div class="uppercase text-2xl font-light font-sans mb-2 text-ingredient bg-ingredient pl-2">
                    <Text tid="recipeDirections" />
                  </div>
                  {/* List Directions (MdLg+) */}
                  <div class="text-lg">
                    {steps.map(step => (
                      <ul class="list-decimal list-inside text-base font-light font-sans">
                        <li class="mb-5" key={step.recipeStepId}>
                          {step.step}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ingredients (XS-LG) & Directions (SM-MD) */}
              <div class="col-span-12 smMd:col-start-2 smMd:col-span-10 mdLg:col-span-4 pr-5 py-2">
                <div class="grid grid-cols-5 pl-5 mdLg:pl-2">
                  {/* Ingredients (XS-LG) */}
                  <div class="col-span-5 smMD:col-start-1 smMd:col-span-2 mdLg:col-span-5">
                    {/* Ingredient Title (XS-LG) */}
                    <div class="uppercase text-2xl font-light font-sans mb-2 text-ingredient bg-ingredient flex justify-start pl-2 mdLg:pl-0 mdLg:justify-center">
                      <Text tid="recipeIngredients" />
                    </div>
                    {/* Ingredient List (XS-LG) */}
                    <div class="text-lg">
                      {ingredients.map(ingredient => (
                        <ul class="list-square list-inside text-base font-light font-sans mb-4">
                          <li key={ingredient.recipeIngredientId}>
                            {ingredient.ingredient} ({ingredient.quantity})
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>

                  {/* Directions (SM-MD) */}
                  <div class="hidden smMd:block smMD:col-start-2 smMd:col-span-3 mdLg:hidden">
                    {/* Servings (SM-MD) */}
                    <div class="float-right">
                      <div class="uppercase text-2xl font-light font-sans mb-2 text-ingredient bg-ingredient flex justify-center pr-2">
                        {recipe.servings} <Text tid="servings" />
                      </div>
                    </div>

                    <div class="pl-5">
                      {/* Directions Title (SM-MD) */}
                      <div class="uppercase text-2xl font-light font-sans mb-2 text-ingredient bg-ingredient flex justify-start pl-2">
                        <Text tid="recipeDirections" />
                      </div>

                      {/* List Directions (SM-MD) */}
                      <div class="text-lg">
                        <ol class="list-decimal list-inside text-base font-light font-sans">
                          {steps.map(step => (
                            <li class="mb-5" key={step.recipeStepId}>
                              {step.step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directions (XS) */}
              <div class="col-span-12 smMd:hidden">
                <div class="px-5 py-2">
                  {/* Directions Title (XS) */}
                  <div class="uppercase text-2xl font-light font-sans mb-2 text-ingredient bg-ingredient flex justify-start pl-2">
                    <Text tid="recipeDirections" />
                  </div>

                  {/* Servings (XS) */}
                  <div class="float-right">
                    <div class="uppercase text-2xl font-light font-sans mb-2 text-ingredient bg-ingredient flex justify-center pr-2">
                      {recipe.servings} <Text tid="servings" />
                    </div>
                  </div>

                  {/* List Directions (XS) */}
                  <div class="text-lg">
                    <ol class="list-decimal list-inside text-base font-light font-sans">
                      {steps.map(step => (
                        <li class="mb-5 mr-2" key={step.recipeStepId}>
                          {step.step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Recipe
