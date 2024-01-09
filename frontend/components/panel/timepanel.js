'use client'

import React from 'react';
import { useState, useEffect } from 'react';

import fetchAuth from "@/client-js/fetchAuth";
import Time from './time.js';

export default function TimePanel(props) {
    const [action, setAction] = useState("");
    const [alert, setAlert] = useState("");
    const [newTime, setNewTime] = useState(1);

    useEffect(() => {
        handleData();
    }, [newTime]);

    async function handleData() {
        if (props.time.length === 0) {
            const response = await fetchAuth("https://api-time.tinyweb.net/api/view", "GET");
            console.log("First Entry:" + `${JSON.stringify(response.entries[0])}`)
            if (response.entries.length !== 0){
            if ( response.entries[0].action === true) {
                setAction("OUT");
            } else {
                setAction("IN");
            }
        } else {
            setAction("IN")
        }
            if (response?.success === true) {
                const updatedTime = response.entries.map(entry => {
                    const dateTime = new Date(entry.time);
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    const date = dateTime.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
                    return { ...entry, time: { clock: time, date: date } };
                });
                props.setTime(updatedTime);
            } else {
                setAlert(response.message);
            }
        }

    }

    




    async function sendNew(e) {
        e.preventDefault();
        let actionBool
        if (action === "IN") {
            actionBool = 1;
        } else {
            actionBool = 0;
        }
        const response = await fetchAuth(`https://api-time.tinyweb.net/api/set?action=${actionBool}`, "POST");
    }

    return (
        <>
            <p className="alert">{alert}</p>
            <div className="contentDiv" style={{ width: '30%' }}>
                <p className="alert">{alert}</p>
                <h3>{props.date}</h3>
                <form>
                    <input
                        style={{ width: "96%", margin: "2%", textAlign: "center" }}
                        name='time'
                        type="time"
                        placeholder='Aktuelle Uhrzeit'
                        className="form__input"
                    />
                    <button className="btn btn__primary" style={{ width: "96%", margin: "2%", textAlign: "center" }} onClick={sendNew}>{action}</button>
                </form>

            </div>
            {props.time.map((entry, index) => (
                <Time id={entry.id} key={index} time={entry.time.clock} date={entry.time.date} action={entry.action} />
            ))}
        </>
    )
}