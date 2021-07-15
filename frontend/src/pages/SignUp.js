import { Link } from 'react-router-dom';
import React, { useState, Fragment } from 'react'

export default function SignUp() {

    const login = () => {
        console.log('hi')
    }

    

    return (
        <div className="container mx-auto my-16 md:my-32 px-6 ">
          <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-white">
              <header className="border-b border-gray-400 px-8 py-5 text-gray-800">
                Sign Up
              </header>

                  <div className="py-5 px-8">
                  
                  <div className="mb-6">
                      <label htmlFor="username" className="text-sm mb-2 inline-block">Username</label>
                      <input   name='username' id='username' type="text" className='w-full py-2 border border-gray-400 rounded px-4' />
                  </div>

                  <div className="mb-3">
                    <label className="text-sm mb-2 inline-block">Password:</label>
                    
                        <div className="w-full flex items-center mb-2">
                            <input type="password"  className='w-full py-2 border border-gray-400 rounded px-4' />
                            
                        </div>
                    
                  </div>

                  <div className="mt-12 mb-6 text-center">
                    <button onClick={login} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Login</button>
                  </div>
              </div>
             
          </div>
       </div>
    )
}
