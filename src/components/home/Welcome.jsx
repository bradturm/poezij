import React from 'react';

import { accountService } from '../../services/account-service';

export default function Welcome() {

    const user = accountService.userValue;

    return (
        <>
            <div>
                <div className="container">
                    <p>Hi {user?.firstName}! Nice to see you back.</p>
                </div>
            </div>
        </>
    )
}