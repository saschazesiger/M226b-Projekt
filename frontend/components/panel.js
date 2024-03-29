'use client'

import { useState } from 'react';

import UserPanel from "@/components/panel/userpanel";
import TimePanel from "@/components/panel/timepanel";
import AbsencePanel from '@/components/panel/absencepanel';


export default function Panel(props) {
  const [location, getLocation] = useState("time");
  const [time, setTime] = useState([]);
  const [absence, setAbsence] = useState([]);

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
        <button className={isActive('absence')} onClick={() => getLocation('absence')}>Absenzen</button>
        <button className="btn btn__secondary" onClick={logout}>Logout</button>
      </div>
      <br />
      {location === "time" && <TimePanel time={time} setTime={setTime} />}
      {location === "user" && <UserPanel users={props.users} />}
      {location === "absence" && <AbsencePanel users={props.users} absence={absence} setAbsence={setAbsence} />}
    </>
  );
}
