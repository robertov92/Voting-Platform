import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ViewPoll from './pages/ViewPoll';
import CreatePoll from './pages/CreatePoll';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomeLogout from './pages/HomeLogout'
import Footer from './components/Footer'


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <div className='min-h-screen  bg-gradient-to-r from-white to-blue-300 relative'>
      <div className="w-full pb-32">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/homelg' component={HomeLogout} />
          <Route path='/polls/create' component={CreatePoll} />
          <Route path='/polls/:poll' component={ViewPoll} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
      <Footer />
      </div>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

