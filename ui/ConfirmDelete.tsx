import styled from "styled-components";
import React, { useContext } from "react";
import Button from "./Button";
import Heading from "./Heading";
import { ModalContext } from "./Modal";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;

    & span {
      margin: 0;
      font-weight: 600;
      color: var(--color-grey-700);
    }
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

type ConfirmDelete = {
  resourceName: string;
  resourceType: string;
  handleFunction?: () => void;
};

function ConfirmDelete({
  resourceName,
  resourceType,
  handleFunction,
}: ConfirmDelete) {
  const { onClose, isOpen } = useContext(ModalContext) || {};
  const handleDelete = () => {
    if (handleFunction) {
      handleFunction();
    }
    onClose?.();
  };
  if (typeof isOpen === "boolean") {
    return null;
  }
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete {resourceType}:{" "}
        <span>{resourceName}</span> permanently? This action cannot be undone.
      </p>

      <div>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
