'use client'

import { useState, useEffect } from 'react';
import fetchAuth from "@/client-js/fetchAuth";

export default function UserPanel(props) {
    const [alert, setAlert] = useState("");
    const [email, setEmail] = useState(props.users.own.email);


    async function handleUserEdit(e) {
        e.preventDefault();
        const response = await fetchAuth("https://api-time.tinyweb.net/user/edit");

        console.log(response)
        if (response?.success === true) {
            setAlert("Successfully updated!");
        } else {
            setGreeting("");
            setAlert("Error while updating!");

        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleInputBlur = async (event) => {

        console.log(event.target.value)
        console.log(event.target.id)

        const response = await fetchAuth("https://api-time.tinyweb.net/user/edit?firstname=heiner", 'POST', { firstname: "heinre" })
        console.log(response)
        
    }




    return (
        <div className="contentDiv">
            <div>
                <p className="alert">{alert}</p>
                <form onSubmit={handleUserEdit}>

                    <input
                        style={{ width: "40%", margin: "2%" }}
                        type="text"
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleInputBlur} // Add onBlur event handler
                        className="form__input"
                    />
                    <input
                        style={{ width: "40%", margin: "2%" }}
                        placeholder={props.users.own.firstname}
                        id="firstname"
                        className="form__input"
                    />
                    <input
                        style={{ width: "40%", margin: "2%" }}
                        placeholder={props.users.own.surname}
                        id="surname"
                        className="form__input"
                    />
                    <button type="submit" style={{ margin: "auto" }} className="btn btn__primary">Änderungen speichern</button>
                </form>
            </div>
            {props.users.user.map((user, index) => (
                <p key={index}>{user.username}</p>
            ))}
        </div>
    );
}