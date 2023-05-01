import React, { useEffect, useRef } from 'react';
import Select from "react-select";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService } from '../../services/account-service';
import { alertService } from '../../services/alert-service';

export default function AddEdit() {

    const formikRef = useRef();
    const navigate = useNavigate();

    const { id } = useParams();
    const isAddMode = !id;

    const initialValues = {
        firstName: '',
        prefix: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
    };

    const options = [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
    ]

    const validationSchema = Yup.object().shape({
        //title: Yup.string()
        //    .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        prefix: Yup.string().optional(),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        role: Yup.string()
            .required('Role is required'),
        password: Yup.string()
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createUser(fields, setSubmitting);
        } else {
            updateUser(id, fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting) {
        accountService.create(fields)
            .then(() => {
                alertService.success('User added successfully', { keepAfterRouteChange: true });
                // history.push('.');   FIX THIS!
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting) {
        accountService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                navigate("/admin/users");
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    /*
    const formikProps = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })
*/
    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            accountService.getById(id).then(user => {

                const fields = ['firstName', 'prefix', 'lastName', 'email', 'role'];
                if (formikRef.current) {
                    fields.forEach(field => formikRef.current.setFieldValue(field, user[field], false));
                }
            });
        }
    }, [id, isAddMode]);

    return (
        <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Prefix</label>
                            <Field name="prefix" type="text"
                                placeholder="Prefix"

                            />
                        </div>
                        <div className="form-group col-5">
                            <label>First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-7">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div>
                            <Select
                                options={options}
                            />

                        </div>
                        <div className="form-group col">
                            <label>Role</label>
                            <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                <option value=""></option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    {!isAddMode &&
                        <div>
                            <h3 className="pt-3">Change Password</h3>
                            <p>Leave blank to keep the same password</p>
                        </div>
                    }
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <Link to={isAddMode ? '..' : '..'} className="btn btn-link">Cancel</Link>
                    </div>
                </Form>
            )}
        </Formik>
    )
}