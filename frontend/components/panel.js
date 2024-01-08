'use client'

import { useState } from 'react';

import UserPanel from "@/components/panel/userpanel";


export default function Panel(props) {
  const [location, getLocation] = useState("time");

  function logout() {
    localStorage.removeItem("jwt");
    props.setLogin({ state: "loggedout" })
  }

  const isActive = (buttonLocation) => {
    return location === buttonLocation ? "btn btn__secondary active" : "btn btn__secondary";
  }

  return (
    <>
      <div className='header'>
        <button className={isActive('user')} onClick={() => getLocation('user')}>Benutzerverwaltung</button>
        <button className={isActive('time')} onClick={() => getLocation('time')}>Zeiterfassung</button>
        <button className="btn btn__secondary" onClick={logout}>Logout</button>
      </div>
      <br />
      {location === "time" && <p>time</p>}
      {location === "user" && <UserPanel users={props.users} />}
    </>
  );
}
