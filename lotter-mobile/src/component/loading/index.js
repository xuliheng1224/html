import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
import './index.less'
export default class Loading extends Component { 
  render() {
    return (
      <div id="component-load">
        <Icon type="loading" size='lg' className="loading"></Icon>
      </div>
    )
  }
}
