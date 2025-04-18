import React from "react";
import styled from "styled-components";
const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }
  &:not(:first-child) {
    border-top: 1px solid var(--color-grey-100);
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled("label").withConfig({
  shouldForwardProp: (prop) => !["customize"].includes(prop),
})<{ customize?: boolean }>`
  font-weight: 500;
  ${(props) => props.customize && `margin-top: 1rem;`}
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
  text-align: center;
`;

const StyledInputandError = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  &:last-child {
    margin-bottom: 10px;
  }
`;

type FormRowProps = {
  children: React.ReactElement<{ id: string }> | React.ReactNode;
  error?: string;
  label?: string;
};

function FormRow({ children, error, label }: FormRowProps) {
  return (
    <StyledFormRow>
      {label && (
        <Label
          htmlFor={
            React.isValidElement<{ id: string }>(children)
              ? children.props.id
              : ""
          }
          customize={error ? true : false}
        >
          {label}
        </Label>
      )}
      {!error && children}
      {error && (
        <StyledInputandError>
          {error && <Error>{error}</Error>}
          {children}
        </StyledInputandError>
      )}
    </StyledFormRow>
  );
}

export default FormRow;
