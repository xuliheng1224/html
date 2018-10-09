/*
 * @Author: antbrother 
 * @Date: 2018-09-30 09:58:03 
 * @Last Modified by: antbrother
 * @Last Modified time: 2018-09-30 11:53:36
 */
import React, { Component } from 'react'
import getRouter from "../../router/router"
export default class App extends Component {
  render() {
    return (
      <div id="root">
        {getRouter()}
      </div>
    )
  }
}