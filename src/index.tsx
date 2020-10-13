import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import './styles/index.css';
import App from './Components/App';
import * as serviceWorker from './other/serviceWorker';


ReactDOM.render(
  <React.StrictMode> 
    <Router  basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
 