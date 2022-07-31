import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
import AuthForm from './components/AuthForm';
import store from './store';

export const FormContext = createContext({
  activeStepIndex: 0,
  setActiveStepIndex: (prevState: number) => {},
  steps: ['client-info', 'children', 'dpoa'],
});

function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const steps = ['client-info', 'children', 'dpoa'];
  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
}

export default App;
