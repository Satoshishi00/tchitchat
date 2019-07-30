import React from "react";
import StyledSelect from "./StyledSelect";

const CustomSelect = ({
  update,
  options,
  selected,
  key,
  name,
  state,
  ...rest
}) => (
  <div>
    <StyledSelect
      name={name}
      update={update}
      onChange={e => update(e, e.target || {})}
      {...rest}
    >
      {options &&
        options.map((option, key) => (
          <option key={key} value={option} type="text">
            {option}
          </option>
        ))}
    </StyledSelect>
  </div>
);

export default CustomSelect;
