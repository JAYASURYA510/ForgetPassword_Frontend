import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .test('gmail', 'Only Gmail email addresses are allowed', (value) => {
                return value.endsWith('@gmail.com');
            })
            .required('gmail is required'),
    });

    const handleSubmit = (values) => {
        axios.post('https://forget-password-backend.onrender.com/forgot-password', { email: values.email })
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className='card'>
                <h4>Forgot Password</h4>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="gmail">
                                    <strong>gmail</strong>
                                </label>
                                <Field
                                    type="gmail"
                                    placeholder="Enter gmail"
                                    autoComplete="off"
                                    name="gmail"
                                    className="form-control rounded-0"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <Button type="submit" disabled={isSubmitting} variant="btn btn-outline-primary">
                                Send
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotPassword;
