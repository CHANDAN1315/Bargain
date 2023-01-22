import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './context/StateProvider';
import { intialState } from './context/initialState';
import reducer from './context/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    {/* it is not a context api intialstat, reducer is a prop */}
    <StateProvider initialState={intialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>  
  // </React.StrictMode>
);
reportWebVitals();