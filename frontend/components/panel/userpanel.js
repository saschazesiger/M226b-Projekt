
import User from './user.js';
import React from 'react';

export default function UserPanel(props) {

    return (
        <>
            <User id={props.users.own.id} email={props.users.own.email} firstname={props.users.own.firstname} surname={props.users.own.surname} username={props.users.own.username} />

            <br /><br /><br />
            {props.users.user.length !== 0 && <h2>Andere Benutzer</h2>}
            <br />
            {props.users.user.map((user) => (
                <React.Fragment key={user.id}>
                    <User key={user.id} id={user.id} email={user.email} firstname={user.firstname} surname={user.surname} username={user.username} />
                </React.Fragment>
            ))}
        </>
    )
}