import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm  = ({ values, errors, touched, status }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (status) {
            setUser([...user, status]);
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
        <div>
            {touched.name && errors.name && (
                <p className="error">{errors.name}</p>
            )} 
            
            {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
            )}

            {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
                
            )}

            {touched.termsofservice && errors.termsofservice && (
                <p className="error">{errors.termsofservice}</p>
                
            )}
        </div>
        {user.map(item => (
        <ul key={item.id}>
          <li>Name:{item.name}</li>
          <li>Email: {item.email}</li>
          <li>Password: {item.password}</li>
        </ul>
     
        ))}
    </div>

    
);
};


const FormikUserForm = withFormik({
    maxPropsToValues({ name, email, password, termsofservice}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsofservice: termsofservice || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("You must enter a name"),
        email: Yup.string().required("You must enter an Email"),
        password: Yup.string().min(9, "Password must be 9 characters long").required(),
        // termsofservice: Yup.boolean().oneOf([true], "you Must agree to our Terms and Services to continue")
    }),

handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(UserForm);

console.log("This is the User Data", FormikUserForm);



export default FormikUserForm;