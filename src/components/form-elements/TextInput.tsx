import React from 'react';
import { FormikErrors, FormikTouched, useField } from 'formik';
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
  inputCssClass?: string;
  labelCssClass?: string;
}

const TextInput: React.FC<InputProps> = ({
  label,
  inputCssClass,
  labelCssClass,
  ...props
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  //console.log(field);
  //console.log(meta);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={`${meta.touched && meta.error ? 'label--err' : ''}`}
      >
        {label}
      </label>
      <input
        className={`${inputCssClass ? inputCssClass : ''} ${
          meta.touched && meta.error ? styles['input--invalid'] : ''
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles['input--error']}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextInput;
