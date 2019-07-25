import styled from "styled-components";
import colors from "/imports/utils/colors";

const StyledInput = styled.input`
  font-size: 2em;
  border: none;
  border: solid 1px ${({ color }) => colors(color)};
  margin-bottom: 0.5em;
  padding-left: 0.3em;
  color: black;
  ::placeholder {
    color: ${({ color }) => colors(color)};
  }
  :hover {
    cursor: pointer;
  }
`;

export default StyledInput;
