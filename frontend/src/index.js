import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import {Appbar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';


import Home from './pages/Home';
import ViewPoll from './pages/ViewPoll'
import CreatePoll from './pages/CreatePoll'
import NavBar from './components/NavBar';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { reducers } from './reducer';
import thunk from 'redux-thunk';



const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <div className="w-full h-screen">
        <div className="h-16 w-full bg-gray-800 flex items-center">
            <NavBar/>
        </div>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/polls/create' component={CreatePoll} />
          <Route path='/login' component={Login} />
          <Route path='/polls/signup' component={SignUp} />
          <Route path='/polls/:poll' component={ViewPoll} />
          
          
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
