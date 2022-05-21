import React, { useContext } from 'react';
import ClientInfo from './ClientInfo';
import { FormContext } from '../App';
import Footer from './Footer';
import ExecutorForm from './ExecutorForm';
import ChildrenForm from './ChildrenForm';
import DpoaForm from './DpoaForm';

const MultiStepForm = () => {
  const { activeStepIndex, steps } = useContext(FormContext);

  const props = {
    isFirst: activeStepIndex === 0,
    isLast: activeStepIndex === steps.length - 1,
  };

  const stepComponents = [
    <ClientInfo id={steps[0]} />,
    <ChildrenForm {...props} id={steps[1]} />,
    <DpoaForm {...props} id={steps[2]} />,
  ];

  return (
    <div>
      {stepComponents[activeStepIndex]}
      <Footer id={steps[activeStepIndex]} {...props} />
    </div>
  );
};

export default MultiStepForm;
