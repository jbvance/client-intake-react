import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
import AuthForm from './components/AuthForm';
import store from './store';
import { AuthContext } from './context/authContext';
import { useAuth } from './hooks/useAuth';

export const FormContext = createContext({
  activeStepIndex: 0,
  setActiveStepIndex: (prevState: number) => {},
  steps: ['client-info', 'children', 'dpoa'],
});

type ChildrenProps = {
  children: JSX.Element;
  token: string | null;
};
export const ProtectedRoute = ({
  children,
  token,
}: ChildrenProps): JSX.Element => {
  //const { token } = useAuth();
  console.log('IN PROTECTED ROUTE', token);
  if (!token) {
    // user is not authenticated
    return <Navigate to="/auth" />;
  }
  return children;
};

function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { token, user, login, logout } = useAuth();
  console.log('USER', user);
  console.log('TOKEN', token);
  const steps = ['client-info', 'children', 'dpoa'];

  //console.log('IN APP', token);
  return (
    <React.StrictMode>
      <AuthContext.Provider
        value={{
          token,
          isLoggedIn: !!token,
          user,
          login,
          logout,
        }}
      >
        <FormContext.Provider
          value={{ activeStepIndex, setActiveStepIndex, steps }}
        >
          <BrowserRouter>
            <Provider store={store}>
              <Routes>
                <Route
                  path="/"
                  element={token ? <MultiStepForm /> : <AuthForm />}
                />
                <Route path="/auth" element={<AuthForm />} />
              </Routes>
            </Provider>
          </BrowserRouter>
        </FormContext.Provider>
      </AuthContext.Provider>
    </React.StrictMode>
  );
}

export default App;
