import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    const [polls, setPolls] = useState([])
    
    useEffect(() => {
        const polls = JSON.parse(
            localStorage.getItem('polls')
        ) || []

        setPolls(polls)
    }, [])

    return (
        <div className='container mx-auto px-5'>
            <h1 className='text-3xl text-center my-10'>Welcome to the Voting Platform</h1>

            <div className='w-full max-w-3xl mx-auto bg-white shadow'>
                <div className='w-full px-4 py-4 border-b border-gray-400'>
                    <h2 className='text-2xl text-center'>Your Polls</h2>
                </div>
                {polls.map(poll => (
                    <div key={poll.id} className='w-full px-4 py-4 border-b border-gray-400 flex justify-between'>
                            {poll.title}
                            <Link className='cursor-pointer hover:text-blue-600 text-blue-500'  to={`/polls/${poll.id}`}>View poll</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
