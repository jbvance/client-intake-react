import React from 'react';

const defaultStyles = {
  width: '95%',
  margin: '20px auto',
  fontSize: '1.5rem',
  padding: '2px 0px 20px 0px',
  borderRadius: '0.25rem',
};

const dangerStyles = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  borderColor: '#f5c6cb',
};

const successStyles = {
  backgroundColor: '#d1e7dd',
  color: '#0f5132',
  borderColor: '#badbcc',
};

const headingStyles = {
  margin: '5px',
};

interface ErrorMessageProps {
  variant: string;
  message: string;
  messageObject?: {} | null;
}

const displayObject = (obj: { [key: string]: any }) => {
  if (obj && Object.keys(obj).length > 0) {
    return Object.keys(obj).map((key) => (
      <li style={{ marginLeft: '10px' }} key={key}>
        {obj[key]}
      </li>
    ));
  }
};

const Alert: React.FC<ErrorMessageProps> = ({
  variant,
  message,
  messageObject = null,
}) => {
  let customStyles = {};

  switch (variant.toLowerCase()) {
    case 'danger':
      customStyles = dangerStyles;
      break;
    case 'success':
      customStyles = successStyles;
      break;
  }

  const styles = { ...defaultStyles, ...customStyles };
  return (
    <div style={styles}>
      <h4 style={headingStyles}>{message}</h4>
      {messageObject &&
        Object.keys(messageObject).length &&
        displayObject(messageObject)}
    </div>
  );
};

export default Alert;
