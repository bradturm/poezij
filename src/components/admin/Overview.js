import React from 'react';
import { Link } from 'react-router-dom';

export default function Overview() {
    return (
        <div>
            <p><Link to='users'>Manage Users</Link></p>
        </div>
    )
}