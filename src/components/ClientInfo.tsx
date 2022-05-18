import { useRef, useState, useContext } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clientInfoActions } from '../store/client-info-slice';
import TextInput from './form-elements/TextInput';
import Select from './form-elements/Select';
import Button from './form-elements/Button';
import ErrorSummary from './form-elements/ErrorSummary';
import { RootState } from '../store';
import { IClientInfo } from '../store/client-info-slice';
import Footer from './Footer';
import { FormContext } from '../App';

const ClientInfo = (props: any) => {
  const dispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);

  const initialState: IClientInfo = useSelector(
    (state: RootState) => state.clientInfo
  );
  const [userErrors, setUserErrors] = useState<Object | null>(null);
  type FormValues = {};
  const formRef = useRef<FormikProps<FormValues>>(null);

  const handleSubmit = async () => {
    // Try to submit the form
    setUserErrors(null);
    if (formRef.current?.values) {
      formRef.current.handleSubmit();
    } else {
      return;
    }
    // If form did not submit because of errors, handle here
    const errors = await formRef.current?.validateForm(formRef.current.values);
    if (errors && Object.keys(errors).length > 0) {
      setUserErrors(errors);
    } else {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  return (
    <>
      <div className="step-header">
        <h1>Client Info</h1>
      </div>
      <Formik
        innerRef={formRef}
        initialValues={{
          ...initialState,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('First Name is required'),
          lastName: Yup.string()
            .max(20, 'Last Name Must be 20 characters or less')
            .required('Last Name is equired'),
          middleName: Yup.string().max(
            20,
            'Middle Name must be 20 characters or less'
          ),
          address: Yup.string().required('Address is required'),
          city: Yup.string().max(40).required('City is required'),
          state: Yup.string().required('State is required'),
          zip: Yup.string().max(30).required('Zip Code is required'),
          county: Yup.string()
            .max(30, 'County is limited to 30 characters')
            .required('County is required'),
          phone: Yup.string().required('Phone No. is required'),
          occupation: Yup.string(),
          employer: Yup.string(),
          married: Yup.string()
            .required('Select a marital status')
            .oneOf(['Y', 'N']),

          // email: Yup.string()
          //   .email('Invalid email address')
          //   .required('Required'),
          // acceptedTerms: Yup.boolean()
          //   .required('Required')
          //   .oneOf([true], 'You must accept the terms and conditions.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          //console.log(values);
          dispatch(clientInfoActions.updateClientInfo({ ...values }));
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
        }}
      >
        <Form>
          <div className="form-group">
            <div className="input-group">
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First Name"
                inputCssClass="input-control"
              />
            </div>
            <div className="input-group">
              <TextInput
                label="Middle Name"
                name="middleName"
                type="text"
                placeholder="Middle name or initial"
                inputCssClass="input-control"
              />
            </div>
            <div className="input-group">
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Last name"
                inputCssClass="input-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <TextInput
                label="Address"
                name="address"
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
                name="city"
                type="text"
                placeholder="City..."
                inputCssClass="input-control"
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <TextInput
                label="State"
                name="state"
                type="text"
                placeholder="State"
                inputCssClass="input-control"
              />
            </div>
            <div className="input-group" style={{ flex: 2 }}>
              <TextInput
                label="Zip"
                name="zip"
                type="text"
                placeholder="Zip"
                inputCssClass="input-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <TextInput
                label="County of Residence"
                name="county"
                type="text"
                placeholder="County of Residence"
                inputCssClass="input-control"
              />
            </div>
            <div className="input-group">
              <TextInput
                label="Phone No."
                name="phone"
                type="text"
                placeholder="Phone No."
                inputCssClass="input-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <TextInput
                label="Occupation"
                name="occupation"
                type="text"
                placeholder="Occupation"
                inputCssClass="input-control"
              />
            </div>
            <div className="input-group">
              <TextInput
                label="Place of Employment"
                name="employer"
                type="text"
                placeholder="Place of Employment"
                inputCssClass="input-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <Select label="Are you married?" name="married">
                <option value="">Select an option</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </Select>
            </div>
          </div>

          {userErrors && Object.keys(userErrors).length && (
            <ErrorSummary errors={userErrors} />
          )}

          {/* <Button type="button" onClick={handleSubmit}>
            Submit
          </Button> */}
          <Footer
            isFirst={props.isFirst}
            isLast={props.isLast}
            onClick={handleSubmit}
          />
        </Form>
      </Formik>
    </>
  );
};

export default ClientInfo;
