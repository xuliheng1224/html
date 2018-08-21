import React, {Component} from 'react'
// import {getQueryString} from '../common/util'
import { fetch } from "../common/http"

export default class Second extends  Component {
  componentDidMount () {
    // console.log(this.props.location.query.name) // 刷新会页面报错不存在name
    fetch({
      url: '/crm/smallCard/list',
      method: 'get',
      params: {
        type: 2
      },
      success: (res) => {
        console.log(res)
      }
    })
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