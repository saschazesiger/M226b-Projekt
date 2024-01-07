"use client";

import Panel from "@/components/panel";
import LoginForm from "@/components/login";

import fetchAuth from "@/client-js/fetchAuth";
import { useEffect, useState } from "react";

export default function Home() {
    const [greeting, setGreeting] = useState("");
    const [login, getLogin] = useState("loading");

    useEffect(() => {
        handleData();
    }, [login]); 

    async function handleData() {
        const response = await fetchAuth("https://api-time.tinyweb.net/user/list");

        console.log(response)
        if ( response?.own) {
            setGreeting(`Hi ${response.own.username.charAt(0).toUpperCase() + response.own.username.slice(1)}!`);
            getLogin("loggedin");
        } else {
            setGreeting("");
            getLogin("loggedout");
        }
    }

    return (
        <>
            {login === "loggedout" && <LoginForm getLogin={getLogin} />}
            <h1>
                <span>{greeting}</span>
                
            </h1>
            {login === "loggedin" && <Panel getLogin={getLogin} />}
            
        </>
    );
}
