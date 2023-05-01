import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom"

import { accountService } from '../../services/account-service';

export default function Account() {

    let navigate = useNavigate();

    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.userValue) {
            navigate('/');
            //  window.history.push('/');  FIX THIS!
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    )
}