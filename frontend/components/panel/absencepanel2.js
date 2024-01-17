'use client'

import React from 'react';
import { useState, useEffect } from 'react';

import fetchAuth from "@/client-js/fetchAuth";
import Time from './time.js';

export default function AbsencePanel(props) {
    const [alert, setAlert] = useState("");
    const [absence, setAbsence] = useState("");
    const [newTime, setNewTime] = useState(1);
    useEffect(() => {
        handleData();
    }, [newTime]);

    async function handleData() {
        let response
        response = await fetchAuth(`https://api-time.tinyweb.net/absence/view?username=${props.username}`, "GET");
        console.log(response)
        setAbsence(response.absences);
    }

    async function handleApprove(e) {
         let response = await fetchAuth(`https://api-time.tinyweb.net/absence/approve?id=${e.target.id}`, "POST");
         console.log(response)
        setAbsence(response.absences);
        setNewTime(newTime + 1);
    }

    return (
        <>
        <h2>Absenzen</h2>
            {absence && absence.map((entry, index) => (
                <div className="contentDiv text-center" style={{ width: '97%' }} key={index}>
                    <p className="alert">{alert}</p>
                    <div className='row'>
                        <div style={{ width: '100%' }}>
                            <h3>{entry['absence_type']} <b style={{ color: 'red' }}></b></h3>
                            <p>Von: {new Date(entry.to).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            <p>Bis: {new Date(entry.from).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                        </div>
                        {!entry.approved ? <button className='btn btn__primary' id={entry.id} onClick={handleApprove}>Genehmigen</button> : <b style={{ color: 'green',margin: '1rem 5rem 1rem 4rem' }}>Genehmigt</b>}
                    </div>
                </div>
            ))}
        </>
    )
}