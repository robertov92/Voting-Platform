import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar';

export default function Home() {
    let history = useHistory()
    if (!localStorage.getItem("userId")) {
        history.push('/signup')
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
            <h1 className='text-3xl text-center my-10'>Welcome to the Voting Platform</h1>

            <div className='w-full max-w-3xl mx-auto bg-white shadow'>
                <div className='w-full px-4 py-4 border-b border-gray-400'>
                    <h2 className='text-2xl text-center'>Your Polls</h2>
                </div>
                {polls.map(poll => (
                    <div key={poll._id} className='w-full px-4 py-4 border-b border-gray-400 flex justify-between'>
                            {poll.title}
                            <Link className='cursor-pointer hover:text-blue-600 text-blue-500'  to={`/polls/${poll._id}`}>View poll</Link>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
