import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

ReactDOM.render(
<BrowserRouter>
  <div className="w-full h-screen">
    <div className="h-16 w-full bg-gray-800 flex items-center">
      <div className="container mx-auto px-5">
        <Link to='/' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Home</Link>
        <Link to='/polls/create' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Create Poll</Link>
      </div>
    </div>
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  </div>
</BrowserRouter>,
document.getElementById('root'));