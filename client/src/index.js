import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import storeAccount from './store/account.store.js';
import { Provider } from 'react-redux';



import { BrowserRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={storeAccount}>
    <Router>
      <App />
    </Router>
  </Provider>


);
