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
        let response
        response = await fetchAuth("https://api-time.tinyweb.net/api/view", "GET");
        if (response.entries.length !== 0) {
            if (response.entries[0].action === false) {
                console.log("Entry FALSE")
                setAction("OUT");
            } else {
                console.log("Entry TRUE")
                setAction("IN");
            }
        } else {
            console.log("No Entry")
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


    async function sendNew() {
        let response
        if (action === "OUT") {
            response = await fetchAuth(`https://api-time.tinyweb.net/api/set?inout=true`, "POST");
        } else {
            response = await fetchAuth(`https://api-time.tinyweb.net/api/set`, "POST");
        }
        console.log(response)
        setNewTime(newTime + 1);
    }

    return (
        <>
            <p className="alert">{alert}</p>
            <div className="contentDiv" style={{ width: '30%' }}>
                <p className="alert">{alert}</p>
                <h3>{props.date}</h3>
                <button className="btn btn__primary" style={{ width: "96%", margin: "2%", textAlign: "center" }} onClick={sendNew}>{action}</button>

            </div>
            {props.time.map((entry, index) => (
                <Time id={entry.id} key={index} time={entry.time.clock} date={entry.time.date} action={entry.action} setNewTime={setNewTime} newTime={newTime} />
            ))}
        </>
    )
}