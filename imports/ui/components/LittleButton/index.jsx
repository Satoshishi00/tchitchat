import React from "react";
import StyledDiv from "./StyledDiv";

const LittleButton = ({ ...rest }) => (
  <div>
    <StyledDiv {...rest} />
  </div>
);

export default LittleButton;
