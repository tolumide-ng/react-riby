import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Switch,
  withRouter,
  HashRouter,
} from 'react-router-dom';
import Home from '../pages/Home';

const AppRouter = withRouter(({ location }) => {
  return (
    // <Provider>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
    // </Provider>
  );
});

const AppWrapper = () => (
  <HashRouter>
    <AppRouter />
  </HashRouter>
);

export default AppWrapper;
