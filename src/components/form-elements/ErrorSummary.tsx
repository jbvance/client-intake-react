import React from 'react';
import Alert from '../ui-elements/Alert';

interface ErrorSummaryProps {
  errors: any;
}

const ErrorSummary: React.FC<ErrorSummaryProps> = ({ errors }) => {
  return (
    <Alert
      variant="danger"
      message="Please correct the following errors:"
      messageObject={errors}
    />
  );
};

export default ErrorSummary;
