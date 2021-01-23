import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'

import { MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './styles/theme'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
    <CssBaseline />
  </MuiThemeProvider>,
  document.getElementById('root'),
)
