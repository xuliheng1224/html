import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from '../App'
import First from '../pages/first'
import Second from '../pages/second'
import Notfound from '../pages/notfound'
import Third from '../pages/third'
import Luck from '../pages/luck'
export default class Hello extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />{/*exact表示只有路径完全完全匹配，才渲染*/}
          <Route path="/first" component={First} />
          <Route path="/second" component={Second} />
          <Route path="/third/:id/:p" component={Third} />
          <Route path="/luck" component={Luck} />
          <Route component={Notfound} />
        </Switch>
      </Router>
    )
  }
}