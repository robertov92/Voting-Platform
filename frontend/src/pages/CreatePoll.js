import { Link, useHistory } from 'react-router-dom';
import React, { useState, Fragment } from 'react'

import NavBar from '../components/NavBar';

export default function CreatePoll() {
    let history = useHistory()
    if (!localStorage.getItem("userId")) {
        history.push('/signup')
    }
    const [title, setTitle] = useState('')
    const [choices, setChoices] = useState([''])
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState({})

    const addAnswer = () => {
        setChoices([
            ...choices,
            ''
        ])
    }

    const removeChoice = (index) => {
        const newChoices = choices.filter((choice, choiceIndex) => {
            return choiceIndex !== index
        })

        setChoices(newChoices)
    }

    const onChoiceChange = (index, value) => {
        const newChoices = choices.map((choice, choiceIndex) => {
            if (choiceIndex === index) {
                return value
            }

            return choice
        })

        setChoices(newChoices)
    }
/*  I dont want to use localStorage to save the polls anymore
    const updatePollsToLocalStorage = (successData) => {
        const existingPolls = JSON.parse(localStorage.getItem('polls')) || []

        const updatedPolls = [
            ...existingPolls,
            {
                title,
                id: successData.pollId
            }
        ]

        localStorage.setItem('polls', 
        JSON.stringify(updatedPolls))
    }*/

    const createPoll = async () => {
        const response = await fetch(`http://3.97.6.204:4000/polls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                userId : localStorage.getItem("userId"),
                title,
                choices
                
            })
        })


        const data = await response.json()

        if (! response.ok) {
            setErrors(data)

            return
        }

        setSuccess(data)
        //updatePollsToLocalStorage(data)
    }

    return (
        <>
        <NavBar />
        <div className="container mx-auto px-6 ">
            <h1 className='text-3xl text-center my-10'>Create a New Poll</h1>
          <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-white">

              {success.pollId ? (
                  <div className="py-5 px-8">
                      <p className="text-gray-800 py-3">Poll created successfully! Click on the link to see your poll, or copy it to share it with others!</p>
                      <div className="w-full mb-2 bg-green-100 text-green-500 border border-green-500 rounded py-3 px-2">
                          <Link to={`/polls/${success.pollId}`}>
                          http://3.97.6.204/#/polls/{success.pollId}
                          </Link>
                      </div>
                  </div>
              ) : null}

              {!success.pollId ? (
                <div className="py-5 px-8">
                  {errors.length > 0 ? (
                      <Fragment>
                          {errors.map((error, index) => (
                              <p key={index} className='w-full mb-2 bg-red-500 text-white py-3 px-2 rounded'>{error.message}</p>
                          ))}
                      </Fragment>
                  ): null}
                  <div className="mb-6">
                      <label htmlFor="title" className="text-sm mb-2 inline-block">Enter the title of the poll:</label>
                      <input onChange={(event) => setTitle(event.target.value)} value={title}  name='title' id='title' type="text" className='w-full py-2 border border-gray-400 rounded px-4' />
                  </div>

                  <div className="mb-3">
                    <label className="text-sm mb-2 inline-block">Enter all the possible answers for this poll:</label>
                    {choices.map((choice, index) => (
                        <div key={index} className="w-full flex items-center mb-2">
                            <input onChange={(event) => onChoiceChange(index, event.target.value)} key={index} type="text" value={choice} className='w-full py-2 border border-gray-400 rounded px-4' />
                            <button onClick={() => removeChoice(index)} className='py-2 ml-2 px-3 bg-red-500 text-white rounded hover:bg-red-600'>Remove</button>
                        </div>
                    ))}
                  </div>

                  <button onClick={addAnswer} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Add choice</button>

                  <div className="mt-12 mb-6 text-center">
                    <button onClick={createPoll} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Create Poll</button>
                  </div>
                </div>
              ) : null}
          </div>
       </div>
       </>
    )
}
