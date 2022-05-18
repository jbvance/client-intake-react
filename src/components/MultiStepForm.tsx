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
    isLast: activeStepIndex === steps.length - 1,
  };

  const stepComponents = [
    <ClientInfo isFirst={props.isFirst} isLast={props.isLast} />,
    <ExecutorForm />,
  ];

  return <div>{stepComponents[activeStepIndex]}</div>;
};

export default MultiStepForm;
