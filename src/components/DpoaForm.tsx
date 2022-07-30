import React from 'react';
import { useContext } from 'react';
import { Formik, Form, FieldArray, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle } from 'react-icons/fa';
import StepHeader from './StepHeader';
import Checkbox from './form-elements/Checkbox';
import { RootState } from '../store';
import { dpoaActions, setDpoaValues } from '../store/dpoa-slice';
import { FormContext } from '../App';
import { IDpoa } from '../store/dpoa-slice';
import Button from './form-elements/Button';
import { AppDispatch } from '../store';
import Alert from './ui-elements/Alert';
import Agent from './Agent';

const newAgent = {
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};
interface IDpoaProps {
  id: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const DpoaForm: React.FC<IDpoaProps> = (props) => {
  const initialState = useSelector((state: RootState) => state.dpoa);
  const clientInfoState = useSelector((state: RootState) => state.clientInfo);
  const isMarried = clientInfoState.married.toUpperCase() === 'Y';
  const { firstName, spouseFirstName } = clientInfoState;
  const dispatch: AppDispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const formId = props.id;
  const { isFirst, isLast } = props;

  const dpoaValidationSchema = Yup.object().shape({
    agents: Yup.array()
      .of(
        Yup.object().shape({
          firstName: Yup.string().required('First name is required'),
          middleName: Yup.string(),
          lastName: Yup.string().required('Last Name is required'),
          address: Yup.string(),
          city: Yup.string(),
          state: Yup.string(),
          zip: Yup.string(),
        })
      )
      .required('Please add at least one agent')
      .min(1, 'Please add at least one agent'),
  });

  return (
    <>
      <StepHeader header="Durable Power of Attorney">
        <h4>
          (This power of attorney is for financial and business matters. Spouses
          normally name each other first. This power of attorney gives the
          person or persons you name the power to sign your name if you are not
          able to do so. For instance, it can be used to transfer money, sign a
          deed, or sign a tax return.)
        </h4>
      </StepHeader>
      <div className="form-group"></div>
      <Formik
        initialValues={{
          ...initialState,
        }}
        validationSchema={dpoaValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('VALUES', values);
          dispatch(setDpoaValues(values));
          if (!isLast) {
            setActiveStepIndex(activeStepIndex + 1);
          }
        }}
      >
        {(formProps) => {
          //console.log(initialState);
          return (
            <Form id={formId}>
              <div
                className="input-group"
                style={{
                  border: '1px solid gray',
                  padding: '0px 2px 10px 10px',
                }}
              >
                <h3>When should this document become effective?</h3>
                <Checkbox name="effectiveImmediately">
                  Check the box to have the document become effective as soon as
                  you sign it. If you do not check the box, your agent will not
                  be able to act on your behalf until a doctor has certified in
                  writing that you are unable to manage your own financial
                  affairs.
                </Checkbox>
              </div>
              <div
                className="input-group"
                style={{
                  border: '1px solid gray',
                  padding: '0px 2px 10px 10px',
                }}
              >
                <h3>Do you want to allow your agent to make gifts?</h3>
                <Checkbox name="allowGifts">
                  Check the box to allow your agent to make gifts of your
                  property.
                </Checkbox>
              </div>
              <div
                className="input-group"
                style={{
                  border: '1px solid gray',
                  padding: '0px 2px 10px 10px',
                }}
              >
                <h3>
                  Add one or more agents below. The agents will serve in the
                  order listed.
                </h3>
                <FieldArray
                  name="agents"
                  render={(arrayHelpers) => {
                    const AgentArrayErrors: JSX.Element =
                      typeof formProps.errors.agents === 'string' &&
                      formProps.getFieldMeta('agents').touched ? (
                        <Alert
                          variant="danger"
                          message={formProps.errors.agents}
                        />
                      ) : (
                        <></>
                      );
                    return (
                      <div>
                        <div>
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.push({ ...newAgent })}
                          >
                            Add an Agent
                            <FaPlusCircle
                              style={{
                                margin: '0 5px',
                                verticalAlign: 'baseline',
                              }}
                            />
                          </Button>
                        </div>
                        {formProps.values.agents.map((agent, index) => (
                          /* Start of individual agent */
                          <div key={index} className="person-info-container">
                            <Agent index={index} />
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

                          /* End individual agent */
                        ))}
                        {AgentArrayErrors}
                      </div>
                    );
                  }}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default DpoaForm;
