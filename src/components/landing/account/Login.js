import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService } from '../../../services/account-service';
import { alertService } from '../../../services/alert-service';

import styles from "../../../css/Forms.module.css";

export default function Login() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('sign_in_1'))
            .required(t('sign_in_2')),
        password: Yup.string().required(t('sign_in_3'))
    });

    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.login(email, password)
            .then(() => {
                navigate('/home');
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
                                <h3>{t('sign_in_4')}</h3>

                                <Field name="email" type="text"
                                    placeholder={t('sign_in_5')}
                                    className={`${styles.formControl} ${(errors.email && touched.email) ? styles.isInvalid : ""}`}
                                />
                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="email" component="span" className={`${styles.invalidFeedback}`} />
                                </div>
                                <Field name="password" type="password"
                                    placeholder={t('sign_in_6')} autoComplete="off"
                                    className={`${styles.formControl} ${(errors.password && touched.password) ? styles.isInvalid : ""}`}
                                />
                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="password" component="span" className={`${styles.invalidFeedback}`} />
                                </div>


                                <button type="submit" disabled={isSubmitting} className={`${styles.formControl} ${styles.formBtn}`}>
                                    {t('sign_in_7')}
                                </button>
                                <div className={`${styles.formText}`}>
                                    {t('sign_in_8')} <Link to="../register" className="btn btn-link"> {t('sign_in_9')}</Link>  {t('sign_in_10')}
                                </div>
                                <div className={`${styles.formText}`}>
                                    <Link to="../forgot-password" className="btn btn-link pr-0"> {t('sign_in_11')}</Link>
                                </div>


                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

    )
}