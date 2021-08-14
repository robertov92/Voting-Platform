import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar';

export default function Home() {
    let history = useHistory()
    if (!localStorage.getItem("userId")) {
        history.push('/homelg')
    }
    const userId = localStorage.getItem("userId")
    const [polls, setPolls] = useState([])

    const fetchPolls = async () => {
        const response = await fetch(`http://3.97.6.204:4000/my-polls/${userId}`)
        const data = await response.json()
        setPolls(data)
    }

    useEffect(() => {
        fetchPolls();
    }, [])

    return (
        <>
            <NavBar />
        <div className='container mx-auto px-5'>
            <h1 className='text-5xl font-bold text-gray-800 text-center my-10'>Welcome!</h1>
            <div className='w-full max-w-3xl mx-auto bg-gradient-to-r from-blue-100 to-white shadow'>
                <div className='w-full px-4 py-4 border-b border-gray-400'>
                    <h2 className='lg:text-2xl text-center'>Here you can see the polls you have created</h2>
                </div>
                {polls.map(poll => (
                    <div key={poll._id} className='w-full px-4 py-4 border-b border-gray-400 flex justify-between'>
                            {poll.title}
                            <Link className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'  to={`/polls/${poll._id}`}>View poll</Link>
                    </div>
                ))}
            </div>
            <p className="text-center leading-normal mt-8">
                Click on 'Create Poll' from the NavBar to create a new poll.
            </p>
        </div>
        </>
    )
}
