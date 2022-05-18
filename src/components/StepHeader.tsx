import React from 'react';
import styles from './StepHeader.module.css';

interface HeaderProps {
  header: string;
}

const StepHeader = ({ header }: HeaderProps) => {
  return (
    <>
      <div className={styles['step-header']}>
        <h1>{header}</h1>
      </div>
    </>
  );
};

export default StepHeader;
