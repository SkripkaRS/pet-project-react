import React, { memo } from "react";
import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContextInfo";

const Login = () => {
  const { login, setLogin } = useContext(UserContext);

  const onSubmit = ({login}) => {
    setLogin(login);
  };

  const validate = ({login}) => {
    const errors = {};

    if (!login) {
      errors.login = 'Username is required';
    }

    return errors;
  };
  
  return (
    <div>
      <div className="header">
        <span>Pizza day</span>
      </div>
      <div className="content">
        <div className="title">The best pizza</div>
        <div className="subtitle">
          Straight out of the oven, straight to you
        </div>
        <div className="form">
          <div className="form-title">Welcome! Please startby telling us your name:</div>
          <Formik initialValues={{ login }} onSubmit={onSubmit} validate={validate}>
            <Form>
              <div>
                <Field type="text" id="login" name="login" placeholder="Your full name"/>
                <ErrorMessage name="login" component="div" className="error-message"/>
              </div>

              <button className="submit-btn" type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
