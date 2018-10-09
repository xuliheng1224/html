import React from 'react'
import ReactDom from "react-dom";
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './component/app/index';

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
          <Provider store={store}>
              <Router>
                  <RootElement>                   
                  </RootElement>
              </Router>
          </Provider>
      </AppContainer>,
      document.getElementById('app')
  )
}