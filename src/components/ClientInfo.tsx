import { useEffect, useState, useContext } from 'react';
import { Formik, useFormikContext, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from './form-elements/TextInput';
import Select from './form-elements/Select';
import { RootState } from '../store';
import { IClientInfo } from '../store/client-info-slice';
import StepHeader from './StepHeader';
import { FormContext } from '../context/formContext';
import { AppDispatch } from '../store';
import { updateClientInfo } from '../store/client-info-slice';

const ClientInfo = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const [isMarried, setIsMarried] = useState<string>('');

  const initialState: IClientInfo = useSelector(
    (state: RootState) => state.clientInfo
  );

  const UpdateMaritalStatus = () => {
    const { values } = useFormikContext<IClientInfo>();
    useEffect(() => {
      setIsMarried(values.married);
    }, [values]);
    return null;
  };
  return (
    <>
      <StepHeader header="Client Information" />
      <h3 style={{ textAlign: 'justify' }}>
        NOTE: For ALL names on this questionnaire, please use the full legal
        name or the name as you would prefer it to appear in your documents
        (e.g., it is most common to use full first names with middle initials)
      </h3>
      <Formik
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
          email: Yup.string()
            .required('Email is required')
            .email('Invalid email addres'),
          married: Yup.string()
            .required('Select a marital status')
            .oneOf(['Y', 'N']),
          spouseFirstName: Yup.string().when('married', {
            is: 'Y',
            then: (schema) => schema.required('Spouse first name is required'),
          }),
          spouseMiddleName: Yup.string().when('married', {
            is: 'Y',
            then: (schema) => schema,
          }),
          spouseLastName: Yup.string().when('married', {
            is: 'Y',
            then: (schema) => schema.required('Spouse last name is required'),
          }),
          spouseEmail: Yup.string().when('married', {
            is: 'Y',
            then: (schema) => schema,
          }),
          spouseOccupation: Yup.string().when('married', {
            is: 'Y',
            then: (schema) => schema,
          }),
          spouseEmployer: Yup.string().when('married', {
            is: 'Y',
            then: (schema) => schema,
          }),
        })}
        onSubmit={(values, { setSubmitting }) => {
          //console.log('VALUES', values);
          dispatch(updateClientInfo({ ...values }));
          setActiveStepIndex(activeStepIndex + 1);
        }}
      >
        <Form id={props.id}>
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
                label="Email"
                name="email"
                type="text"
                placeholder="Email"
                inputCssClass="input-control"
              />
            </div>
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
            <UpdateMaritalStatus />
          </div>
          {isMarried === 'Y' && (
            <>
              {' '}
              <div className="form-group">
                <div className="input-group">
                  <TextInput
                    label="Spouse First Name"
                    name="spouseFirstName"
                    type="text"
                    placeholder="Spouse's First Name"
                    inputCssClass="input-control"
                  />
                </div>
                <div className="input-group">
                  <TextInput
                    label="Spouse Middle Name"
                    name="spouseMiddleName"
                    type="text"
                    placeholder="Spouse's Middle name or initial"
                    inputCssClass="input-control"
                  />
                </div>
                <div className="input-group">
                  <TextInput
                    label="Spouse Last Name"
                    name="spouseLastName"
                    type="text"
                    placeholder="Spouse's Last name"
                    inputCssClass="input-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <TextInput
                    label="Spouse Email"
                    name="spouseEmail"
                    type="text"
                    placeholder="Spouse's Email"
                    inputCssClass="input-control"
                  />
                </div>
                <div className="input-group">
                  <TextInput
                    label="Spouse Occupation"
                    name="spouseOccupation"
                    type="text"
                    placeholder="Spouse's Occupation"
                    inputCssClass="input-control"
                  />
                </div>
                <div className="input-group">
                  <TextInput
                    label="Spouse Employer"
                    name="spouseEmployer"
                    type="text"
                    placeholder="Spouse's Employer"
                    inputCssClass="input-control"
                  />
                </div>
              </div>
            </>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default ClientInfo;
