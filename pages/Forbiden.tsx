import React from "react";
import styled from "styled-components";
import { useMoveBack } from "../hooks/useMoveBack";

const ForbiddenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
`;

const ForbiddenTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ForbiddenMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #721c24;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a71d2a;
  }
`;

function Forbiden() {
  const moveBack = useMoveBack();

  return (
    <ForbiddenContainer>
      <ForbiddenTitle>403</ForbiddenTitle>
      <ForbiddenMessage>
        You do not have permission to access this page.
      </ForbiddenMessage>
      <BackButton onClick={moveBack}>Go Back</BackButton>
    </ForbiddenContainer>
  );
}

export default Forbiden;
