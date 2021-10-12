import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

createGenerateClassName();
create({
  ...jssPreset(),
  // Define a custom insertion for injecting the JSS styles in the DOM
  // This code ensures that Materal UI code is loaded before Styled Components CSS, so it can be modified without && operator.
  insertionPoint: document.getElementById('jss-insertion-point') as HTMLElement,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
