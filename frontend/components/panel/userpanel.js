
import AbsencePanel2 from './absencepanel2.js';
import TimePanel2 from './timepanel2.js';
import User from './user.js';
import React from 'react';

export default function UserPanel(props) {

    return (
        <>
            <User id={props.users.own.id} email={props.users.own.email} firstname={props.users.own.firstname} surname={props.users.own.surname} username={props.users.own.username} />

            <br /><br /><br />
            {props.users?.user?.length !== 0 && <h2>Andere Benutzer</h2>}
            <br />
            {props.users.user.map((user) => (
                <React.Fragment key={user.id} >
                    <div key={user.id} className='contentDiv border'>
                    <User id={user.id} email={user.email} firstname={user.firstname} surname={user.surname} username={user.username} />
                    <TimePanel2 userId={user.id} username={user.username} />
                    <AbsencePanel2 userId={user.id} username={user.username} />
                    </div>
                </React.Fragment>
            ))}
        </>
    )
}