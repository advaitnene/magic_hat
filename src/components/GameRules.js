import React from 'react'
import '../css/gameRules.css'

const GameRules = ({setGameRulesFlag}) => {
    return (
        <div className='modalStyle'>
            <div className='modalContent'>
                <h2 className='modalHeader'>Welcome to the Magic Hat game!!</h2>
                <h2>Here are the rules:</h2>
                <ul className='modalListStyle'>
                    <li>Click on the hat to get a new question.</li>
                    <li>You will need to answer a question before the timer ends.</li>
                    <li>You can change the timer value if you need additional time.</li>
                </ul>
                <h2>Very important note:</h2>
                <p className='modalListStyle'>Don't forget to have fun !</p>
                <button className='modalButton' onClick={() => setGameRulesFlag(false)}>Let's start!</button>
            </div>
        </div>
    )
}

export default GameRules