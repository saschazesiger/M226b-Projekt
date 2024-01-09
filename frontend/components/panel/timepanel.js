'use client'

import React from 'react';
import { useState, useEffect } from 'react';

import fetchAuth from "@/client-js/fetchAuth";
import Time from './time.js';

export default function TimePanel(props) {

    const [alert, setAlert] = useState("");

    useEffect(() => {
        handleData();
    }, []);

    async function handleData() {
        if (props.time.length === 0) {
            const response = await fetchAuth("https://api-time.tinyweb.net/api/view", "GET");
            console.log(response)
            if (response?.success === true) {
                const updatedTime = response.entries.map(entry => {
                    const dateTime = new Date(entry.time);
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const date = dateTime.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
                    return { ...entry, time: { clock: time, date: date } };
                });
                props.setTime(updatedTime);
            } else {
                setAlert(response.message);
            }
        }
    }

    return (
        <>
            <p className="alert">{alert}</p>
            {props.time.map((entry, index) => (
                    <Time id={entry.id} key={index} time={entry.time.clock} date={entry.time.date} />
            ))}
        </>
    )
}