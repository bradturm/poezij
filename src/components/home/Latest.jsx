import React from 'react';

import { accountService } from '../../services/account-service';

export default function Dashboard() {

    const user = accountService.userValue;

    return (
        <>
            <div className="p-4">
                <div className="container">
                    <h1>Latest</h1>
                    <p>New version coming soon!</p>
                </div>
            </div>
        </>
    )
}