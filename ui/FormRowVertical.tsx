import styled from "styled-components";
import { ReactElement } from "react";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRow = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

function FormRowVertical({ label, error, children }: FormRow) {
  const childId = (children as ReactElement<{ id?: string }>)?.props?.id;
  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
