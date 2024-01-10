'use client'

import classes from './clock.module.css';
import { useEffect, useState } from 'react';


export default function Clock() {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  let today = new Date();
  let h = today.getHours() % 12 * 30;
  let m = (today.getMinutes()) * 6;
  let s = (today.getSeconds()) * 6;

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count = count + 1
      if (count > 1000) {
        set2()
      }
      h = (h + 0.0003)
      m = (m + 0.003)
      s = (s + 0.03)
      setHours(h)
      setMinutes(m)
      setSeconds(s)
    }, 10)
    function set2() {
      clearInterval(interval)
      const interval2 = setInterval(() => {
        if (h > 0) {
          h = h - 0.7
        } else if (m > 0) {
          m = m - 0.7
        } else if (s > 0) {
          s = s - 0.7
        }
        setHours(h)
        setMinutes(m)
        setSeconds(s)
        if(h < 0 && m < 0 && s < 0){
          clearInterval(interval2)
          setTimeout(() => {
            set3()
          }, 1000);
        }
      }, 10)
    }
    function set3() {
      setInterval(() => {
        h = (h + 0.006) * 1.006
        m = (m + 0.01) * 1.01
        s = (s + 0.03) * 1.01
        setHours(h)
        setMinutes(m)
        setSeconds(s)
      }, 10)
    }
  }, [])


  return (
    <>
      <div className={classes.clock}>
        <div style={{ transform: `rotate(${hours}deg)` }} className={`${classes.hand} ${classes.hours}`}></div>
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
