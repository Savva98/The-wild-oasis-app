import styled, { css } from "styled-components";

const Row = styled.div<{ type: "horizontal" | "vertical" }>`
  display: flex;
  width: 100%;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" && `flex-direction: column; gap: 1.6rem;`}
`;

export default Row;
