import React, { useContext, useState } from 'react';
import ClientInfo from './ClientInfo';
import { FormContext } from '../App';
import Footer from './Footer';
import ExecutorForm from './ExecutorForm';

const MultiStepForm = () => {
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const steps = ['client-info', 'executor'];

  const props = {
    isFirst: activeStepIndex === 0,
    isLast: activeStepIndex === steps.length - 1
  };

  const stepComponents = [
    <ClientInfo isFirst={props.isFirst} id={steps[0]} />,
    <ExecutorForm />
  ];

  return (
    <div>
      {stepComponents[activeStepIndex]}
      <Footer id={steps[activeStepIndex]} {...props} />
    </div>
  );
};

export default MultiStepForm;
