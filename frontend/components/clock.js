'use client'

import classes from './clock.module.css';
import { useState } from 'react';


export default function Clock() {
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();


    setInterval(() => {
        let today = new Date();
        let h = (today.getHours())%24*360
        let m = (today.getMinutes())*6; 
        let s = (today.getSeconds())*6; 
        setHours(h)
        setMinutes(m)
        setSeconds(s)
    }, 1000)

  return (
    <>
      <div className={classes.clock}>
        <div style={{ transform: `rotate(${hours}deg)` }}  className={`${classes.hand} ${classes.hours}`}></div>
        <div style={{ transform: `rotate(${minutes}deg)` }} className={`${classes.hand} ${classes.minutes}`}></div>
        <div style={{ transform: `rotate(${seconds}deg)` }} className={`${classes.hand} ${classes.seconds}`}></div>
        <div className={classes.point}></div>
        <div className={classes.marker}>
          <span className={classes.marker__1}></span>
          <span className={classes.marker__2}></span>
          <span className={classes.marker__3}></span>
          <span className={classes.marker__4}></span>
        </div>
      </div>
    </>
  );
}
