import React, {Component} from 'react'
// import {getQueryString} from '../common/util'
export default class Third extends  Component {
  constructor (props) {
    super(props)
    this.state = {
      name : '许立恒',
      age : 24,
      num : 0
    }
  }
  componentDidMount () {
    // console.log(getQueryString('a'))
    // console.log(getQueryString('b'))
    console.log(this.props.match.params.id)
    console.log(this.props.match.params.p)
    console.log(this.props)
  }
  setNum () {
    this.setState({
      num: this.state.num+1
    })
  }
  render () {
    return (
      <div>
        <h2>
          第三个页面
        </h2>
        <button onClick={this.setNum.bind(this)}>click</button>
        <Content name={this.state.num}></Content>
      </div>
    )
  }
}

class Content extends Component {
  constructor (props) {
    super(props)
    this.state = {
      num : 100
    }
  }
  componentWillMount () {
    console.log('componentWillMount')
  }
  componentDidMount () {
    console.log('componentDidMount')
  }
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps)
  }
  shouldComponentUpdate (newProps, newState) {
    return true; //当该值设为false的时候，不会更新组件，即componentWillUpdate和componentDidUpdate不会被执行
  }
  componentWillUpdate (nextProps, nextState) {
    console.log('componentWillUpdate',nextProps,nextState );
  }
  componentDidUpdate (prevProps, prevState) {
    console.log('componentDidUpdate',prevProps,prevState)
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render () {
    return (
      <h1>{this.props.name}</h1>
    )
  }
}