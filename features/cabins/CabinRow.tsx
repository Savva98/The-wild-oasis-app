import React from "react";
import styled from "styled-components";
import { CabinType } from "../../types/types";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import useDeleteCabin from "./useDeleteCabin";
import Spinner from "../../ui/Spinner";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.8rem;
  align-items: center;
  padding: 1.8rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 10px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: CabinType }) {
  const { name, maxCapacity, regularPrice, discount, image, id } = cabin;
  const mutationCabins = useDeleteCabin();
  if (mutationCabins.isPending) {
    return <Spinner />;
  }
  const handleDelete = () => {
    mutationCabins.mutate(id);
  };
  return (
    <TableRow>
      <Img src={`/img/cabins/${image}`} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </TableRow>
  );
}

export default CabinRow;
