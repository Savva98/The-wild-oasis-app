import { useContext } from "react";
import { HiTrash } from "react-icons/hi2";
import { ModalContext } from "./Modal";

function ButtonDeletCabin() {
  const { onOpen } = useContext(ModalContext) || {};

  return (
    <span onClick={() => onOpen?.("deleteCabin")}>
      <HiTrash />
    </span>
  );
}

export default ButtonDeletCabin;
