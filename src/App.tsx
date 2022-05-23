import { createContext, useState } from 'react';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
export const FormContext = createContext({
  activeStepIndex: 0,
  setActiveStepIndex: (prevState: number) => {},
  steps: ['client-info', 'children', 'dpoa']
});

function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const steps = ['client-info', 'children', 'dpoa'];
  return (
    <FormContext.Provider
      value={{ activeStepIndex, setActiveStepIndex, steps }}
    >
      <div className="container">
        <MultiStepForm />
      </div>
    </FormContext.Provider>
  );
}

export default App;
