import React from 'react'
import {Link, useHistory} from 'react-router-dom'

export default function NavBar() {
  let history = useHistory()
  const logout = () => {
    localStorage.clear();
    history.push('/signup')
  }

  return (
  <div className="h-16 bg-gray-800 flex items-center">
    <div className="container mx-auto px-5">
      { localStorage.getItem("userId") ?
        <>
        <Link to='/' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 ml-3'>Home</Link>
        <Link to='/polls/create' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 ml-3'>Create Poll</Link>
        </> : null
      }
    </div>
    <div className="container mx-auto px-5 text-right">
      { !localStorage.getItem("userId") ?
        <>
        <Link to='/login' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Login</Link>
        <Link to='/signup' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>SignUp</Link>
        </>
        :
        <button className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mx-5' onClick={() => logout()}>Logout</button>
      }
    </div>
  </div>
  )
}
