import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Select from 'react-select'

// Components
import { LanguageContext } from '../containers/language'
import { Text } from '../containers/language'

const AllRecipes = () => {
  let url_methods = ''
  let url_seasons = ''
  let url_mainIngs = ''
  let url_recipes = ''

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // filter
  const [searchInput, setSearchInput] = useState('')
  const [pressedGo, setPressedGo] = useState(false)
  const [pressedSearch, setPressedSearch] = useState(false)
  const [pressedEnter, setPressedEnter] = useState(false)

  // dropdown options
  const [methods, setMethods] = useState([])
  const [seasons, setSeasons] = useState([])
  const [mainIngs, setMainIngs] = useState([])
  const [recipes, setRecipes] = useState([])
  const [methodIndex, setMethodIndex] = useState(0)
  const [seasonIndex, setSeasonIndex] = useState(0)
  const [mainIndex, setMainIndex] = useState(0)

  const { userLanguage } = useContext(LanguageContext)

  // index counter
  let counter = 0

  // populate dropdown with default "all" option
  const all = {
    value: '*',
    label: <Text tid="all" />,
  }

  // populate dropdowns with api data
  const methodOptions = []
  function populateMethodOptions(data) {
    methodOptions.push(all)
    data.forEach(methods => {
      const method = {
        value: methods.method_id,
        label: methods.name,
      }
      methodOptions.push(method)
    })
  }
  const seasonOptions = []
  function populateSeasonOptions(data) {
    seasonOptions.push(all)
    data.forEach(seasons => {
      const season = {
        value: seasons.season_id,
        label: seasons.name,
      }
      seasonOptions.push(season)
    })
  }
  const mainOptions = []
  function populateMainOptions(data) {
    mainOptions.push(all)
    data.forEach(mainIngs => {
      const main = {
        value: mainIngs.main_id,
        label: mainIngs.name,
      }
      mainOptions.push(main)
    })
  }

  // find index of selected option
  const onMethodChange = selectedOption => {
    let index = 0
    for (let i = 0; i < methodOptions.length; i++) {
      if (methodOptions[i].value === selectedOption.value) {
        index = i
        break
      }
    }
    setMethodIndex(index)
  }
  const onSeasonChange = selectedOption => {
    let index = 0
    for (let i = 0; i < seasonOptions.length; i++) {
      if (seasonOptions[i].value === selectedOption.value) {
        index = i
        break
      }
    }
    setSeasonIndex(index)
  }
  const onMainChange = selectedOption => {
    let index = 0
    for (let i = 0; i < mainOptions.length; i++) {
      if (mainOptions[i].value === selectedOption.value) {
        index = i
        break
      }
    }
    setMainIndex(index)
  }

  // handle search/filter
  const handleGo = () => {
    setPressedGo(true)
  }
  const handleSearchInput = () => {
    setPressedSearch(true)
    recipes.forEach(function (recipe) {
      if (
        recipe.summary.toLowerCase().includes(searchInput.toLowerCase()) ||
        recipe.name.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        recipe.visible = 1
      } else {
        recipe.visible = 0
      }
    })
  }
  const handlePressEnter = event => {
    if (event.key === 'Enter') {
      setPressedEnter(true)
      handleSearchInput(searchInput)
    }
  }

  // api call
  const fetchData = async () => {
    setIsError(false)
    setIsLoading(true)

    url_methods = `${process.env.REACT_APP_API_URL}/methods/${userLanguage}`
    url_seasons = `${process.env.REACT_APP_API_URL}/seasons/${userLanguage}`
    url_mainIngs = `${process.env.REACT_APP_API_URL}/main/${userLanguage}`
    url_recipes = `${process.env.REACT_APP_API_URL}/recipes/filtered/${methodOptions[methodIndex].value}/${seasonOptions[seasonIndex].value}/${mainOptions[mainIndex].value}/${userLanguage}`

    /* url_methods = `http://192.168.0.37:4600/methods/${userLanguage}`
      url_seasons = `http://192.168.0.37:4600/seasons/${userLanguage}`
      url_mainIngs = `http://192.168.0.37:4600/main/${userLanguage}`
      url_recipes = `http://192.168.0.37:4600/recipes/filtered/${methodOptions[methodIndex].value}/${seasonOptions[seasonIndex].value}/${mainOptions[mainIndex].value}/${userLanguage}`
 */
    axios
      .all([
        axios.get(url_methods),
        axios.get(url_seasons),
        axios.get(url_mainIngs),
        axios.get(url_recipes),
      ])
      .then(
        axios.spread((_methods, _seasons, _mainIngs, _recipes) => {
          setMethods(_methods.data)
          setSeasons(_seasons.data)
          setMainIngs(_mainIngs.data)
          setRecipes(_recipes.data)
        }),
      )
      .catch(error => {
        if (error.response.status === 404) {
          setRecipes([{ recipe_id: -1, name: <Text tid="noRecipeCombo" /> }])
          console.log('This is a 404 error!!')
        }
      })

    setIsLoading(false)
    setPressedGo(false)
    setPressedEnter(false)
  }

  useEffect(() => {
    fetchData()
    setSearchInput('')
  }, [userLanguage, pressedGo])

  useEffect(() => {
    setPressedSearch(false)
    setPressedEnter(false)
  }, [pressedSearch, pressedEnter])

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div class="grid grid-cols-singleRecipe px-4">
          <div class="col-start-2 col-end-3 py-4">
            <div class="uppercase font-light font-sans text-3xl mdLg:text-4xl text-ingredient bg-ingredient flex justify-center">
              <Text tid="searchAll" />
            </div>

            {populateMethodOptions(methods)}
            {populateSeasonOptions(seasons)}
            {populateMainOptions(mainIngs)}

            {/* main search dropdown */}
            <div class="grid grid-cols-5 sm:grid-cols-12 lgXl:grid-cols-11 pt-2">
              <div class="col-span-6 sm:col-span-6 lgXl:col-span-3 pr-6 py-2">
                <div>
                  <div class="lowercase font-thin font-sans text-xl mdLg:text-2xl">
                    <Text tid="method" />
                  </div>
                  <Select
                    options={methodOptions}
                    defaultValue={methodOptions[0]}
                    onChange={onMethodChange}
                    autoFocus
                    value={methodOptions[methodIndex]}
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-6 lgXl:col-span-3 pr-6 py-2">
                <div>
                  <div class="lowercase font-thin font-sans text-xl mdLg:text-2xl">
                    <Text tid="season" />
                  </div>
                  <Select
                    options={seasonOptions}
                    defaultValue={seasonOptions[0]}
                    onChange={onSeasonChange}
                    autoFocus
                    value={seasonOptions[seasonIndex]}
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-8 lgXl:col-span-4 pr-6 py-2">
                <div>
                  <div class="lowercase font-thin font-sans text-xl mdLg:text-2xl">
                    <Text tid="mainIng" />
                  </div>
                  <Select
                    options={mainOptions}
                    defaultValue={mainOptions[0]}
                    onChange={onMainChange}
                    autoFocus
                    value={mainOptions[mainIndex]}
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-4 lgXl:col-span-1 flex justify-center sm:justify-start sm:items-end">
                <div class="py-2">
                  <button
                    class="bg-dark-theme font-normal text-white hover:bg-ingredient hover:text-yellow-900 p-3 rounded-md w-24"
                    onClick={handleGo}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div class="flex">
              <div class="col-span-2 flex items-center pr-4">
                <div class="flex-auto">
                  <div class="lowercase font-thin font-sans text-xl mdLg:text-2xl">
                    <Text tid="filter" />
                  </div>
                </div>
              </div>

              <div class="col-span-8 lgXl:col-span-6 flex items-center pr-5">
                <div class="flex-auto">
                  <div class="w-full">
                    <input
                      class="bg-white border rounded border-dark-theme hover:border-ingredient w-full py-2 text-yellow-900 leading-tight focus:outline-none focus:border-yellow-900 font-sans font-thin uppercase pl-2"
                      type="text"
                      value={searchInput}
                      onChange={event => setSearchInput(event.target.value)}
                      onKeyDown={handlePressEnter}
                    />
                  </div>
                </div>
              </div>

              <div class="col-span-2 flex items-center py-2">
                <div class="flex-auto">
                  <button
                    class="bg-dark-theme font-normal text-white hover:bg-ingredient hover:text-yellow-900 p-3 rounded-md w-24"
                    onClick={handleSearchInput}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>

            {/* Display recipe data */}
            <div class="pt-4">
              {recipes.map(function (recipe) {
                if (recipe.recipe_id === -1) {
                  return (
                    <div key={recipe.recipe_id} class="text-red-500 pt-4">
                      {recipe.name}
                    </div>
                  )
                }
                if (recipe.visible === 1) {
                  counter += 1
                  if (counter % 2 === 0) {
                    return (
                      <div class="bg-ingredient bg-opacity-25 hover:bg-opacity-0">
                        <Link to={`/recipe/${recipe.recipe_id}`}>
                          <div class="text-lg pl-2 pt-2">
                            <ol class="text-base font-sans font-normal uppercase">
                              <li key={recipe.recipe_id}>{recipe.name}</li>
                            </ol>
                          </div>
                          <div class="text-sm font-sans font-thin pl-2 pb-2">
                            {recipe.summary}
                          </div>
                        </Link>
                      </div>
                    )
                  } else {
                    return (
                      <div class="bg-dark-theme bg-opacity-25 hover:bg-opacity-0">
                        <Link to={`/recipe/${recipe.recipe_id}`}>
                          <div class="text-lg pl-2 pt-2">
                            <ol class="text-base font-sans font-normal uppercase">
                              <li key={recipe.recipe_id}>{recipe.name}</li>
                            </ol>
                          </div>
                          <div class="text-sm font-sans font-thin pl-2 pb-2">
                            {recipe.summary}
                          </div>
                        </Link>
                      </div>
                    )
                  }
                }
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllRecipes

// incremental search
/*  const incrementalSearch = e => {
          setSearchInput(e.currentTarget.value)
          recipes.forEach(function (recipe) {
             if (
                recipe.summary.includes(searchInput) ||
                recipe.name.includes(searchInput)
             ) {
                recipe.visible = 1
             } else {
                recipe.visible = 0
             }
          })
       } */
