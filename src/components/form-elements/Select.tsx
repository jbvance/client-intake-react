import React from 'react';
import { useField } from 'formik';
import styles from './Select.module.css';
import './Select.module.css';

interface SelectProps {
  label: string;
  name: string;
  id?: string;
  children: React.ReactNode[];
  labelStyle?: object;
}

const Select: React.FC<SelectProps> = ({ label, labelStyle, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className={`${
          meta.touched && meta.error ? styles['select--error'] : ''
        }`}
        style={labelStyle}
      >
        {label}
      </label>
      <select {...field} {...props} className="minimal" />
      {meta.touched && meta.error ? (
        <div className={styles['select--error']}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Select;
