import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name : '许立恒',
      age : 24
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
  componentDidMount () {
    console.log(this.state.name)
  }
  goSecond () {
    var path = {
      pathname: '/second',
      query: {
        name: 'xu',
        age: 24
      }
    }
    this.props.history.push(path);
  }
  render() {
    // console.log(this.props)
    return (
      <div>
        app页面
        <ul>
          <li>
            <Link to="/first?a=3&b=4&c=5">跳转到第一个页面</Link>
          </li>
          <li>
            <div onClick={this.goSecond.bind(this)}>
              跳转到第二个页面
            </div>
          </li>
          <li>
            <Link to="/third/222/7777">跳转到第三个页面 </Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default App;
