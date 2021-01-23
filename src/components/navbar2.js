import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'

// Material UI
import TypoGraphy from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Grid } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import useMediaQuery from '@material-ui/core/useMediaQuery'

// Icons
import IconButton from '@material-ui/core/IconButton'
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage'
import MenuIcon from '@material-ui/icons/Menu'

// Components
import LanguageSelector from './language_selector'
import { Text } from '../containers/language'

const useStyles = makeStyles(theme => ({
  appBar: {
    boxShadow: 'none',
  },
  logoStyle: {
    fontWeight: 'bold',
    fontSize: '25px',
    letterSpacing: 8,
    justifyContent: 'center',
    margin: '10px',
  },
  tabStyle: {
    fontWeight: 'lighter',
    fontSize: '15px',
    flex: 1,
  },
}))

const NavBar = props => {
  const classes = useStyles()
  const { history } = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Hamburger menu
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = pageURL => {
    history.push(pageURL)
    setAnchorEl(null)
  }

  const hamburgerMenu = (
    <Menu
      id="hamburger-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={() => handleClose('/')}>
        <TypoGraphy
          classes={{ root: classes.tabStyle }}
          color="primary"
          variant="button"
        >
          <Text tid="navHome" />
        </TypoGraphy>
      </MenuItem>
      <MenuItem onClick={() => handleClose('/recipes')}>
        <TypoGraphy
          classes={{ root: classes.tabStyle }}
          color="primary"
          variant="button"
        >
          <Text tid="navRecipes" />
        </TypoGraphy>
      </MenuItem>
      <MenuItem onClick={() => handleClose('/contact')}>
        <TypoGraphy
          classes={{ root: classes.tabStyle }}
          color="primary"
          variant="button"
        >
          <Text tid="navContact" />
        </TypoGraphy>
      </MenuItem>
    </Menu>
  )

  return (
    <div>
      <AppBar color="default" position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item container xs={11} md={5}>
              <Grid item xs={5}>
                <Link to="/">
                  <TypoGraphy
                    classes={{ root: classes.logoStyle }}
                    variant="button"
                    color="secondary"
                  >
                    Soup
                    <EmojiFoodBeverageIcon fontSize="large" />
                  </TypoGraphy>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <LanguageSelector />
              </Grid>
            </Grid>

            {isMobile ? (
              <Grid item xs={1}>
                <IconButton
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            ) : (
              <Grid
                item
                container
                justify="space-evenly"
                alignItems="center"
                style={{ textAlign: 'right' }}
                md={7}
              >
                <Grid item sm={6} />
                <Grid item sm={2}>
                  <TypoGraphy
                    classes={{ root: classes.tabStyle }}
                    color="primary"
                    variant="button"
                  >
                    <Link to="/">
                      <Text tid="navHome" />
                    </Link>
                  </TypoGraphy>
                </Grid>
                <Grid item sm={2}>
                  <TypoGraphy
                    classes={{ root: classes.tabStyle }}
                    color="primary"
                    variant="button"
                  >
                    <Link to="/recipes">
                      <Text tid="navRecipes" />
                    </Link>
                  </TypoGraphy>
                </Grid>
                <Grid item sm={2}>
                  <TypoGraphy
                    classes={{ root: classes.tabStyle }}
                    color="primary"
                    variant="button"
                  >
                    <Link to="/contact">
                      <Text tid="navContact" />
                    </Link>
                  </TypoGraphy>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      {hamburgerMenu}
    </div>
  )
}

export default withRouter(NavBar)
