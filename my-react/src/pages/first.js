import React, {Component} from 'react'
import {getQueryString} from '../common/util'
export default class First extends  Component {
  render () {
    console.log(getQueryString('a'))
    console.log(getQueryString('b'))
    console.log(getQueryString('c'))
    return (
      <div>
        <h2>
          第一个页面
        </h2>
      </div>
    )
  }
}