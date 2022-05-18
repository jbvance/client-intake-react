import { createContext, useState, Dispatch, SetStateAction } from 'react';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
export const FormContext = createContext({
  activeStepIndex: 0,
  setActiveStepIndex: (prevState: number) => {},
});

function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  return (
    <FormContext.Provider value={{ activeStepIndex, setActiveStepIndex }}>
      <div className="container">
        <MultiStepForm />
      </div>
    </FormContext.Provider>
  );
}

export default App;
