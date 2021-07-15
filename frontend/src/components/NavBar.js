import React,{useState, useEffect}  from 'react';
import { BrowserRouter, Link, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import {Appbar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import './navbar.css';


const NavBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        const token = user?.token;

        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    return (
        <div className="container mx-auto px-5">
              
              <Link to='/' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Home</Link>
              <Link to='/polls/create' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Create Poll</Link>
              
                {user ? (
                    <div className="user">
                    <Avatar src={user?.result.imageUrl} >{user?.result.name.charAt(0).toUpperCase()}</Avatar>
      
                    <Link onClick={logout} className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Logout</Link>

                    </div>

                  ) : (

                    <div className="user">
                    <Link to='/login' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Login</Link>
                    </div>
                  )}
              
                
              
              
            </div>
    )
}

export default NavBar