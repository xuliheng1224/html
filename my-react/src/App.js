import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import Add from './pages/add'

// import {getQueryString} from '../common/util'

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
    // console.log(this.state.name)
    // var redirect_urls = encodeURIComponent(window.location.href) // 写一个空白页面判断
    // var urls =  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5fbc1df873478202&redirect_uri=" + redirect_urls + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
    // window.location.href = urls
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
  clickMe (a,b,e) {
    console.log(this,a,b,e)
  }
  render() {
    const id = 3
    // console.log(this.props)
    return (
      <div>
        app页面
        <Add haha={id}></Add>
        <p onClick={this.clickMe.bind(this,2,4)}>测试一下点击时间都是传的啥</p>
        <hr/>
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
