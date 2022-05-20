import React from 'react';
import { useEffect, useRef, useState, useContext } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle, FaRegTrashAlt } from 'react-icons/fa';
import StepHeader from './StepHeader';
import TextInput from './form-elements/TextInput';
import Select from './form-elements/Select';
import { RootState } from '../store';
import { FormContext } from '../App';
import IChild from '../store/children-slice';
import Button from './form-elements/Button';

interface IChildrenProps {
  isFirst: boolean;
  isLast: boolean;
  id: string;
}

const newChild = {
  firstName: '',
  middleName: '',
  lastname: ''
};

const ChildrenForm: React.FC<IChildrenProps> = (props) => {
  const initialState = useSelector((state: RootState) => state.children);
  //console.log(initialState);
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
      <div className="form-group"></div>
      <Formik
        initialValues={{
          children: [...initialState]
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('VALUES', values);
          //dispatch(childActions.XXXXXXXXXXXXXXXXXXX);
        }}
      >
        {(formProps) => {
          //console.log(formProps);
          //console.log(initialState);

          return (
            <Form id={formId}>
              <FieldArray
                name="children"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      <div>
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push({ ...newChild })}
                        >
                          Add a child
                          <FaPlusCircle
                            style={{
                              margin: '0 5px',
                              verticalAlign: 'baseline'
                            }}
                          />
                        </Button>
                      </div>
                      {formProps.values.children.map((child, index) => (
                        /* Start of individual child */
                        <div key={index} className="person-info-container">
                          <div className="form-group">
                            <div className="input-group">
                              <TextInput
                                label="First Name"
                                name={`children.${index}.firstName`}
                                type="text"
                                placeholder="First Name"
                                inputCssClass="input-control"
                              />
                            </div>
                            <div className="input-group">
                              <TextInput
                                label="Middle Name or Initial"
                                name={`children.${index}.middleName`}
                                type="text"
                                placeholder="Middle name or initial"
                                inputCssClass="input-control"
                              />
                            </div>
                            <div className="input-group">
                              <TextInput
                                label="Last Name"
                                name={`children.${index}.lastName`}
                                type="text"
                                placeholder="Middle name or initial"
                                inputCssClass="input-control"
                              />
                            </div>
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                padding: '5px'
                              }}
                            >
                              <FaRegTrashAlt
                                className="icon-button icon-button--danger"
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            </div>
                          </div>
                        </div>

                        /* End individual child */
                      ))}
                    </div>
                  );
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ChildrenForm;
