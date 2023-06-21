import React, {useState} from 'react';
import '../css/timeModal.css';

const TimeModal = ({setTimeFreq, setTimer, setTimeFreqModalFlag}) => {
    //State to store the changed time frequency that is set by the user.
    const [minutes, setMinutes] = useState()

    const updateTimer = (e) => {
        setMinutes(e.target.value)
    }

    //Function to close the Modal and update the timer value on the Home component.
    const closeTimeFreqModal = () => {
        if (!isNaN(parseFloat(minutes)) && isFinite(minutes)) {
            setTimer(minutes * 60)
            setTimeFreq(minutes * 60)
        }
        setTimeFreqModalFlag(false)
    }

    return (
        <div className='modalStyle'>
            <div className='modalContent'>
                <h3>Enter the new frequency to change questions</h3>
                <div className='modalAlignment'>
                    <input className='modalTextInput' placeholder='Enter time (in minutes)...' value={minutes} onChange={updateTimer}/>
                    <button className='modalButton' onClick={closeTimeFreqModal}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default TimeModal