import { useContext } from "react";
import { HiPencil } from "react-icons/hi2";
import { ModalContext } from "./Modal";

function ButtonEditCabin() {
  const { onOpen } = useContext(ModalContext) || {};

  return (
    <span onClick={() => onOpen?.()}>
      <HiPencil />
    </span>
  );
}

export default ButtonEditCabin;
