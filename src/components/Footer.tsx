import React from 'react';
import Button from './form-elements/Button';

interface IFooterProps {
  prev?: () => void;
  values?: {};
  isLast?: boolean;
  isFirst?: boolean;
}
const Footer: React.FC<any> = (props: any) => {
  return (
    <div>
      {!props.isFirst && (
        <Button type="button" onClick={() => props.prev(props.values)}>
          Back
        </Button>
      )}
      <Button type="button" onClick={props.onClick}>
        {props.isFirst ? 'Next' : 'Submit'}
      </Button>
    </div>
  );
};

export default Footer;
