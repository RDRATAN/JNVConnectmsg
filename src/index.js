import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7R_QRcCtwVhQ2FNRNGn65Szxv85fFiz8",
  authDomain: "jnvconnect-696fa.firebaseapp.com",
  databaseURL: "https://jnvconnect-696fa-default-rtdb.firebaseio.com",
  projectId: "jnvconnect-696fa",
  storageBucket: "jnvconnect-696fa.appspot.com",
  messagingSenderId: "413939946867",
  appId: "1:413939946867:web:91412c75e01855bd486106",
};


firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
