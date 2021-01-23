import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AspectRatio from 'react-aspect-ratio'

// Material UI
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'

// Components
import LanguageSelector from './language_selector'
import { Text } from '../containers/language'

const NavBar = props => {
  const { history } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = pageURL => {
    history.push(pageURL)
    setAnchorEl(null)
  }

  // Hamburger menu for smaller screens
  const hamburgerMenu = (
    <Menu
      id="hamburger-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={() => handleClose('/')}>
        <Text tid="navHome" />
      </MenuItem>
      <MenuItem onClick={() => handleClose('/recipes')}>
        <Text tid="navRecipes" />
      </MenuItem>
      <MenuItem onClick={() => handleClose('/contact')}>
        <Text tid="navContact" />
      </MenuItem>
    </Menu>
  )

  return (
    <div>
      <nav class="grid grid-cols-11 lgXl:grid-cols-14 bg-navbar px-5 py-2">
        {/* Soup logo */}
        <div class="col-span-6 xs:col-span-2 lgXl:col-start-2">
          <Link to="/">
            <div class="flex items-center flex-shrink-0 text-blue-900 mr-6">
              <div class="mr-2 mb-2">
                <AspectRatio ratio="1" style={{ maxWidth: '50px' }}>
                  <img src={require(`../images/soup.ico`)} />
                </AspectRatio>
              </div>
              <span class="font-thin font-sans uppercase text-4xl tracking-wider">
                Soup
              </span>
            </div>
          </Link>
        </div>

        <div class="col-start-7 col-span-5 xs:col-start-5 xs:col-span-4 mdLg:col-start-3 lgXl:col-start-4 mdLg:col-span-2 lgXl:col-span-3 flex items-center">
          <div class="flex-1">
            <LanguageSelector />
          </div>
        </div>

        <div class="hidden mdLg:contents">
          {/* tabs */}
          <div class="p-2 col-start-7 lgXl:col-start-11 col-span-1 font-thin font-sans uppercase text-lg flex items-center justify-end">
            <Link to="/">
              <Text tid="navHome" />
            </Link>
          </div>

          <div class="p-2 col-start-9 lgXl:col-start-12 col-span-1 font-thin font-sans uppercase text-lg flex items-center justify-end">
            <Link to="/recipes">
              <Text tid="navRecipes" />
            </Link>
          </div>

          <div class="p-2 col-start-11 lgXl:col-start-13 col-span-1 font-thin font-sans uppercase text-lg flex items-center justify-end">
            <Link to="/contact">
              <Text tid="navContact" />
            </Link>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <div class="flex justify-end items-center col-start-11 mdLg:hidden">
          <button onClick={handleClick}>
            <MenuIcon />
          </button>
        </div>
      </nav>

      {hamburgerMenu}
    </div>
  )
}

export default withRouter(NavBar)
