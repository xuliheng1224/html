import React, {Component} from 'react'
// import {getQueryString} from '../common/util'
// import { fetch } from "../common/http"
// import wx from 'weixin-js-sdk'
export default class Second extends  Component {
  componentDidMount () {
    // console.log(this.props.location.query.name) // 刷新会页面报错不存在name
    // fetch({
    //   url: 'api/'
    // })
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