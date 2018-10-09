/*
 * @Author: antbrother 
 * @Date: 2018-09-30 10:14:55 
 * @Last Modified by: antbrother
 * @Last Modified time: 2018-09-30 13:40:45
 */
import React from "react";
import ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./component/app/index";
import 'antd-mobile/dist/antd-mobile.css';

renderWithHotReload(App);

if (module.hot) {
    module.hot.accept('./component/app/index.js', () => {
        const NextApp = require('./component/app/index.js').default;
        renderWithHotReload(NextApp);
    });
}
function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <Router>
        <RootElement />
      </Router>
    </AppContainer>,
    document.getElementById('app')
  )
}