import React from 'react'
import NavBar from '../components/NavBar'
import {Link} from 'react-router-dom'

export default function HomeLogout() {
    return (
        <>
        <NavBar />
        <div className="container mx-auto px-6 pt-10" >
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <p className="uppercase tracking-loose w-full">The simplest voting platform</p>
                    <h1 className="my-4 text-gray-800 text-5xl font-bold leading-tight">
                        Get Opinions from Anywhere!
                    </h1>
                    <p className="leading-normal text-2xl mb-8">
                        Sign in to create polls. <br/> Participants do NOT need an account!
                    </p>
                    <div className="mx-auto lg:mx-0">
                    <Link to="/login" className="mr-4 bg-blue-600 text-white font-bold rounded my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-blue-600 text-white font-bold rounded my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                        Register
                    </Link>
                    </div>
                </div>
                <div className="w-full md:w-3/5 py-6 text-center">
                    <img className="w-full md:w-4/5 z-50" src="img/icon.png" />
                </div>
            </div>
        </div>
        </>
    )
}
