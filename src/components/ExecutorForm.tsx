import React from 'react';
import StepHeader from './StepHeader';

const ExecutorForm = () => {
  return (
    <>
      <StepHeader header="Executor">
        <h3 style={{ textAlign: 'center' }}>
          WHO DO YOU WANT TO NAME AS THE EXECUTOR OF YOUR ESTATE?
        </h3>
        <h4>
          (Spouses normally name each other first. The Executor is the personal
          representative who will windup your affairs, pay remaining debts, and
          distribute property to the persons/trusts named in your Will.)
        </h4>
      </StepHeader>
    </>
  );
};

export default ExecutorForm;
