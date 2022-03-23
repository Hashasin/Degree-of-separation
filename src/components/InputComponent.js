import React from "react"

const InputComponent = (props) => {

  return (
    <div className="input-container">
      <div className="label-container">
        <label>{props.label}</label>
      </div>
      {props.dropdown ? (
        <select id="dropdown" className="form-field" onChange={props.onChange}>
          <option value="" default>
            Select a member
          </option>
          {props.nodes &&
            props.nodes.map((elem) => {
              return <option value={elem}>{elem}</option>;
            })}
        </select>
      ) : (
        <input
          className="form-field"
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
        />
      )}
    </div>
  );
};

export default InputComponent;
