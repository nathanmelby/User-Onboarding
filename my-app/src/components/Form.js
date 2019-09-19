import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const userForm  = ({values, errors, touched, status }) => {
    const [user, setUser] => useState([]);
    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }
}, [status]);

return (
    <div className='user-form'>
        <h1>Hello, Please Sign Up Below</h1>
        <Form>
            <Field type="text" name="name" placeholder="Enter Your Full Name" />

            <Field type="email" name="email" placeholder="Enter Your Email" />

            <Field type="password" name="password" placeholder="Enter a Password" />

            <label>
                I agree to the terms of service
            <Field type="checkbox" name="termsofservice" checked={values.termsofservice} />
            </label>

            <button>Submit</button>
        </Form>
    </div>

)