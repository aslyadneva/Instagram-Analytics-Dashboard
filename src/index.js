import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware, compose } from 'redux'; 
import thunk from 'redux-thunk'; 
import reducers from './reducers'; 
import history from './history'; 

import {Router} from 'react-router-dom'; 
import App from './App';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore( reducers, composeEnhancers(applyMiddleware(thunk)) );

ReactDOM.render( 
  <Provider store = {store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));

