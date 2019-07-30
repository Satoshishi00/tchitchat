import styled from "styled-components";
import colors from "/imports/utils/colors";

const StyledInput = styled.input`
  width: 88vw;
  font-size: 1.3em;
  border: none;
  border: solid 1px ${({ color }) => colors(color)};
  border-radius: 0.3em;
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
