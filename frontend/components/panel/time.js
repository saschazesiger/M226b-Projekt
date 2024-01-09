'use client'

import { useState, useEffect } from 'react';
import fetchAuth from "@/client-js/fetchAuth";

export default function Time(props) {
    const [alert, setAlert] = useState("");
    const [time, setTime] = useState(props.time);

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
        console.log(handleDate(event.target.getAttribute('date'), event.target.value))
        const response = await fetchAuth(`https://api-time.tinyweb.net/api/edit?entry=${event.target.getAttribute('field')}&time=${(new Date(`${event.target.getAttribute('date')} ${event.target.value}`)).toISOString()} `, 'POST');
        console.log(response);
        if (response.success) {
            setTimeout(() => { setAlert("") }, 2000);
            setAlert("Änderung erfolgreich");
        }
    };

    function handleDate(date,time) {
        console.log()
        //return new Date(`${date} ${time}`);
    }

    


    return (
        <div className="contentDiv" style={{ width: '30%' }}>
            <p className="alert">{alert}</p>
            <h3>{props.date} <b style={{color:'red'}}>{inOut}</b></h3>
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

        </div>
    );
}