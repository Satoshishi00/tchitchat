import React from "react";
import options from "./array";

const Select = ({ update, state }) => {
  console.log(options, state);
  return options.map(field => (
    <CustomOption
      key={field.name}
      update={update}
      value={state[field.name]}
      name={field.name}
    />
  ));
};

export default Select;
