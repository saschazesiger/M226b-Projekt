'use client'

import { useState, useEffect } from 'react';
import fetchAuth from "@/client-js/fetchAuth";

export default function Time(props) {
    const [alert, setAlert] = useState("");
    const [time, setTime] = useState(props.time);
    const [logs, setLogs] = useState([]);

    let inOut
    if (props.action === true) {
        inOut = "OUT";
    } else {
        inOut = "IN";
    }

    const handleChange = (event) => {
            setTime(event.target.value);
    };

    const handleInputBlur = async (event) => {
        console.log(event.target.getAttribute('field'));
        const response = await fetchAuth(`https://api-time.tinyweb.net/api/edit?entry=${event.target.getAttribute('field')}&time=${(new Date(`${event.target.getAttribute('date')} ${event.target.value}`)).toISOString()} `, 'POST');
        console.log(response);
        if (response.success) {
            setTimeout(() => { setAlert("") }, 2000);
            setLogs([]);
            setAlert("Änderung erfolgreich");
        }
    };


    async function handleDelete() {
        await fetchAuth(`https://api-time.tinyweb.net/api/edit?entry=${props.id}&delete=true`, "POST");
        props.setNewTime(props.newTime + 1);
    }

    async function handleLogs() {
        const response = await fetchAuth(`https://api-time.tinyweb.net/api/logview?entry=${props.id}`, "GET");
        
        if(response.logs.length > 0){
            setLogs(response.logs);
        }else{
            setTimeout(() => { setAlert("") }, 2000);
            setLogs([]);
            setAlert("Originales Datum");
        }
        console.log(response);
    }


    return (
        <div className="contentDiv" style={{ width: '50%' }}>
            <p className="alert">{alert}</p>
            <h3>{props.date} <b style={{color:'red'}}>{inOut}</b></h3>
            <div className='row'>
            <input
                style={{ width: "96%", margin: "2%", textAlign: "center" }}
                type="time"
                field={props.id}
                step="1"
                value={time}
                date={props.date}
                placeholder='Datum & Uhrzeit'
                onChange={handleChange}
                onBlur={handleInputBlur}
                className="form__input"
            />
            <button className='btn btn__primary' style={{margin:"2%"}} onClick={handleLogs}>View Logs</button>
            <button className='btn btn__primary' style={{margin:"2%"}} onClick={handleDelete}>DELETE</button>
            </div>
            {logs.map((entry, index) => (
                <p key={index}>Changed at: {new Date(entry.changeAt).toLocaleDateString('en-GB')}, Old Time: {new Date(entry.oldDatetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            ))}
            
        </div>
    );
}