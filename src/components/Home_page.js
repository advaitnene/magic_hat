import React, {useState, useEffect, useRef} from 'react'
import Hat from '../images/hat.png';
import "../css/Home_page.css"
import Time_Modal from './Time_Modal';
import Game_Rules from './Game_Rules';
import {data} from "../data/data.js";

const Home_page = () => {
    //State to handle the timing functionality(setInterval/clearInterval).
    const myInterval = useRef(null)

    //Stores all the questions that are present in the dataset.
    const [questions, setQuestions] = useState(data.questions)

    //State to display the question when clicked on the hat.
    const [displayQuestion, setDisplayQuestion] = useState("")

    //Flag to open/close the time change modal.
    const [timeFreqModalFlag, setTimeFreqModalFlag] = useState(false)

    //State to store the time in seconds. Also passed to the Time Modal when user updates the time.
    const [timeFreq, setTimeFreq] = useState(60)

    //State to store the time and convert it in MM:SS format.
    const [timer, setTimer] = useState(timeFreq)

    //State to display the remaining time to answer the question.
    const [displayTime, setDisplayTime] = useState("")

    //Flag to display the rules of the game on page load.
    const [gameRulesFlag, setGameRulesFlag] = useState(true)

    //Function to display a new question when user clicks on the hat.
    const displayNewQuestion = () => {
        if (myInterval) {
            clearInterval(myInterval.current)
        }
        setTimer(timeFreq)
        if(questions.length > 0) {
            pickNewQuestion(questions, data.questions)
        } else {
            //setDisplayQuestion("You have answered all the questions!")
            //let temp = [...questions, data.questions]
            //setQuestions(data.questions)
            pickNewQuestion(questions, data.questions)
        }
    }

    const pickNewQuestion = (questions, data) => {
        if (questions.length > 0) {
            let randomNumber = Math.floor(Math.random() * (questions.length - 1));
            const newQuestions = questions.filter((element, index) => {
                return randomNumber !== index;
            });
            setDisplayQuestion(questions[randomNumber].question)
            setQuestions(newQuestions)
        } else {
            let randomNumber = Math.floor(Math.random() * (data.length - 1));
            const newQuestions = data.filter((element, index) => {
                return randomNumber !== index;
            });
            setDisplayQuestion(data[randomNumber].question)
            setQuestions(newQuestions)
        }
        myInterval.current = setInterval(startTimer, 1000)
    }

    //Function to update the remaining time after every one second.
    const startTimer = () => {
        setTimer((prevState) => {return prevState - 1})
    }

    const openTimeFreqModal = () => {
        setTimeFreqModalFlag(true)
    }

   useEffect(() => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    //Depending on the number of seconds remaining, the code displays the time in MM:DD format.
    if (timer > 0) {
        if (minutes < 10 && seconds < 10) {
            setDisplayTime(`0${minutes}:0${seconds}`)
        } else if (minutes < 10) {
            setDisplayTime(`0${minutes}:${seconds}`)
        } else if (seconds < 10) {
            setDisplayTime(`${minutes}:0${seconds}`)
        } else {
            setDisplayTime(`${minutes}:${seconds}`)
        }
    } else {
        setDisplayTime(`00:00`)
        displayNewQuestion()
    }
   },[timer])

    return (
        <div className='alignment'>
            {gameRulesFlag && <Game_Rules setGameRulesFlag = {setGameRulesFlag} />}
            <h1>The Magic Hat</h1>
            <h2 className='textInputStyle'>Click on the hat to get a new question!</h2>
            <img src={Hat} alt="Girl in a jacket" width="400" height="400" onClick={displayNewQuestion}/>
            <button className='buttonStyle' onClick={openTimeFreqModal}>Change Frequency</button>
            {timeFreqModalFlag && <Time_Modal setTimeFreq = {setTimeFreq} setTimer = {setTimer} setTimeFreqModalFlag = {setTimeFreqModalFlag} />}
            <p className='timerStyle'>{displayTime}</p>
            <p className='textInputStyle'>{displayQuestion}</p>
        </div>
    )
}

export default Home_page;