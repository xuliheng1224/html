/*1. 使用官方脚手架搭建
  npm install -g create-react-app 
  create-react-app my-react

2. 路由*/
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from '../App'
import First from '../pages/first'
import Second from '../pages/second'
import Notfound from '../pages/notfound'
import Third from '../pages/third';
export default class Hello extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={App} />{/*exact表示只有路径完全完全匹配，才渲染*/}
            <Route path="/first" component={First} />
            <Route path="/second" component={Second} />
            <Route path="/third/:id/:p" component={Third} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

/* 3. 路由传参
  1.<Link to="/first?a=3&b=4&c=5">跳转到第一个页面</Link> this.props.history.push(path)
  2.<Link to="/third/222/7777">跳转到第三个页面 </Link> <Route path="/third/:id/:p" component={Third} />
    取： this.props.match.params.id
  3.var path = {
    pathname: '/second',
    query: {
      name: 'xu',
      age: 24
    }
  }
  this.props.history.push(path); // 页面刷新会报错  */
// 4. 初始化
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name : '许立恒',
      age : 24
    }
  }
}  
  /*es6 创建组建中删除了这个函数 要想使用 可用
  var App = React.createClass({
    getDefaultProps(){
      return {
        name : '许立恒',
        age : 24,
        num : 0
      }
    }
  })*/ 
// 5. this的绑定
// onClick={this.setNum.bind(this)}  

// this.setState是个异步函数，可能有时候赋值不上，解决方法
this.setState({
  speed: 40
}, () => {
    this.roll()
    this.setState({
    click: true
  })
})