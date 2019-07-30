import styled from "styled-components";
import colors from "/imports/utils/colors";

const StyledInput = styled.input`
  font-size: 2em;
  border: solid 1px ${({ color }) => colors(color)};
  padding-left: 0.3em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  color: black;
  ::placeholder {
    color: ${({ color }) => colors(color)};
  }
  :hover {
    cursor: pointer;
  }
`;

export default StyledInput;
