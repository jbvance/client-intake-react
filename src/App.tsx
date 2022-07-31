import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { token, user, login, logout } = useAuth();
  //console.log('AUTH CTX', isLoggedIn);
  const steps = ['client-info', 'children', 'dpoa'];
  return (
    <React.StrictMode>
      <AuthContext.Provider
        value={{ token, isLoggedIn: !!token, user, login, logout }}
      >
        <FormContext.Provider
          value={{ activeStepIndex, setActiveStepIndex, steps }}
        >
          <BrowserRouter>
            <Provider store={store}>
              <Routes>
                <Route path="/" element={<MultiStepForm />} />
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
