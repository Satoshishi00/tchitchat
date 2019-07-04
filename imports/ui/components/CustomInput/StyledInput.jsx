import styled from "styled-components";
import colors from "/imports/utils/colors";

const StyledInput = styled.input`
  font-size: 2em;
  border: none;
  border-bottom: thick double ${({ color }) => colors(color)};
  color: ${({ color }) => colors(color)};
  ::placeholder {
    color: ${({ color }) => colors(color)};
  }
  :hover {
    cursor: pointer;
  }
`;

export default StyledInput;
