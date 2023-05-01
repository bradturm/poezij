import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
//import { history } from '../../navigation/historyx';

import { accountService } from '../../../services/account-service';
import { alertService } from '../../../services/alert-service';

//export default function VerifyEmail({ history }) {

export default function VerifyEmail() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

    useEffect(() => {

        const { token } = queryString.parse(window.location.search);

        // remove token from url to prevent http referer leakage
        // history.replace(window.location.pathname); // CHANGE IN REACT-ROUTER-DOM v6 - REFACTOR TO CLOSE ALERT PROPERLY ON NAVIGATION ELSEWHERE

        accountService.verifyEmail(token)
            .then(() => {
                alertService.success(t('verify_email_1'), { keepAfterRouteChange: true });
                navigate('/account/login');

            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [EmailStatus.Failed]);

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>{t('verify_email_2')}</div>;
            case EmailStatus.Failed:
                return <div>{t('verify_email_3')} <Link to="forgot-password">{t('verify_email_4')}</Link>.</div>;
            default:
                return
        }
    }

    return (
        <div>
            <h3 className="card-header">{t('verify_email_5')}</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}