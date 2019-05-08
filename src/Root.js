import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import {SearchType} from './actions'
import FilterLink from './containers/FilterLink'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
   	  <Route exact path='/' component={App} />
      <Route path="/searchby/:search_type?/:search_text?" component={App} />
      <Route path="/about" component={App} />
      <Route path="/getinvolved" component={App} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root