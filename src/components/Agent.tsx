import TextInput from './form-elements/TextInput';

interface IAgentProps {
  index: number;
}

const Agent: React.FC<IAgentProps> = ({ index }) => {
  return (
    <>
      <div className="form-group">
        <div className="input-group">
          <TextInput
            label="First Name"
            name={`agents.${index}.firstName`}
            id={`agents.${index}.firstName`}
            type="text"
            placeholder="First Name"
            inputCssClass="input-control"
          />
        </div>
        <div className="input-group">
          <TextInput
            label="Middle Name or Initial"
            name={`agents.${index}.middleName`}
            type="text"
            placeholder="Middle name or initial"
            inputCssClass="input-control"
          />
        </div>
        <div className="input-group">
          <TextInput
            label="Last Name"
            name={`agents.${index}.lastName`}
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
            name={`agents.${index}.address`}
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
            name={`agents.${index}.city`}
            type="text"
            placeholder="City..."
            inputCssClass="input-control"
          />
        </div>
        <div className="input-group" style={{ flex: 1 }}>
          <TextInput
            label="State"
            name={`agents.${index}.state`}
            type="text"
            placeholder="State"
            inputCssClass="input-control"
          />
        </div>
        <div className="input-group" style={{ flex: 2 }}>
          <TextInput
            label="Zip"
            name={`agents.${index}.zip`}
            type="text"
            placeholder="Zip"
            inputCssClass="input-control"
          />
        </div>
      </div>
    </>
  );
};

export default Agent;
