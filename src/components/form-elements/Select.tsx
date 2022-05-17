import React from 'react';
import { useField } from 'formik';
import styles from './Select.module.css';
import './Select.module.css';

interface SelectProps {
  label: string;
  name: string;
  id?: string;
  children: React.ReactNode[];
}

const Select: React.FC<SelectProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className={`${
          meta.touched && meta.error ? styles['select--invalid'] : ''
        }`}
      >
        {label}
      </label>
      <select {...field} {...props} className="minimal" />
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </div>
  );
};

export default Select;
