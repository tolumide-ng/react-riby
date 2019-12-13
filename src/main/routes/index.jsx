import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Switch,
  withRouter,
  HashRouter,
} from 'react-router-dom';
import store from '../../store';
import Home from '../../pages/Home';
import DetailedGif from '../../pages/DetailedGif';
import SearchPage from '../../pages/SearchPage';
import NavBar from '../components/NavBar';
import '../../styles/index.scss';

const AppRouter = withRouter(({ location }) => {
  return (
    <Provider store={store}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={SearchPage} />
        <Route path="/:id" component={DetailedGif} />
      </Switch>
    </Provider>
  );
});

const AppWrapper = () => (
  <HashRouter>
    <AppRouter />
  </HashRouter>
);

export default AppWrapper;
