import React from 'react';
import { useEffect, useRef, useState, useContext } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import StepHeader from './StepHeader';
import TextInput from './form-elements/TextInput';
import Select from './form-elements/Select';
import { RootState } from '../store';
import { FormContext } from '../App';
import IChild from '../store/children-slice';

interface IChildrenProps {
  isFirst: boolean;
  isLast: boolean;
  id: string;
}

const ChildrenForm: React.FC<IChildrenProps> = (props) => {
  const initialState = useSelector((state: RootState) => state.children);
  console.log(initialState);
  const dispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const formId = props.id;
  return (
    <>
      <StepHeader header="Children">
        <h4>
          (Married couples should enter any children from your current marriage
          as well as any children that either spouse has from a prior
          relationship.). If you have no children, enter '0' and click 'Next'.
        </h4>
      </StepHeader>
      <Formik
        initialValues={{
          ...initialState,
          numChildren: initialState.length,
        }}
        onSubmit={(values, { setSubmitting }) => {
          //console.log('VALUES', values);
          //dispatch(childActions.XXXXXXXXXXXXXXXXXXX);
        }}
      >
        {(props) => {
          console.log(props);
          return (
            <Form id={formId}>
              <div className="form-group">
                <div className="input-group">
                  <TextInput
                    label="How many children do you have?"
                    name="numChildren"
                    type="number"
                    inputCssClass="input-control"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ChildrenForm;
