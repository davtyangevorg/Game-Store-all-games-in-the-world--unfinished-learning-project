import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store.js'
import { Provider } from 'react-redux'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { BrowserRouter } from 'react-router-dom'

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


