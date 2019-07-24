import styled from "styled-components";
import colors from "/imports/utils/colors";

const StyledDiv = styled.button`
  width: 1.9em;
  height: 1.9em;
  border: solid 1px #00a8ff;
  border-radius: 50%;
  padding-left: 0.25em;
  padding-top: 0.15em;
  background-color: #00a8ff;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

export default StyledDiv;
