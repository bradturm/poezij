import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService } from '../../../services/account-service';
import { alertService } from '../../../services/alert-service';

import styles from "../../../css/Register.module.css";

export default function Register({ setTermsPopupShown }) {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const initialValues = {
        // title: '',
        firstName: '',
        prefix: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required(t('register_1')),
        prefix: Yup.string(),
        lastName: Yup.string()
            .required(t('register_2')),
        email: Yup.string()
            .email(t('register_3'))
            .required(t('register_4')),
        password: Yup.string()
            .min(6, t('register_5'))
            .required(t('register_6')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('register_7'))
            .required(t('register_8')),
        acceptTerms: Yup.bool()
            .oneOf([true], t('register_9'))
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.register(fields)
            .then(() => {
                alertService.success(t('register_10'), { keepAfterRouteChange: true });
                navigate("/");
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function showTerms() {
        setTermsPopupShown(true);
    }

    return (
        <div>
            <div className={`${styles.container}`} >
                <div className={`${styles.inner}`} >
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <h3>{t('register_11')}</h3>

                                <Field name="firstName" type="text"
                                    placeholder={t('register_12')}
                                    className={`${styles.formControl} ${(errors.firstName && touched.firstName) ? styles.isInvalid : ""}`}
                                />
                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="firstName" component="span" className={`${styles.invalidFeedback}`} />
                                </div>

                                <Field name="prefix" type="text"
                                    placeholder={t('register_13')}
                                    className={`${styles.formControl}`}
                                />

                                <Field name="lastName" type="text"
                                    placeholder={t('register_14')}
                                    className={`${styles.formControl} ${(errors.lastName && touched.lastName) ? styles.isInvalid : ""}`}
                                />
                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="lastName" component="span" className={`${styles.invalidFeedback}`} />
                                </div>

                                <Field name="email" type="text"
                                    placeholder={t('register_15')}
                                    className={`${styles.formControl} ${(errors.email && touched.email) ? styles.isInvalid : ""}`}
                                />
                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="email" component="span" className={`${styles.invalidFeedback}`} />
                                </div>

                                <Field name="password" type="password"
                                    placeholder={t('register_16')} autoComplete="off"
                                    className={`${styles.formControl} ${(errors.password && touched.password) ? styles.isInvalid : ""}`}
                                />
                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="password" component="span" className={`${styles.invalidFeedback}`} />
                                </div>

                                <Field name="confirmPassword" type="password"
                                    placeholder={t('register_17')} autoComplete="off"
                                    className={`${styles.formControl} ${(errors.confirmPassword && touched.confirmPassword) ? styles.isInvalid : ""}`}
                                />
                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="confirmPassword" component="span" className={`${styles.invalidFeedback}`} />
                                </div>

                                <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                <label htmlFor="acceptTerms" className={`${styles.label}`}>
                                    &nbsp; {t('register_18')} </label><span className={`${styles.link}`} onClick={showTerms}>{t('register_19')}</span>

                                <div>
                                    <span className={`${styles.invalidFeedback}`}>&nbsp;</span>
                                    <ErrorMessage name="acceptTerms" component="span" className={`${styles.invalidFeedback}`} />
                                </div>

                                <button type="submit" disabled={isSubmitting} className={`${styles.formControl} ${styles.formBtn}`}>
                                    {t('register_20')}
                                </button>

                                <div className={`${styles.formText}`}>
                                    <Link to="/" className="btn btn-link pr-0">{t('register_21')}</Link>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

    )
}