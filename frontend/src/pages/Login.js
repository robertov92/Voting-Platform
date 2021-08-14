import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar';

export default function Login() {
  let history = useHistory()
  if (localStorage.getItem("userId")) {
      history.push('/')
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState([])

  const login = async () => {
    // you need to change the route here
    const response = await fetch(`http://3.97.6.204:4000/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await response.json()
        if (! response.ok) {
            setErrors(data)
            return
        }
    if (data)
    console.log(data)
    localStorage.setItem("token", "Bearer " + data.token);
    localStorage.setItem("userId", data.userId)
    history.push('/')
  }

  return (
    <>
    <NavBar />
    <div className="container mx-auto px-6">
      <h1 className='text-5xl font-bold text-gray-800 text-center my-10'>Login</h1>
      {errors.length > 0 ? (
        <Fragment>
            {errors.map((error, index) => (
                <p key={index} className='w-full mb-2 bg-red-500 text-white py-3 px-2 rounded'>{error.message}</p>
            ))}
        </Fragment>
      ): null}
      <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-gradient-to-r from-blue-100 to-white">
        <div className="py-5 px-8">
          <div className="mb-6">
            <label htmlFor="email" className="text-sm mb-2 inline-block">Email:</label>
            <input placeholder="Enter your email" onChange={event => setEmail(event.target.value)} value={email} name='email' id='email' type="email" className='w-full py-2 border border-gray-400 rounded px-4' />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="text-sm mb-2 inline-block">Password:</label>
            <input placeholder="Enter your password" onChange={event => setPassword(event.target.value)} value={password} name='password' id='password' type="password" className='w-full py-2 border border-gray-400 rounded px-4' />
          </div>
          <div className="mt-12 mb-6 text-center">
            <button onClick={login} className='bg-blue-600 text-white font-bold rounded py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out'>Login</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
