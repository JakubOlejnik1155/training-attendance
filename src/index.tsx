import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import './styles/index.css';
import App from './Components/App';
import * as serviceWorker from './other/serviceWorker';
import { StoreProvider } from './Components/Store';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  // <React.StrictMode> 
    <Router  basename={process.env.PUBLIC_URL}>
          <StoreProvider>
          <App />
          </StoreProvider>
    </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
 