import { useState, useEffect, useContext } from 'react';
import { Formik, useFormikContext, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from './form-elements/TextInput';
import Button from './form-elements/Button';
import { useAxios } from '../hooks/useAxios';
import { AuthContext } from '../context/authContext';
import classes from './AuthForm.module.css';

const AuthForm = (): JSX.Element => {
  const [loginMode, setLoginMode] = useState(true);
  const authCtx = useContext(AuthContext);

  const initialState = {
    email: '',
    password: '',
  };

  const { axiosLoading, axiosError, response, fetchData } = useAxios();

  useEffect(() => {
    if (response && response.authToken) {
      console.log('RESPONSE', response);
      console.log(authCtx);
      authCtx.login &&
        authCtx.login(response.user, response.authToken, undefined);
      console.log('DONE LOGGING IN');
    }
  }, [response]);

  const loginOrSignup = async (
    loginMode: boolean,
    values: { email: string; password: string }
  ) => {
    if (loginMode) {
      try {
        await fetchData({
          url: `/auth/login`,
          method: 'POST',
          data: { ...values },
        });
      } catch (e) {
        console.log(e);
      }
    }
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
          loginOrSignup(loginMode, values);
        }}
      >
        <div className={`container ${classes['login-form']}`}>
          <h2 className={classes['login-header']}>
            {loginMode ? 'Login' : 'Sign Up'}
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
            {loginMode && (
              <div
                className={classes['login-status']}
                onClick={() => setLoginMode((loginMode) => !loginMode)}
              >
                Don't have an account? Sign up instead
              </div>
            )}
            {!loginMode && (
              <div
                className={classes['login-status']}
                onClick={() => setLoginMode((login) => !loginMode)}
              >
                Already have an account? Click here to log in
              </div>
            )}
            <div className="form-group">
              <Button type="submit">{loginMode ? 'Login' : 'Sign Up'}</Button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default AuthForm;
