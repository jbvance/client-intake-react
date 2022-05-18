import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

interface IButtonProps {
  children: any;
  type: 'button' | 'submit' | 'reset' | 'formik-submit' | undefined;
  danger?: boolean;
  disabled?: boolean;
  href?: string;
  inverse?: boolean;
  size?: string;
  to?: string;
  onClick?: () => void;
  form?: string;
}

const Button = (props: IButtonProps) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  if (props.type === 'formik-submit') {
    return (
      <input
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
        type="submit"
        disabled={props.disabled}
        value={props.children}
        form={props.form}
      />
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${
        props.inverse && 'button--inverse'
      } ${props.danger && 'button--danger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
