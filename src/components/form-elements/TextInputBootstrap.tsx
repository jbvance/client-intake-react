import React from 'react';
import { FormikErrors, FormikTouched, useField } from 'formik';
import Form from 'react-bootstrap/Form';
import styles from './TextInput.module.css';

interface InputProps {
  label: string;
  name: string;
  id?: string;
  type?: string;
  placeholder?: string;
  errors?: FormikErrors<{
    [field: string]: any;
  }>;
  touched?: FormikTouched<{
    [field: string]: any;
  }>;
  autofocus?: boolean;
  disabled?: boolean;
  useColon?: boolean;
}

const TextInput: React.FC<InputProps> = ({ label, useColon, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Label>{label}:</Form.Label>
      <Form.Control
        className={`text-input ${
          meta.touched && meta.error ? styles['input--invalid'] : ''
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className={styles['input--error']}>{meta.error}</div>
      )}
    </>
  );
};

export default TextInput;
