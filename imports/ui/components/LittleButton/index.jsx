import React from "react";
import StyledBtn from "./StyledBtn";

const LittleButton = ({ ...rest }) => (
  <div>
    <StyledBtn {...rest} />
  </div>
);

export default LittleButton;
