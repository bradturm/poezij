import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import { history } from '../../navigation/historyx';  // CHANGE IN REACT-ROUTER-DOM v6 - REFACTOR TO CLOSE ALERT PROPERLY ON NAVIGATION ELSEWHERE
import queryString from 'query-string';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from "../../../css/Forms.module.css";

import { accountService } from '../../../services/account-service';
import { alertService } from '../../../services/alert-service';

//export default function ResetPassword({ history }) {
export default function ResetPassword() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }

    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

    useEffect(() => {
        const { token } = queryString.parse(window.location.search);

        // remove token from url to prevent http referrer leakage
        // history.replace(window.location.pathname);  // CHANGE IN REACT-ROUTER-DOM v6 - REFACTOR TO CLOSE ALERT PROPERLY ON NAVIGATION ELSEWHERE

        accountService.validateResetToken(token)
            .then(() => {
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid);
            });
    }, [TokenStatus.Invalid, TokenStatus.Valid]);

    function getForm() {
        const initialValues = {
            password: '',
            confirmPassword: ''
        };

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .min(6, t('reset_pw_1'))
                .required(t('reset_pw_2')),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], t('reset_pw_3'))
                .required(t('reset_pw_4')),
        });

        function onSubmit({ password, confirmPassword }, { setSubmitting }) {
            alertService.clear();
            accountService.resetPassword({ token, password, confirmPassword })
                .then(() => {
                    alertService.success(t('reset_pw_5'), { keepAfterRouteChange: true });
                    //history.push('login');  // CHANGE IN REACT-ROUTER-DOM v6 - REFACTOR TO CLOSE ALERT PROPERLY ON NAVIGATION ELSEWHERE
                    navigate('/account/login');
                })
                .catch(error => {
                    setSubmitting(false);
                    alertService.error(error);
                });
        }

        return (
            <div>
                <div className={`${styles.container}`} >

                    <div className={`${styles.inner}`} >
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ errors, touched, isSubmitting }) => (
                                <Form>
                                    <h3>{t('reset_pw_6')}</h3>

                                    <Field name="password" type="password"
                                        placeholder={t('reset_pw_7')} autoComplete="off"
                                        className={`${styles.formControl} ${(errors.password && touched.password) ? styles.isInvalid : ""}`}
                                    />
                                    <div>
                                        <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                        <ErrorMessage name="password" component="span" className={`${styles.invalidFeedback}`} />
                                    </div>

                                    <Field name="confirmPassword" type="password"
                                        placeholder={t('reset_pw_8')} autoComplete="off"
                                        className={`${styles.formControl} ${(errors.confirmPassword && touched.confirmPassword) ? styles.isInvalid : ""}`}
                                    />
                                    <div>
                                        <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                        <ErrorMessage name="confirmPassword" component="span" className={`${styles.invalidFeedback}`} />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className={`${styles.formControl} ${styles.formBtn}`}>
                                        {t('reset_pw_9')}
                                    </button>
                                    <div className={`${styles.formText}`}>
                                        <Link to="/" className="btn btn-link">{t('reset_pw_10')}</Link>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

        )
    }


    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm();
            case TokenStatus.Invalid:
                return <div>Token validation failed, if the token has expired you can get a new one at the <Link to="forgot-password">forgot password</Link> page.</div>;
            case TokenStatus.Validating:
                return <div>Validating token...</div>;
            default:
                return
        }
    }

    return (
        <div>
            <h3 className="card-header">Reset Password</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}