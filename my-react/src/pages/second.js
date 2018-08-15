import React, {Component} from 'react'
// import {getQueryString} from '../common/util'
export default class Second extends  Component {
  componentDidMount () {
    console.log(this.props.location.query.name) // 刷新会页面报错不存在name
  }
  render () {
    return (
      <div>
        <h2>
          第二个页面
        </h2>
      </div>
    )
  }
}