import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Shouye from './component/shouye/shouye';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Shouye />, document.getElementById('root'));
registerServiceWorker();
