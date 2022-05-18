import React from 'react';
import styles from './StepHeader.module.css';

interface HeaderProps {
  header: string;
  children?: JSX.Element | JSX.Element[];
}

const StepHeader: React.FC<HeaderProps> = ({ header, children }) => {
  return (
    <>
      <div className={styles['step-header']}>
        <h1>{header}</h1>
      </div>
      {children}
    </>
  );
};

export default StepHeader;
