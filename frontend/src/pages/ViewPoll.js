import React, { useEffect, useState } from 'react'
import Chart from "react-google-charts";
import Button from '../components/Button'

export default function ViewPoll({ match }) {
    const [ip, setIp] = useState(null)
    const [poll, setPoll] = useState(null)
    const [voted, setVoted] = useState(false)

    const fetchPoll = async () => {
        const response = await fetch(`http://3.97.6.204:4000/polls/${match.params.poll}`)

        const data = await response.json()

        setPoll(data)
    }

    const fetchClientIpAddress = async () => {
        const response = await fetch('https://api.ipify.org?format=json')

        const data = await response.json()

        setIp(data.ip)
    }

    useEffect(() => {
        fetchPoll()
    }, [voted])

    useEffect(() => {
        fetchClientIpAddress()
    }, [])

    const vote = async (choice) => {
        console.log(ip);
        console.log(choice);
        await fetch(`http://3.97.6.204:4000/polls/${match.params.poll}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ip,
                choice
            })
        })

        setVoted(true)
    }

    const getTotalVotes = () => {
        let totalVotes = 0
        poll.choices.forEach(choice => {
            totalVotes += choice.count
        })

        return totalVotes
    }

    const getChoicePercentage = (selectedChoice) => {
        const totalVotes = getTotalVotes()

        if (totalVotes === 0) {
            return 0
        }
        
        return Math.round((selectedChoice.count / totalVotes) * 100)
    }
    
    const ShowChart = () => {
        console.log(poll)

        let voteData = [['Option', 'Number of votes']]
        for (let i = 0; i < poll.choices.length; i ++) {
            voteData.push([poll.choices[i].name, poll.choices[i].count])
            console.log("here is voteData: ", voteData)
        }

        // let sampleVoteData = [
        //     ['Task', 'Hours per Day'],
        //     ['Work', 11],
        //     ['Eat', 2],
        //     ['Commute', 2],
        //     ['Watch TV', 2],
        //     ['Sleep', 7],
        //   ]
        return (
            <Chart chartType="PieChart"
                options={{ title: poll.title }}
                graph_id={"PollPieChart"}
                width="400px" height="400px"
                data={voteData}
                legend_toggle />
        );
    }

    return (
        <div className="container mx-auto px-5">
            <h1 className="text-3xl text-center my-10">Welcome to the Voting Platform</h1>
            <p className='pb-6 text-center'>Please cast your vote, or click on "View Results" to see this poll's statistics.</p>
            {poll ? (
                <div className="w-full max-w-3xl mx-auto bg-white shadow">
                    <header className='px-5 py-4 flex justify-between items-center'>
                        {poll.title}

                        {voted && <span>{getTotalVotes()} votes</span>}

                        <Button onClick={() => setVoted(true)}>View results</Button>
                    </header>

                    {poll.choices.map(choice => {
                        return (
                            <div className='px-5 py-4 border-t border-gray-400 flex justify-between items-center' key={choice._id}>
                                {choice.name}

                                {voted ? (
                                    <span className='text-blue-500'> {getChoicePercentage(choice)}% </span>
                                ) :  <Button onClick={() => vote(choice._id)}>Vote</Button>}
                            </div>
                        )
                    })}
                </div>
            ) : null}
            <div className='px-5 py-4 border-t border-gray-400 flex justify-between content-center'>
                {voted ? (
                    <span>
                        {ShowChart()}
                    </span>
                ) : null}
            </div>
            <p className='py-6'>Note: This application detects your public IP address so you can vote only once. We do not use this information in any other way.</p>
        </div>
    )
}
