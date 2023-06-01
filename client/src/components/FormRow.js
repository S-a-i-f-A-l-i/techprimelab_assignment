const FormRow = ({ type, name, value, handleChange, labelText, required }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <br />
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        required={required}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
