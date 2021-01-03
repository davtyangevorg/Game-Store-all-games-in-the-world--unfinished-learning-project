import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import store from './redux/store.js'

const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyBY3wma8N1rU7PYTC66cgBG1XjjAVAoh7c",
  authDomain: "game-store-472f0.firebaseapp.com",
  databaseURL: "https://game-store-472f0.firebaseio.com",
  projectId: "game-store-472f0",
  storageBucket: "game-store-472f0.appspot.com",
  messagingSenderId: "705343197551",
  appId: "1:705343197551:web:3ffeb0098ad3b81e21989a"
}
firebase.initializeApp(firebaseConfig)


ReactDOM.render(
  <React.StrictMode >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


