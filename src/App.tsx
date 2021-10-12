import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from 'src/routes/Home';
import { GlobalStyle } from './styles';
import theme from 'src/styles/muiTheme';
const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/Home/' />
          </Route>
          <Route path='/Home/' component={Home} />
        </Switch>
      </ThemeProvider>
    </>
  );
};
export default App;
