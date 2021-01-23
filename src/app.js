import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// Style
import './styles/index.css'
import './styles/tailwind.css'

// Import components
import NavBar from './components/navbar'
import Home from './components/home'
import Recipes from './components/allRecipes'
import SingleRecipe from './components/singleRecipe'
import Contact from './components/contact'
import { LanguageProvider } from './containers/language'

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipe/:recipe_id" component={SingleRecipe} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
