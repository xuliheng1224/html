import React, { Component } from 'react'
import { Spin, Alert } from 'antd'
import './index.less'
export default class Loading extends Component {
  render() {
    return (
      <div className="loading-main">
        <Spin tip="Loading...">          
        </Spin>
      </div>
    )
  }
}
