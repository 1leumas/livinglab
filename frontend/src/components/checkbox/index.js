import React from "react";
import PropTypes from "prop-types";
import { CheckboxContainer, CheckboxLabel, StyledCheckbox } from "./styles";

const Checkbox = ({ name, checked, onChange, label }) => {
  return (
    <CheckboxContainer>
      <StyledCheckbox
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <CheckboxLabel htmlFor={name}>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Checkbox;
