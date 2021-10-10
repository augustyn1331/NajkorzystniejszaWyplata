import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from 'src/routes/Home';

const App = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/Home/' />
      </Route>
      <Route path='/Home/' component={Home} />
    </Switch>
  );
};
export default App;
