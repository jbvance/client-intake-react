import React, { useContext } from 'react';
import ClientInfo from './ClientInfo';
import { FormContext } from '../App';
import Footer from './Footer';
import ExecutorForm from './ExecutorForm';
import ChildrenForm from './ChildrenForm';

const MultiStepForm = () => {
  const { activeStepIndex } = useContext(FormContext);
  const steps = ['client-info', 'children', 'executor'];

  const props = {
    isFirst: activeStepIndex === 0,
    isLast: activeStepIndex === steps.length - 1,
  };

  const stepComponents = [
    <ClientInfo isFirst={props.isFirst} id={steps[0]} />,
    <ChildrenForm {...props} id={steps[1]} />,
    <ExecutorForm />,
  ];

  return (
    <div>
      {stepComponents[activeStepIndex]}
      <Footer id={steps[activeStepIndex]} {...props} />
    </div>
  );
};

export default MultiStepForm;
