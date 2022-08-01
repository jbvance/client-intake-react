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
import { childrenActions, setChildren } from '../store/children-slice';
import { FormContext } from '../context/formContext';
import IChild from '../store/children-slice';
import Button from './form-elements/Button';
import { AppDispatch } from '../store';

interface IChildrenProps {
  id: string;
}

const newChild = {
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  age: '',
  childParent: '',
};

const ChildrenForm: React.FC<IChildrenProps> = (props) => {
  const initialState = useSelector((state: RootState) => state.children);
  const clientInfoState = useSelector((state: RootState) => state.clientInfo);
  const isMarried = clientInfoState.married.toUpperCase() === 'Y';
  const { firstName, spouseFirstName } = clientInfoState;
  const dispatch: AppDispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const formId = props.id;

  const childValidationSchema = Yup.object().shape({
    children: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        middleName: Yup.string(),
        lastName: Yup.string().required('Last Name is required'),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        age: Yup.string(),
        childParent: Yup.string()
          .oneOf(['client1', 'client2', 'both'], 'Select the parent(s)')
          .required('Select the parent(s)'),
      })
    ),
  });

  return (
    <>
      <StepHeader header="Children">
        <h4>
          (Married couples should enter any children from your current marriage
          as well as any children that either spouse has from a prior
          relationship.). If there are no children, click 'Next'.
        </h4>
      </StepHeader>
      <div className="form-group"></div>
      <Formik
        initialValues={{
          children: [...initialState],
        }}
        validationSchema={childValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          //console.log('VALUES', values);
          dispatch(setChildren(values.children));
          setActiveStepIndex(activeStepIndex + 1);
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
                              verticalAlign: 'baseline',
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
                                placeholder="Last Name"
                                inputCssClass="input-control"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <TextInput
                                label="Address"
                                name={`children.${index}.address`}
                                type="text"
                                placeholder="Street address..."
                                inputCssClass="input-control"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group" style={{ flex: 6 }}>
                              <TextInput
                                label="City"
                                name={`children.${index}.city`}
                                type="text"
                                placeholder="City..."
                                inputCssClass="input-control"
                              />
                            </div>
                            <div className="input-group" style={{ flex: 1 }}>
                              <TextInput
                                label="State"
                                name={`children.${index}.state`}
                                type="text"
                                placeholder="State"
                                inputCssClass="input-control"
                              />
                            </div>
                            <div className="input-group" style={{ flex: 2 }}>
                              <TextInput
                                label="Zip"
                                name={`children.${index}.zip`}
                                type="text"
                                placeholder="Zip"
                                inputCssClass="input-control"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <TextInput
                                label="Age"
                                name={`children.${index}.age`}
                                inputCssClass="input-control"
                              />
                            </div>
                            {isMarried && (
                              <div className="input-group">
                                <Select
                                  label="Child's Parent"
                                  name={`children.${index}.childParent`}
                                  labelStyle={{ margin: 0 }}
                                >
                                  <option value="none">Select an option</option>
                                  <option value="both">Both clients</option>
                                  <option value="client1">{firstName}</option>
                                  <option value="client2">
                                    {spouseFirstName}
                                  </option>
                                </Select>
                              </div>
                            )}
                          </div>
                          <div>
                            <Button
                              onClick={() => arrayHelpers.remove(index)}
                              type="button"
                              danger
                            >
                              Delete
                            </Button>
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
