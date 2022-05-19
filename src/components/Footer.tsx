import React, { useContext } from 'react';
import Button from './form-elements/Button';
import styles from './Footer.module.css';
import { FormContext } from '../App';

interface IFooterProps {
  prev?: () => void;
  values?: {};
  isLast?: boolean;
  isFirst?: boolean;
  id?: string;
}
const Footer: React.FC<IFooterProps> = (props: any) => {
  const { steps, activeStepIndex, setActiveStepIndex } =
    useContext(FormContext);
  const isLast = activeStepIndex === steps.length - 1;
  const isFirst = activeStepIndex === 0;

  return (
    <div className={styles.footer}>
      <div className={styles['footer-item']}>
        {!isFirst && (
          <Button
            type="button"
            onClick={() => setActiveStepIndex(activeStepIndex - 1)}
          >
            Back
          </Button>
        )}
      </div>
      <div className={styles['footer-item']}>
        <Button type="formik-submit" form={props.id}>
          {isFirst ? 'Next' : isLast ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default Footer;
