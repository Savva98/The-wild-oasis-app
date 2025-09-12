import styled from "styled-components";
import React, { useContext } from "react";
import Button from "./Button";
import Heading from "./Heading";
import useDeleteCabin from "../features/cabins/useDeleteCabin";
import Spinner from "./Spinner";
import { ModalContext } from "./Modal";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

type ConfirmDelete = {
  resourceName: string;
  id: string;
};

function ConfirmDelete({ resourceName, id }: ConfirmDelete) {
  const mutationCabins = useDeleteCabin();
  const { onClose, isOpen } = useContext(ModalContext) || {};
  if (mutationCabins.isPending) {
    return <Spinner />;
  }
  const handleDelete = () => {
    mutationCabins.mutate(id);
  };
  if (typeof isOpen === "boolean") {
    return null;
  }
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete cabin: {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variant="secondary"
          disabled={mutationCabins.isPending}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={mutationCabins.isPending}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
