import { useState } from 'react';
import { Formik, useFormikContext, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from './form-elements/TextInput';
import Button from './form-elements/Button';
import classes from './AuthForm.module.css';

const AuthForm = (): JSX.Element => {
  const [login, setLogin] = useState(true);
  const initialState = {
    email: '',
    password: '',
  };

  return (
    <>
      <Formik
        initialValues={{
          ...initialState,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Email is required')
            .email('Invalid email addres'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log('VALUES', values);
        }}
      >
        <div className={`container ${classes['login-form']}`}>
          <h2 className={classes['login-header']}>
            {login ? 'Login' : 'Sign Up'}
          </h2>
          <Form>
            <div className="form-group">
              <div className="input-group">
                <TextInput
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="mike@example.com"
                  inputCssClass="input-control"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="password"
                  inputCssClass="input-control"
                />
              </div>
            </div>
            {login && (
              <div
                className={classes['login-status']}
                onClick={() => setLogin((login) => !login)}
              >
                Don't have an account? Sign up instead
              </div>
            )}
            {!login && (
              <div
                className={classes['login-status']}
                onClick={() => setLogin((login) => !login)}
              >
                Already have an account? Click here to log in
              </div>
            )}
            <div className="form-group">
              <Button type="submit">{login ? 'Login' : 'Sign Up'}</Button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default AuthForm;
