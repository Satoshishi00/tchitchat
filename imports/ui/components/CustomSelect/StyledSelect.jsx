import styled from "styled-components";
import colors from "/imports/utils/colors";

const StyledSelect = styled.select`
  font-size: 2em;
  padding-left: 0.3em;
  border: solid 1px ${({ color }) => colors(color)};
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  color: black;
`;

export default StyledSelect;
