'use client'

import { useState, useEffect, Children } from 'react';
import fetchAuth from "@/client-js/fetchAuth";

export default function User(props) {
    const [alert, setAlert] = useState("");
    const [email, setEmail] = useState(props.email);
    const [firstname, setFirstname] = useState(props.firstname);
    const [surname, setSurname] = useState(props.surname);


    const handleChange = (event) => {
        if (event.target.getAttribute('field') === "email") {
            setEmail(event.target.value);
        } else if (event.target.getAttribute('field') === "firstname") {
            setFirstname(event.target.value);
        } else if (event.target.getAttribute('field') === "surname") {
            setSurname(event.target.value);
        }

    };

    const handleInputBlur = async (event) => {
        console.log(event.target.value);
        console.log(event.target.id);
        console.log(event.target.getAttribute('username'));
        const response = await fetchAuth(`https://api-time.tinyweb.net/user/edit?username=${event.target.getAttribute('username')}&${event.target.getAttribute('field')}=${event.target.value}`, 'POST');
        console.log(response);
        if (response.success) {
            setTimeout(() => { setAlert("") }, 2000);
            setAlert("Änderung erfolgreich");
        }
    };




    return (
        <div>
            <p className="alert">{alert}</p>

            <input
                style={{ width: "84%", margin: "2%" }}
                type="text"
                field='email'
                username={props.username}
                value={email}
                placeholder='E-Mail'
                onChange={handleChange}
                onBlur={handleInputBlur}
                className="form__input"
            />
            <input
                style={{ width: "40%", margin: "2%" }}
                type="text"
                field='firstname'
                username={props.username}
                value={firstname}
                placeholder='Vorname'
                onChange={handleChange}
                onBlur={handleInputBlur}
                className="form__input"
            />
            <input
                style={{ width: "40%", margin: "2%" }}
                type="text"
                field='surname'
                username={props.username}
                value={surname}
                placeholder='Nachname'
                onChange={handleChange}
                onBlur={handleInputBlur}
                className="form__input"
            />
        </div>
    );
}