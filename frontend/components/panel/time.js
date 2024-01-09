'use client'

import { useState, useEffect } from 'react';
import fetchAuth from "@/client-js/fetchAuth";

export default function Time(props) {
    const [alert, setAlert] = useState("");
    const [time, setTime] = useState(props.time);



    const handleChange = (event) => {
        if (event.target.getAttribute('field') === "time") {
            setTime(event.target.value);
        }

    };

    const handleInputBlur = async (event) => {
        console.log(event.target.value);
        console.log(event.target.id);
        console.log(event.target.getAttribute('fieldId'));
        console.log(`https://api-time.tinyweb.net/user/edit?entry=${event.target.getAttribute('fieldId')}&${event.target.getAttribute('datetime')}=${event.target.value}`)
        const response = await fetchAuth(`https://api-time.tinyweb.net/api/edit?entry=${event.target.getAttribute('fieldId')}&${event.target.getAttribute('datetime')}=${event.target.value}`, 'POST');
        console.log(response);
        if (response.success) {
            setTimeout(() => { setAlert("") }, 2000);
            setAlert("Änderung erfolgreich");
        }
    };




    return (
        <div className="contentDiv" style={{width:'30%'}}>
            <p className="alert">{alert}</p>
            <h4>{props.date}</h4>
            <input
                style={{ width: "84%", margin: "2%" }}
                type="time"
                field='time'
                fieldId={props.id}
                value={time}
                placeholder='Datum & Uhrzeit'
                onChange={handleChange}
                onBlur={handleInputBlur}
                className="form__input"
            />

        </div>
    );
}