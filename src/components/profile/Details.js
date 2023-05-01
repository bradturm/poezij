import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '../../services/account-service';

export default function Details() {

    const user = accountService.userValue;

    return (
        <div>
            <h1>My Profile</h1>
            <p>
                <strong>Name: </strong> {user.firstName} {user.prefix} {user.lastName}<br />
                <strong>Email: </strong> {user.email}
            </p>
            <p><Link to="/home/profile/update">Update Profile</Link></p>
        </div>
    )
}