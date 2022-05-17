import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from './form-elements/TextInput';

const ClientInfo = () => {
  return (
    <>
      <h1>Client Info</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          middleName: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          middleName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          address: Yup.string().required('Required'),
          city: Yup.string().max(40).required('Required'),
          state: Yup.string().required('Required'),
          zip: Yup.string().max(30).required('Required'),

          // email: Yup.string()
          //   .email('Invalid email address')
          //   .required('Required'),
          // acceptedTerms: Yup.boolean()
          //   .required('Required')
          //   .oneOf([true], 'You must accept the terms and conditions.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default ClientInfo;
