import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from "../../../css/Forms.module.css";

import { accountService } from '../../../services/account-service';
import { alertService } from '../../../services/alert-service';

export default function ForgotPassword() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('forgot_pw_1'))
            .required(t('forgot_pw_2'))
    });

    function onSubmit({ email }, { setSubmitting }) {
        alertService.clear();
        accountService.forgotPassword(email)
            .then(() => {
                alertService.success(t('forgot_pw_3'));
                navigate("/");
            })
            .catch(error => alertService.error(error))
            .finally(() => {
                setSubmitting(false);

            }
            )
    }

    return (
        <div>
            <div className={`${styles.container}`} >

                <div className={`${styles.inner}`} >
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <h3>{t('forgot_pw_4')}</h3>
                                <div className={`${styles.formText} ${styles.formText15}`}>
                                    {t('forgot_pw_4a')}
                                </div>
                                <Field name="email" type="text"
                                    placeholder={t('forgot_pw_5')}
                                    className={`${styles.formControl} ${(errors.email && touched.email) ? styles.isInvalid : ""}`}
                                />
                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="email" component="span" className={`${styles.invalidFeedback}`} />
                                </div>
                                <button type="submit" disabled={isSubmitting} className={`${styles.formControl} ${styles.formBtn}`}>
                                    {t('forgot_pw_6')}
                                </button>

                                <div className={`${styles.formText}`}>
                                    <Link to="/">{t('forgot_pw_7')}</Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

    )
}