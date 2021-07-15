import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ViewPoll from './pages/ViewPoll';
import CreatePoll from './pages/CreatePoll';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <div className="w-full h-screen">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/polls/create' component={CreatePoll} />
          <Route path='/polls/:poll' component={ViewPoll} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
