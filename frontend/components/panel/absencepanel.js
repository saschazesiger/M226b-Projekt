'use client'

import React from 'react';
import { useState, useEffect } from 'react';

import fetchAuth from "@/client-js/fetchAuth";
import Time from './time.js';

export default function AbsencePanel(props) {
    const [alert, setAlert] = useState("");
    const [absenceName, setAbsenceName] = useState("");
    const [absenceFrom, setAbsenceFrom] = useState("");
    const [absenceTo, setAbsenceTo] = useState("");
    const [newTime, setNewTime] = useState(1);
    useEffect(() => {
        handleData();
    }, [newTime]);

    async function handleData() {
        let response
        response = await fetchAuth("https://api-time.tinyweb.net/absence/view", "GET");
        console.log(response)
        props.setAbsence(response.absences);
    }

    const handleChangeName = (event) => {
        setAbsenceName(event.target.value);
    };

    const handleChangeFrom = (event) => {
        setAbsenceFrom(event.target.value);
    };
    const handleChangeTo = (event) => {
        setAbsenceTo(event.target.value);
    };

    async function sendNew() {
        let response
        response = await fetchAuth(`https://api-time.tinyweb.net/absence/set?type=${absenceName}&from=${new Date(absenceFrom)}&to=${new Date(absenceTo)}`, "POST");
        console.log(response)
        setNewTime(newTime + 1);
    }

    return (
        <>
            <p className="alert">{alert}</p>
            <div className="contentDiv" style={{ width: '30%' }}>
                <p className="alert">{alert}</p>
                <h3>{props.date}</h3>
                <input
                    style={{ width: "96%", margin: "2%", textAlign: "center" }}
                    id="absence_name"
                    step="1"
                    placeholder='Ereignis'
                    value={absenceName}
                    onChange={handleChangeName}
                    className="form__input"
                />
                <input
                    style={{ width: "96%", margin: "2%", textAlign: "center" }}
                    type="date"
                    id="absence_from"
                    step="1"
                    placeholder='Von'
                    value={absenceFrom}
                    onChange={handleChangeFrom}
                    className="form__input"
                />
                <input
                    style={{ width: "96%", margin: "2%", textAlign: "center" }}
                    type="date"
                    field="to"
                    step="1"
                    placeholder='Bis'
                    value={absenceTo}
                    onChange={handleChangeTo}
                    className="form__input"
                />
                <button className="btn btn__primary" style={{ width: "96%", margin: "2%", textAlign: "center" }} onClick={sendNew}>Neue Absenz erstellen</button>

            </div>
            {props.absence && props.absence.map((entry, index) => (
                <div className="contentDiv" style={{ width: '97%' }} key={index}>
                    <p className="alert">{alert}</p>
                    <h3>{entry['absence_type']} <b  style={{color:'red'}}>{entry.approved ? <b  style={{color:'red'}}>Genehmigt</b> : <b  style={{color:'red'}}>Bisher nicht genemigt</b>}</b></h3>
                    <p>Von: {new Date(entry.to).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    <p>Bis: {new Date(entry.from).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                </div>
            ))}
        </>
    )
}